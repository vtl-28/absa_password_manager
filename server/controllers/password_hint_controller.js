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
        let user_email = Object.keys(req.body).toString();
        User.findOne({email: user_email})
        .then(user => {
            res.status(200).send(`Your master password hint is ${user.master_password_hint}`);     
               
        }).catch(error => {
            console.log(`Failed to send master password hint to email because ${error.message}`);
            res.status(404).send(`Failed to send master password hint to email because ${error.message}`)
           
        });

        // const errors = validationResult(req);
        // if(!errors.isEmpty()) {
        //     let messages = errors.array().map(e => e.msg);
        //     req.skip = true;
        //     res.status(400).send(messages.toString());
        //     console.log(messages);
        //   }else{
        //     let user_email = Object.keys(req.body).toString();
        //     User.findOne({email: user_email}).then(user => {
        //         if(user.master_password_hint === ''){
        //             res.status(200).send(`You unfortunately did not set a master password hint`); 
        //         }
        //         res.status(200).send(`Your master password hint is ${user.master_password_hint}`);
                
        //         // email_helper.send_email({
        //         //     from: 'test@gmail.com',
        //         //     to: user.email,
        //         //     subject: 'Master password hint',
        //         //     text: `Your master password hint is ${user.master_password_hint}`
        //         // });
                
                
        //         console.log(`user found ${user.master_password_hint}`);
               
        //     }).catch(error => {
        //         console.log(`Failed to send master password hint to email because ${error.message}`);
        //         res.status(404).send(`Failed to send master password hint to email because ${error.message}`)
               
        //     });
        //   }
    },
    //handler to redirect to appropriate page
    redirect_password_hint_view: (req, res, next) => {
        let redirect_path = res.locals.redirect;
        if(redirect_path) res.redirect(redirect_path);
        else next();
    }

}