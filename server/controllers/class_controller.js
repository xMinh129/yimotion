const Class = require('../models/class');
const Teacher = require('../models/teacher');
const Lesson = require('../models/lesson');
const classController = {};

classController.createNewClass = function (req, res) {
    const classData = {
        name: req.body.name
    };

    Class.create(classData)
        .then(function (clss) {
            console.log('\nCreated a new class', clss.get({plain: true}));
            res.send({'message': 'Class created'});
        }).catch(function (err) {
        console.log(err);
        // TODO render back the new view
    });
};

classController.getAllClasses = function (req, res) {
    Class.findAll({
        order: Class.sequelize.col('name'),
        limit: parseInt(req.body.limit),
        include: [
            {
                model: Teacher,
                attributes: ['id', 'name']
            },
            {
                model: Lesson,
                attributes: ['id', 'name']
            }

        ]
    }).then(function (data) {
        res.send(data)
    }).catch(function (err) {
        console.log(err);
    });
};

classController.getOneClass = function (req, res) {
    Class.findOne({
        order: Class.sequelize.col('name'),
        limit: parseInt(req.body.limit),
        include: [
            {
                model: Teacher,
                attributes: ['id', 'name']
            },
            {
                model: Lesson,
                attributes: ['id', 'name', 'lessonId', 'createdAt', 'subject'],
                include: [
                    {
                        model: Teacher,
                        attributes: ['id', 'name']
                    }
                ]
            }

        ],
        where: {id: req.params.class_id}
    }).then(function (clss) {
        res.send(clss)
    }).catch(function (err) {
        console.log(err);
    });
};

module.exports = classController;