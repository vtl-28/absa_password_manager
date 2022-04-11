const express = require('express');
const app = express.Router();
const passport = require('passport');

const { index, vault, logout } = require('../controllers/home_controller');

//require and let server know of passport strategy 
require('../config/passport');
app.use(passport.initialize());
app.use(passport.session());

//middleware to check if user is authenticated
function is_auth(req, res, next){
    if(req.isAuthenticated()){
        res.locals.authenticated_user = req.user;
        next();
    } else{
        res.status(401).json({ msg: 'You are not authorized to view this resource'});
    }
}

//route to access home page
app.get('/', index);
//route authenticate and login registered user
app.post('/login', passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/vault_landing_page',
    failureFlash: true
}));
//route to access vault of authenticated user
app.get('/vault_landing_page', is_auth, vault);
//route to logout authenticated user
app.get('/logout', logout);

module.exports = app;