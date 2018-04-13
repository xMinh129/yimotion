const Lesson = require('../models/lesson');
const Teacher = require('../models/Teacher');
const Class = require('../models/Class');
const lessonController = {};


lessonController.createNewLesson = function (req, res) {
    // Create a unique lesson id
    const lessonData = {
        name: req.body.name,
        subject: req.body.subject,
        lessonId: req.body.lessonId,
        classId: req.body.classId,
        teacherId: req.body.teacherId
    };
    console.log(req.body);

    Lesson.create(lessonData)
        .then(function (lesson) {
            console.log('\nCreated a new lesson', lesson.get({plain: true}));
            res.send({'message': 'Lesson created'});
        }).catch(function (err) {
        console.log(err);
        // TODO render back the new view
    });
};

lessonController.getAllLessons = function (req, res) {
    Lesson.findAll({
        order: Lesson.sequelize.col('name'),
        limit: parseInt(req.body.limit),
        include: [{
            model: Class,
            attributes: ['id', 'name']
        }, {
            model: Teacher,
            attributes: ['id', 'name']
        }]
    }).then(function (data) {
        res.send(data)
    }).catch(function (err) {
        console.log(err);
    });
};

lessonController.getOneLesson = function (req, res) {
    Lesson.findAll({
        include: [{
            model: Class,
            attributes: ['id', 'name']
        }, {
            model: Teacher,
            attributes: ['id', 'name']
        }],
        where: {lessonId: req.params.lesson_id}
    }).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        console.log(err);
    });
};

module.exports = lessonController;