const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');
valid_password = require('../lib/password_utils');

const custom_fields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verify_callback = (email, master_password, done) => {

    User.findOne({ email: email })
        .then((user) => {

            if (!user) { return done(null, false) }
            
            const isValid = validPassword(master_password, user.hash, user.salt);
            
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {   
            done(err);
        });

}

const strategy  = new LocalStrategy(custom_fields, verify_callback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});