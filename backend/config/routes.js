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

    app.route('/getLabExams/:nome') 
        .get(app.api.labs.getLabExams)

    app.route('/addExam/:association') 
        .post(app.api.examsbylabs.addExam)

    // Exams

    app.route('/exams')
        .post(app.api.exams.save)
        .get(app.api.exams.get)

    app.route('/exams/:id') 
        .put(app.api.exams.save)
        .get(app.api.exams.getById)
        .delete(app.api.exams.remove)
    
    app.route('/examByName/:nome') 
        .get(app.api.exams.getByName)
    
    app.route('/getWhereExams/:nome') 
        .get(app.api.exams.getWhereExams)

    // Exams by Labs

    app.route('/delAssoc/:association') 
        .delete(app.api.examsbylabs.deleteAssociation)

        
}