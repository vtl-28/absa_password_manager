const User = require('../models/user');
const { validationResult } = require('express-validator');
const gen_password = require('../lib/password_utils').genPassword;
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2; 

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
            req.flash('validation_errors', messages);
            res.locals.redirect = '/user/new';
            next();
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
    //handler to access page to update details of user
    edit_user: (req, res, next) => {
        let user_id = req.params.id; 
        User.findById(user_id).then(user => {
            res.render('account', {
                user: user
            });
        }).catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
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
            req.flash('update_success', `${user.name}'s account
            updated successfully!`);
            res.locals.redirect = '/vault_landing_page';
            next();
        }).catch(error => {
            console.log(`Error updating user by ID: ${error.message}`);
            next(error);
        });
    },
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
                const create_transporter = async () => {
                    const oauth2_client = new OAuth2(
                        process.env.OAUTH_CLIENTID,
                        process.env.OAUTH_CLIENT_SECRET,
                        "https://developers.google.com/oauthplayground"
                      );
                
                      oauth2_client.setCredentials({
                          refresh_token: process.env.OAUTH_REFRESH_TOKEN
                      });
                
                      const access_token = await new Promise((resolve, reject) => {
                          oauth2_client.getAccessToken((err, token) => {
                              if(err){
                                  reject('Couldnt retrieve access token' + err);
                              }
                              resolve(token);
                          });
                      });
                
                      const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            type: 'OAuth2',
                            user: process.env.MAIL_USERNAME,
                            pass: process.env.MAIL_PASSWORD,
                            access_token,
                            clientId: process.env.OAUTH_CLIENTID,
                            clientSecret: process.env.OAUTH_CLIENT_SECRET,
                            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                    
                        },
                        tls: {
                            // do not fail on invalid certs
                            rejectUnauthorized: false
                        }
                    });
                    transporter.verify((err, success) => {
                    err
                      ? console.log(err)
                      : console.log(`=== Server is ready to take messages: ${success} ===`);
                   });
                    return transporter;
                      
                };
                
                const send_email = async (email_options) => {
                    let email_transporter = await create_transporter();
                    await email_transporter.sendMail(email_options);
                }
                send_email({
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
    redirect_user_view: (req, res, next) => {
        let redirect_path = res.locals.redirect;
        if(redirect_path) res.redirect(redirect_path);
        else next();
    }
}