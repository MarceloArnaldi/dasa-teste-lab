module.exports = app => {

    const { isNumberOrError, existsOrError } = app.api.validation    
    const { prePos } = app.api.common

    const deleteAssociation = async (req, res) => {
        // USO : http://<servidor>/delAssoc/<id do laboratório>,<id do exame>         

        const param = req.params.association      

        let lab  = 0;
        let exam = 0;

        p = prePos(param)

        try {
            lab  = isNumberOrError(p[0], 'Valor não é numérico')
            exam = isNumberOrError(p[1], 'Valor não é numérico')
            const exist = await app.db('examsbylabs')
                .where({ labs_id: lab })
                .where({ exams_id: exam })
                .first()
            existsOrError(exist, 'Associação Não Existente')
            const rowsDeleted = await app.db('examsbylabs')
                .where({ labs_id: lab })
                .where({ exams_id: exam })                
                .del()
            existsOrError(rowsDeleted, 'Associação não foi excluida.')
            res.status(204).send()
        } catch(msg) {
            return res.status(400).send(msg)
        }            
    
    }

    return { deleteAssociation  }

}