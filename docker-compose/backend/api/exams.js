module.exports = app => {
    
    const { existsOrError, notExistsOrError, notExistsRowsOrError, activeOrError, examOrError } = app.api.validation
    
    const save = async (req, res) => {
        const exam = { ...req.body }
        if (req.params.id) exam.id = req.params.id
        exam.tipo = exam.tipo.toLowerCase()
        exam.status = exam.status.toLowerCase()

        try {
            existsOrError(exam.nome, 'Nome não informado')
            existsOrError(exam.tipo, 'Tipo não informado')
            existsOrError(exam.status, 'Status não informada')
            activeOrError(exam.status, 'Valor de Status invalido')
            examOrError(exam.tipo, 'Tipo invalido')
            const examFromDB = await app.db('exams').where({ nome: exam.nome }).first()
            if(!exam.id) {
                notExistsOrError(examFromDB, 'Exame já cadastrado')
            } else {
                // garante ao alterar um exame não coloque um nome que existe
                const examFromDB = await app.db('exams')
                    .whereNot({ id: exam.id })
                    .where({ nome: exam.nome }).first()
                notExistsOrError(examFromDB, 'Já existe um Exame com esse nome')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }        
        if(exam.id) {
            app.db('exams')
                .update(exam)
                .where({ id: exam.id })                
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('exams')
                .insert(exam)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('exams')
            .select('id', 'nome', 'tipo', 'status') 
            .where('status','ativo')
            .then(exams => res.json(exams))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('exams')
            .select('id', 'nome', 'tipo', 'status')
            .where({ id: req.params.id })            
            .first()
            .then(exam => res.json(exam))
            .catch(err => res.status(500).send(err))
    }

    const getByName = (req, res) => {        
        app.db('exams')
            .select('id', 'nome', 'tipo', 'status')
            .where({ nome: req.params.nome }) 
            .first()
            .then(lab => res.json(lab))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {        
        try {            
            existsOrError(req.params.id, 'Código do exame não informado.')
            const examFromDB = await app.db('exams')
                .where({ id: req.params.id })            
            if(req.params.id) {
                notExistsRowsOrError(examFromDB, 'Exame não existes')
            } 
            const exams = await app.db('examsbylabs').where({ 'exams_id': req.params.id })
            notExistsOrError(exams, 'Exame existe em laboratórios')                                   
            const rowsDeleted = await app.db('exams')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Exame não foi excluido.')
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const getWhereExams = (req, res) => {       
        app.db({l:'labs', e:'exams', b: 'examsbylabs'})
            .select('l.nome as Laboratorio')
            .where('l.id', app.db.raw('??', ['b.labs_id']))            
            .where('e.id', app.db.raw('??', ['b.exams_id']))            
            .where('e.nome',req.params.nome) 
            .then(lab => res.json(lab))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById, getByName, getWhereExams, remove }

}