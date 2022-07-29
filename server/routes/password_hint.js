const express = require('express');
const app = express.Router();
const { body, check} = require('express-validator');
const User = require('../models/user');

const { retrieve_password_hint, password_hint_view} = require('../controllers/password_hint_controller');

//route to access page to retrieve user master password hint
app.get('/password_hint', password_hint_view);
//route to retrieve user master password hint
app.post('/password_hint', retrieve_password_hint);

 module.exports = app;
