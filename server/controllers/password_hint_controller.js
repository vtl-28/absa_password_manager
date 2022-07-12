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
        // let user_email = Object.keys(req.body).toString();
        // User.findOne({email: user_email})
        // .then(user => {
        //     console.log(`user found ${user}`);
        // }).then(error => {
        //     res.status(404).send(error)
        // })

        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let messages = errors.array().map(e => e.msg);
            req.skip = true;
            res.status(400).send(messages.toString());
            console.log(messages);

            // req.flash('retrieve_password_hint_errors', messages);
            // res.locals.redirect = '/password_hint';
            // next();
            //return res.status(400).json({ errors: errors.array() });
          }else{
            let user_email = Object.keys(req.body).toString();
            User.findOne({email: user_email}).then(user => {
                email_helper.send_email({
                    from: 'test@gmail.com',
                    to: user.email,
                    subject: 'Master password hint',
                    text: `Your master password hint is ${user.master_password_hint}`
                });
                
                res.status(200).send("Master password hint sent to your email");
                console.log("Master password hint sent to your email");
                // req.flash('success', 'Master password hint sent to your email');
                // res.locals.redirect = '/';
                // next();
            }).catch(error => {
                console.log(`Failed to send master password hint to email because ${error.message}`);
                res.status(404).send(`Failed to send master password hint to email because ${error.message}`)
                // req.flash('error', `Failed to send master password hint to email because ${error}`);
                // res.locals.redirect = '/password_hint';
                // next();
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