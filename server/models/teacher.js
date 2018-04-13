const yimotionDb = require('./sql_config');
const Sequelize = require('sequelize');
const Lesson = require('../models/lesson');

/// Define the 'Teacher' model
const Teacher = yimotionDb.define("teacher", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    name: Sequelize.STRING,
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    staffId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    role:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Teacher.hasMany(Lesson);
Lesson.belongsTo(Teacher);

Teacher.sequelize.sync().then(function() {

    console.log('Nice! Teacher table looks fine')

}).catch(function(err) {

    console.log(err, "Something went wrong with the Database")

});

// TODO refactor the encryption before create method

Teacher.beforeCreate(function (user, options) {
    return cryptPassword(user.password)
        .then(success => {
            user.password = success;
        })
        .catch(err => {
            if (err) console.log(err);
        });
});

function cryptPassword(password) {
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(10, function (err, salt) {
            // Encrypt password using bycrpt module
            if (err) return reject(err);

            bcrypt.hash(password, salt, function (err, hash) {
                if (err) return reject(err);
                return resolve(hash);
            });
        });
    });
}

module.exports = Teacher;