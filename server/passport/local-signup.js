const Admin = require('../models/admin');
const PassportLocalStrategy = require('passport-local').Strategy;
const Sequelize = require('sequelize');
/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim(),
        name: req.body.name.trim(),
        staffId: req.body.staffId.trim(),
        role: 'admin'
    };
    Admin.create(userData)
        .then(function (user) {
            console.log('\nCreated Admin account:', user.get({plain: true}));
            return done(null);
        }).catch(Sequelize.ValidationError, function (err) {
            return done(err);
        });

});
