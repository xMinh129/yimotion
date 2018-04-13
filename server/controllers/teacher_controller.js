const Teacher = require('../models/teacher');
const Class = require('../models/class');
const Lesson = require('../models/lesson');
const teacherController = {};

teacherController.createNewTeacher = function (req, res) {
    const teacherData = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        staffId: req.body.staffId,
        role: 'teacher'
    };

    Teacher.create(teacherData)
        .then(function (teacher) {
            console.log('\nCreated a new teacher', teacher.get({plain: true}));
            res.send({'message': 'Teacher created'});
        }).catch(function (err) {
        console.log(err);
        // TODO render back the new view
    });
};


teacherController.getAllTeachers = function (req, res) {
    Teacher.findAll({
        order: Teacher.sequelize.col('name'),
        limit: parseInt(req.body.limit),
        include: [{
            model: Class,
            attributes: ['id', 'name']
        }]
    }).then(function (data) {
        res.send(data)
    }).catch(function (err) {
        console.log(err);
    });
};

teacherController.getOneTeacher = function (req, res) {
    Teacher.findOne({
        include: [{
            model: Class,
            attributes: ['id', 'name']
        }, {
            model: Lesson,
            attributes: ['id', 'name', 'lessonId', 'createdAt', 'subject'],
            include: [
                {
                    model: Class,
                    attributes: ['name']
                }
            ]

        }],
        where: {id: req.params.teacher_id}
    }).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        console.log(err);
    });
};

module.exports = teacherController;
