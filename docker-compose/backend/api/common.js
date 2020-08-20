module.exports = app => {

    function prePos(exp) {
        ret = [0,0]
        ret[0] = exp.substr(0,exp.indexOf(","))
        ret[1] = exp.substring(exp.indexOf(",")+1)
        return ret
    }

    return { prePos }
}