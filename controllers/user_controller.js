const User = require('../models/user');

module.exports = {
    new_user: (req, res) => {
         res.render('register.ejs');
    },
    create_user: (req, res, next) => {
        let user_params = {
            email: req.body.email,
            name: req.body.name,
            master_password: req.body.master_password,
            master_password_hint: req.body.master_password_hint
        }
        User.create(user_params).then(user => {
            res.locals.redirect = '/';
            console.log(`User ${user.name} successfully created`);
            next();
        }).catch(error => {
            console.log(`${error.message}`);
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