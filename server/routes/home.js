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
        res.status(200).send("User loggin in")
        next();
    } else{
        res.status(401).json({ msg: 'You are not authorized to view this resource'});
    }
}

//route to access home page
app.get('/', index);
//route authenticate and login registered user
// app.post('/login', passport.authenticate('local', {
//     failureRedirect: '/',
//     successRedirect: '/vault_landing_page',
//     failureFlash: true
// }));
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) throw err;
        if(!user) res.status(404).send("User does not exist");
        else {
            req.logIn(user, (err) => {
              if (err) throw err;
              res.status(200).send("Successfully Authenticated");
              console.log(req.user);
              console.log(req.session);
              next();
            });
          }
    })(req, res, next)
});
//route to access vault of authenticated user
app.get('/vault_landing_page', is_auth, vault);
//route to logout authenticated user
app.post('/logout', logout);

module.exports = app;