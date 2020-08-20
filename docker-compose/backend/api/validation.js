module.exports = app => {

    function isNumberOrError(value, msg) {
        num = parseInt(value)
        if (!Number.isInteger(num)) throw msg 
        return num        
    }

    function existsOrError(value, msg) {
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg        
    }       

    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch(msg) {
            return
        }
        throw msg
    }

    function existsRowsOrError(value, msg) {
        if(typeof value === 'object' && Object.keys(value).length > 0) throw msg 
    }

    function notExistsRowsOrError(value, msg) {
        if(typeof value === 'object' && Object.keys(value).length === 0) throw msg        
    }
    
    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    function activeOrError(value, msg) {
        valid = ['ativo','inativo']
        if(!valid.includes(value)) throw msg        
    }

    function examOrError(value, msg) {
        valid = ['analise','clinica','imagem']
        if(!valid.includes(value)) throw msg
    }

    return { isNumberOrError, existsOrError, notExistsOrError, equalsOrError, existsRowsOrError, notExistsRowsOrError, activeOrError, examOrError }

}