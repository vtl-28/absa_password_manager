const User = require('../models/user');
const { validationResult } = require('express-validator');
const gen_password = require('../lib/password_utils').genPassword;
const email_helper = require('../config/send_email');

module.exports = {
    //handler to access page to register user
    new_user: (req, res) => {
         res.render('register', { error: req.flash('error'), 
         validation_errors: req.flash('validation_errors')});
    },
    //handler to create and register a new user
    create_user: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let messages = errors.array().map(e => e.msg);
            req.skip = true;
            res.status(400).send(messages.toString());
            console.log(messages);
    
            // req.flash('validation_errors', messages);
            // res.locals.redirect = '/user/new';
            // next();
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
                // req.flash('success', `${user.name} successfully created`);
                // res.locals.redirect = '/';
                console.log(`User ${user.name} successfully created`);
                res.status(201).send(`User ${user.name} successfully created` )
                //next();
            }).catch(error => {
                // req.flash('error', `Failed to create user account because ${error.message}`);
                // res.locals.redirect = '/user/new'
                console.log(`Error saving user: ${error.message}`);
                res.status(404).send(`${error.message}`)
               // next();
            })
          }
    },
    fetch_user: (req, res, next) => {
        User.findOne({email: req.params.email}).then((user) => {
            console.log(`User ${user.name} successfully found`);
            res.status(201).send(user);
        }).catch((error) => {
            console.log(`Error finding user: ${error.message}`);
            res.status(404).send(`${error.message}`)
        })
    },
    //handler to access page to update details of user
    fetch_account: (req, res, next) => {
        let user_id = req.params.id; 
        User.findById(user_id).then(user => {
            console.log(`User ${user.id} successfully found`);
            res.status(200).send(user);
        }).catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            res.status(404).send(`Error fetching user by ID: ${error.message}`);
            //next(error);
        })
    },
    //handler to update details of user
    update_user: (req, res, next) => {
        let user_id = req.params.id; 
        let user_params = {
            email: req.body.email,
            name: req.body.name,
            master_password_hint: req.body.master_password_hint
        }
        User.findByIdAndUpdate(user_id, {
            $set: user_params
        }).then(user => {
            console.log(`${user.name}'s account updated successfully!`);
            res.status(200).send(`${user.name}'s account updated successfully!`);
            // req.flash('update_success', `${user.name}'s account
            // updated successfully!`);
            // res.locals.redirect = '/vault_landing_page';
            // next();
        }).catch(error => {
            console.log(`Error updating user by ID: ${error.message}`);
            res.status(404).send(`Error updating user by ID: ${error.message}`);
            // console.log(`Error updating user by ID: ${error.message}`);
            // next(error);
        });
    },
    //handler to redirect to appropriate page
    redirect_user_view: (req, res, next) => {
        let redirect_path = res.locals.redirect;
        if(redirect_path) res.redirect(redirect_path);
        else next();
    }
}