const express = require('express');
const app = express.Router();
const { body, check} = require('express-validator');
const User = require('../models/user');

const { new_user, create_user, edit_user, update_user, redirect_user_view, password_hint_view, retrieve_password_hint} 
    = require('../controllers/user_controller');

//route to access page to create new user
app.get('/user/new', new_user);
//route to create and validate new user
app.post('/user/create', check('email').not().isEmpty().withMessage(
    'Email is required').normalizeEmail().isEmail()
    .withMessage('Must be a valid email').custom((value, {req}) => {
        return User.findOne({email: value}).then(user => {
            if(user){
                throw new Error('Email already in use');
            }
        });
    }),
check('name').trim().not().isEmpty().withMessage('Name is required')
.isAlpha().withMessage('Name must be only alphabetic characters'),
check('master_password').trim().not().isEmpty().withMessage('Master password is required')
.isLength({min: 8}).withMessage('Master password must have a minimum of 8 characters')
.matches(/(?=.*?[0-9])/).withMessage('Master password must have at least one Number')
.not().matches(/^$|\s+/).withMessage('White space not allowed'),
check('confirm_master_password').trim().not().isEmpty()
.withMessage('Master password confirmation required').custom((value, {req}) => {
    if(value !== req.body.master_password){
        throw new Error(`Master password confirmation does not match the master password`);
    }
    return true;
}), create_user, redirect_user_view);
//route to access page to edit user details
app.get('/:id/edit_user', edit_user);
//route to update details of existing user
app.put('/:id/update_user', update_user, redirect_user_view);

// //route to access page to retrieve user master password hint
// app.get('/password_hint', password_hint_view);
// //route to retrieve user master password hint
// app.post('/password_hint', check('email').not().isEmpty().withMessage(
//     'Email is required').normalizeEmail().isEmail()
//     .withMessage('Must be a valid email').custom((value, {req}) => {
//         return User.findOne({email: value}).then(user => {
//             if(!user){
//                 throw new Error('User does not exist');
//             }
//         });
//     }),retrieve_password_hint, redirect_user_view);

module.exports = app;