const Sequelize = require('sequelize');
const yimotionDb = require('./sql_config');
const Teacher = require('../models/teacher');
const Lesson = require('../models/lesson');

// Define the 'Class' model
const Class = yimotionDb.define("class", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

Class.belongsToMany(Teacher,  {through: 'class_teacher'});
Teacher.belongsToMany(Class, {through: 'class_teacher'});
Class.hasMany(Lesson);
Lesson.belongsTo(Class);


Class.sequelize.sync().then(function() {

    console.log('Nice! Class table looks fine')

}).catch(function(err) {

    console.log(err, "Something went wrong with the Database")

});




module.exports = Class;
