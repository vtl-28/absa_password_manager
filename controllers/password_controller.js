const Password = require('../models/password');
const gen_password = require('../lib/password_utils').genPassword;

module.exports = {
    create_password: (req, res, next) => {
        
    },
    update_password: (req, res, next) => {
        
    },
    delete_password: (req, res, next) => {
        
    },
    redirect_user_view: (req, res, next) => {
        let redirect_path = res.locals.redirect;
        if(redirect_path) res.redirect(redirect_path);
        else next();
    }
}