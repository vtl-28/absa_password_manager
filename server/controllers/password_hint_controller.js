const User = require("../models/user");
const { validationResult } = require("express-validator");
const email_helper = require("../config/send_email");

module.exports = {
  //handler to access page to retrieve user master password hint
  password_hint_view: (req, res) => {
    res.render("password_hint", {
      success: req.flash("success"),
      error: req.flash("error"),
      retrieve_password_hint_errors: req.flash("retrieve_password_hint_errors"),
    });
  },
  //handler to retrieve user master password hint
  retrieve_password_hint: (req, res, next) => {
    let user_email = Object.keys(req.body).toString();
    User.findOne({ email: user_email })
      .then((user) => {
        res
          .status(200)
          .send(`Your master password hint is ${user.master_password_hint}`);
      })
      .catch((error) => {
        res.status(404).send("Failed to retrieve master password hint");
      });
  },
};
