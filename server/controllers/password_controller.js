const Password = require('../models/password');
const User = require('../models/user');
const gen_password = require('../lib/password_utils').genPassword;

module.exports = {
    //handler to create and store user application password
    create: (req, res, next) => {
        const salt_hash = gen_password(req.body.application_password);
        const salt = salt_hash.salt;
        const hash = salt_hash.hash;
        let password_params = {
            department: req.body.department,
            application_name: req.body.appication_name,
            username: req.body.username,
            salt,
            hash
        }

        Password.create(password_params).then(password => {
            //res.locals.redirect = '/vault_landing_page';
            //req.flash('app_pass', password)
            //req.flash('add_password_success', `${password.application_name}'s password successfully created`)
            console.log(`Application password successfully created`);
            res.status(200).send(`Application password successfully created`);
            //let user_id = req.session.passport.user;
            // User.findByIdAndUpdate(user_id, 
            //     {$push: {application_passwords: password._id}},
            //     { new: true, useFindAndModify: false}).populate('application_passwords').
            //     exec(function(err, user){
            //         if(err) next(err);
            //         console.log(user);
            //     });
            // next();
        }).catch(error => {
            console.log(`Error saving password: ${error.message}`);
            res.status(404).send(`Error saving password: ${error.message}`)
            //next(error);
        });
    },
    populate_user_application_passwords_field: (req, res, next) => {
        let user_id = req.session.passport.user;
        User.findById(user_id).populate('application_passwords').then(user => {
            console.log(`User's application passwords field successfully populated with Password documents`);
            next();
        }).catch(error => {
            console.log(`Error populating user's application passwords field: ${error.message}`);
            next(error);
        });
    },
    show_application_password: (req, res, next) => {
        Password.find()
        .then(password => {
                console.log(`Application password successfully found`);   
                res.status(200).send(password);
                console.log(password);
            
            // res.render('vault_landing_page', { pass: JSON.stringify(password)});
            // next()
        }).catch(error => {
            console.log(`Error retrieving last inserted application password: ${error.message}`);
            res.status(404).send(`Error retrieving last inserted application password: ${error.message}`);
            //next(error);
        });
    },
    update_password: (req, res, next) => {
        
    },
    delete_password: (req, res, next) => {
        
    },
    //handler to redirect to appropriate page
    redirect_password_view: (req, res, next) => {
        let redirect_path = res.locals.redirect;
        if(redirect_path){
            res.redirect(redirect_path);
            next()
        } 
        else next();
    }
}