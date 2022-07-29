const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const valid_password = require("../lib/password_utils").validPassword;

const custom_fields = {
  usernameField: "email",
  passwordField: "master_password",
};

const verify_callback = (username, password, done) => {
  User.findOne({ email: username })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: "User does not exist" });
      }

      const isValid = valid_password(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "Invalid email or password entered",
        });
      }
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(custom_fields, verify_callback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
