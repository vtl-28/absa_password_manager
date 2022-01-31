const User = require('../models/user');
const { validationResult } = require('express-validator');


module.exports = {
    new_user: (req, res) => {
         res.render('register.ejs', { error: req.flash('error')});
    },
    create_user: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          };

        let user_params = {
            email: req.body.email,
            name: req.body.name,
            master_password: req.body.master_password,
            master_password_hint: req.body.master_password_hint
        }
        User.create(user_params).then(user => {
            req.flash('success', `${user.name}'s successfully created`);
            res.locals.redirect = '/';
            console.log(`User ${user.name} successfully created`);
            next();
        }).catch(error => {
            req.flash('error', `Failed to create user account because ${error.message}`);
            res.locals.redirect = '/user/new'
            console.log(`Error saving user: ${error.message}`);
            
        })
    },
    edit_user: (req, res) => {
        
    },
    update_user: (req, res) => {
        
    },
    delete_user: (req, res) => {
        
    },
    redirect_user_view: (req, res) => {
        let redirect_path = res.locals.redirect;
        if(redirect_path) res.redirect(redirect_path);
        else next();
    }
}