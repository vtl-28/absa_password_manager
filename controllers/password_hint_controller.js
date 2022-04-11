const User = require('../models/user');
const { validationResult } = require('express-validator');
const email_helper = require('../config/send_email');

module.exports = {
      //handler to access page to retrieve user master password hint
    password_hint_view: (req, res) => {
        res.render('password_hint', {success: req.flash('success'), 
        error: req.flash('error'), retrieve_password_hint_errors: req.flash('retrieve_password_hint_errors')});
    },
    //handler to retrieve user master password hint
    retrieve_password_hint: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let messages = errors.array().map(e => e.msg);
            req.skip = true;
            req.flash('retrieve_password_hint_errors', messages);
            res.locals.redirect = '/password_hint';
            next();
            //return res.status(400).json({ errors: errors.array() });
          }else{
            let user_params = {
                email: req.body.email
            };
            User.findOne(user_params).then(user => {
                email_helper.send_email({
                    from: 'test@gmail.com',
                    to: user.email,
                    subject: 'Master password hint',
                    text: `Your master password hint is ${user.master_password_hint}`
                });
              
                req.flash('success', 'Master password hint sent to your email');
                res.locals.redirect = '/';
                next();
            }).catch(error => {
                console.log(error);
                req.flash('error', `Failed to send master password hint to email because ${error}`);
                res.locals.redirect = '/password_hint';
                next();
            });
          }
    },
    //handler to redirect to appropriate page
    redirect_password_hint_view: (req, res, next) => {
        let redirect_path = res.locals.redirect;
        if(redirect_path) res.redirect(redirect_path);
        else next();
    }

}