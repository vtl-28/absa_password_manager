const express = require('express');
const app = express.Router();

const { create, decryptApplicationPassword, showApplicationPassword, deletePassword } = require('../controllers/password_controller');

//route to create and store an application password for user
app.post('/create_password', create);
app.get('/find_password', showApplicationPassword);
app.get('/decrypt_password/:application_password', decryptApplicationPassword);
app.delete("/deletePassword/:id", deletePassword);

module.exports = app;