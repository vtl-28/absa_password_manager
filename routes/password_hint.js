const express = require('express');
const app = express.Router();
const { body, check} = require('express-validator');
const User = require('../models/user');

const { retrieve_password_hint, password_hint_view, redirect_password_hint_view} = require('../controllers/password_hint_controller');

//route to access page to retrieve user master password hint
app.get('/password_hint', password_hint_view);
//route to retrieve user master password hint
app.post('/password_hint', check('email').not().isEmpty().withMessage(
    'Email is required').normalizeEmail().isEmail()
    .withMessage('Must be a valid email').custom((value, {req}) => {
        return User.findOne({email: value}).then(user => {
            if(!user){
                throw new Error('User does not exist');
            }
        });
    }),retrieve_password_hint, redirect_password_hint_view);

 module.exports = app;
