const bcrypt = require('bcrypt');
const yimotionDb = require('./sql_config');
const Sequelize = require('sequelize');


/// Define the 'Admin' model
const Admin = yimotionDb.define("admin", {
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
    role: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Admin.sequelize.sync().then(function() {

    console.log('Nice! Admin table looks fine')

}).catch(function(err) {

    console.log(err, "Something went wrong with the Database")

});

Admin.beforeCreate(function (user, options) {
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

module.exports = Admin;
