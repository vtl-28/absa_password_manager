const User = require('../models/user');
const { validationResult } = require('express-validator');
const gen_password = require('../lib/password_utils').genPassword;

module.exports = {
    new_user: (req, res) => {
         res.render('register', { error: req.flash('error'), 
         validation_errors: req.flash('validation_errors')});
    },
    create_user: (req, res, next) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let messages = errors.array().map(e => e.msg);
            req.skip = true;
            req.flash('validation_errors', messages);
            res.locals.redirect = '/user/new';
            next();
            //return res.status(400).json({ errors: errors.array() });
          }else{
            const salt_hash = gen_password(req.body.master_password);
            const salt = salt_hash.salt;
            const hash = salt_hash.hash;
            let user_params = {
                email: req.body.email,
                name: req.body.name,
                hash: hash,
                salt: salt,
                confirm_master_password: req.body.confirm_master_password,
                master_password_hint: req.body.master_password_hint
            }
            
            User.create(user_params).then(user => {
                req.flash('success', `${user.name} successfully created`);
                res.locals.redirect = '/';
                console.log(`User ${user.name} successfully created`);
                next();
            }).catch(error => {
                req.flash('error', `Failed to create user account because ${error.message}`);
                res.locals.redirect = '/user/new'
                console.log(`Error saving user: ${error.message}`);
                next();
            })
          }
    },
    edit_user: (req, res) => {
        
    },
    update_user: (req, res) => {
        
    },
    delete_user: (req, res) => {
        
    },
    redirect_user_view: (req, res, next) => {
        let redirect_path = res.locals.redirect;
        if(redirect_path) res.redirect(redirect_path);
        else next();
    }
}