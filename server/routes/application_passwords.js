const express = require('express');
const app = express.Router();

const { create, decrypt_application_password, show_application_password, delete_password } = require('../controllers/password_controller');

//route to create and store an application password for user
app.post('/create_password', create);
app.get('/find_password', show_application_password);
app.get('/decrypt_password/:application_password', decrypt_application_password);
app.delete("/delete_password/:id", delete_password);

module.exports = app;