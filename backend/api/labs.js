module.exports = app => {

    const { isNumberOrError, existsOrError, notExistsOrError, equalsOrError, existsRowsOrError, notExistsRowsOrError, activeOrError } = app.api.validation
    const { prePos } = app.api.common

    const save = async (req, res) => {
        const lab = { ...req.body }
        if (req.params.id) lab.id = req.params.id
        lab.status = lab.status.toLowerCase()

        try {
            existsOrError(lab.nome, 'Nome não informado')
            existsOrError(lab.endereco, 'Endereço não informado')
            existsOrError(lab.status, 'Status não informada')
            activeOrError(lab.status, 'Valor de Status invalido')
            const labFromDB = await app.db('labs')
                .where({ nome: lab.nome }).first()
            if(!lab.id) {
                notExistsOrError(labFromDB, 'Laboratório já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }        
        if(lab.id) {
            app.db('labs')
                .update(lab)
                .where({ id: lab.id })                
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('labs')
                .insert(lab)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('labs')
            .select('id', 'nome', 'endereco', 'status')
            .where('status','ativo')
            .then(labs => res.json(labs))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('labs')
            .select('id', 'nome', 'endereco', 'status')
            .where({ id: req.params.id })            
            .first()
            .then(lab => res.json(lab))
            .catch(err => res.status(500).send(err))
    }

    const getByName = (req, res) => {        
        app.db('labs')
            .select('id', 'nome', 'endereco', 'status')
            .where({ nome: req.params.nome }) 
            .first()
            .then(lab => res.json(lab))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {        
        try {            
            existsOrError(req.params.id, 'Código do laboratório não informado.')
            const exams = await app.db('examsbylabs').where({ 'labs_id': req.params.id })
            notExistsOrError(exams, 'Laboratório possui exames.')
            const labFromDB = await app.db('labs')
                .where({ id: req.params.id })            
            if(req.params.id) {
                notExistsRowsOrError(labFromDB, 'Laboratório não existes')
            }                                    
            const rowsDeleted = await app.db('labs')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Laboratório não foi excluido.')
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }                  
    
    const getLabExams = (req, res) => {       
        app.db({l:'labs', e:'exams', b: 'examsbylabs'})            
            .select('e.nome as Exame')
            .where('l.id', app.db.raw('??', ['b.labs_id']))            
            .where('e.id', app.db.raw('??', ['b.exams_id']))            
            .where('l.nome',req.params.nome) 
            .then(lab => res.json(lab))
            .catch(err => res.status(500).send(err))
    }

    const addExam = async (req, res) => {
        // USO : http://<servidor>/addExam/<id do laboratório>,<id do exame> - 

        const param = req.params.association      

        let lab  = 0;
        let exam = 0;

        p = prePos(param)

        try {
            lab  = isNumberOrError(p[0], 'Valor não é numérico')
            exam = isNumberOrError(p[1], 'Valor não é numérico')
            const exist = await app.db('examsbylabs')
                .where({ labs_id: lab })
                .where({ exams_id: exam }).first()
            notExistsOrError(exist, 'Associação já Existente')
        } catch(msg) {
            return res.status(400).send(msg)
        }            
        
        const assoc = [{labs_id: lab , exams_id: exam}]        
        app.db('examsbylabs')
            .insert(assoc)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))

    }
    

    return { save, get, getById, getByName, remove, getLabExams, addExam  }

}