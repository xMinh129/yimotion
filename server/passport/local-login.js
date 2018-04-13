const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');
const bcrypt = require('bcrypt');

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
    usernameField: 'staffId',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        staffId: req.body.staffId.trim(),
        password: password.trim()
    };

    // find a user by email address
    return Admin.findOne({where: {staffId: userData.staffId}}).then(user => {

        if (!user) {
            const error = new Error('Incorrect email or password');
            error.name = 'IncorrectCredentialsError';
            return done(error);
        }

        // check if a hashed user's password is equal to a value saved in the database
        return bcrypt.compare(userData.password, user.password, (err, isMatch) => {
            if (!isMatch) {
                const error = new Error('Incorrect Id or password');
                error.name = 'IncorrectCredentialsError';
                return done(error);
            }

            const payload = {
                sub: user.id
            };

            // create a token string

            const token = jwt.sign(payload, config.jwtSecret);
            const data = {
                name: user.name,
                staffId: user.staffId
            };


            return done(null, token, data);
        });
    });
});
