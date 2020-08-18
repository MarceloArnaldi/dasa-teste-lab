module.exports = app => {

    // Labs

    app.route('/labs')
        .post(app.api.labs.save)
        .get(app.api.labs.get)

    app.route('/labs/:id') 
        .put(app.api.labs.save)
        .get(app.api.labs.getById)
        .delete(app.api.labs.remove)    
    
    app.route('/labByName/:nome') 
        .get(app.api.labs.getByName)

    

        
}