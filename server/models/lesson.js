const Sequelize = require('sequelize');
const yimotionDb = require('./sql_config');
const Teacher = require('../models/teacher');
const Class = require('../models/class');

// Define the 'Lesson' model
const Lesson = yimotionDb.define("lesson", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subject: {
        type: Sequelize.STRING,
        allowNull: false
    },
    classId: {
        type: Sequelize.INTEGER,
         references: {
            model: Class,
            key: 'id'
        }
    },
    teacherId: {
        type: Sequelize.INTEGER,
         references: {
            model: Teacher,
            key: 'id'
        }
    },
    lessonId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

Lesson.sequelize.sync().then(function () {

    console.log('Nice! Lesson table looks fine')

}).catch(function (err) {

    console.log(err, "Something went wrong with the Database")

});


module.exports = Lesson;