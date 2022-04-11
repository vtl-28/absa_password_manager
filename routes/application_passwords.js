const express = require('express');
const app = express.Router();

const { create, redirect_password_view, show_application_password } = require('../controllers/password_controller');

//route to create and store an application password for user
app.post('/create_password', create,redirect_password_view, show_application_password);

module.exports = app;