const Password = require('../models/password');
const gen_password = require('../lib/password_utils').genPassword;

module.exports = {
    create: (req, res, next) => {
        const salt_hash = gen_password(req.body.password);
        const salt = salt_hash.salt;
        const hash = salt_hash.hash;
        let password_params = {
            application_name: req.body.app_name,
            username: req.body.username,
            salt,
            hash,
            confirm_password: req.body.confirm_password
        }

        Password.create(password_params).then(password => {
            res.locals.redirect = '/vault_landing_page';
            console.log(`${password.application_name}'s password successfully created`);
            next();
        }).catch(error => {
            console.log(`Error saving password: ${error.message}`);
            next();
        });
    },
    update_password: (req, res, next) => {
        
    },
    delete_password: (req, res, next) => {
        
    },
    redirect_password_view: (req, res, next) => {
        let redirect_path = res.locals.redirect;
        if(redirect_path) res.redirect(redirect_path);
        else next();
    }
}