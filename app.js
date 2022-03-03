require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const { body, check} = require('express-validator');
const express_session = require('express-session');
const cookie_parser = require('cookie-parser');
const connect_flash = require('connect-flash');
const passport = require('passport');
const MongoStore = require('connect-mongo');


const { index, vault, logout } = require('./controllers/home_controller');
const { new_user, create_user, edit_user, update_user, password_hint_view, retrieve_password_hint, redirect_user_view} 
    = require('./controllers/user_controller');
const User = require('./models/user');
const { Strategy } = require('passport-local');
const { create, redirect_password_view } = require('./controllers/password_controller');
const method_override = require('method-override');

mongoose.connect("mongodb://127.0.0.1:27017/password_vault", {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected");
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static('public'));
app.use(express.static('assets'));
app.use(express.static('node_modules'));
app.set("view engine", "ejs");
app.use(express.urlencoded({
    extended:false
}));
app.use(express.json());
app.set("port", process.env.PORT || 3000);
app.use(connect_flash());

app.use(
    method_override("_method", {
      methods: ["POST", "GET"]
    })
  );

app.use(express_session({
    secret:'geeksforgeeks',
    saveUninitialized: true,
    resave: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/password_vault"
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});
function is_auth(req, res, next){
    if(req.isAuthenticated()){
        res.locals.authenticated_user = req.user;
        next();
    } else{
        res.status(401).json({ msg: 'You are not authorized to view this resource'});
    }
}

app.get('/', index);
app.get('/user/new', new_user);
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
.isLength({min: 5}).withMessage('Master password must have a minimum of 5 characters')
.matches(/(?=.*?[A-Z])/).withMessage('Master password must have at least one Uppercase')
.matches(/(?=.*?[a-z])/).withMessage('Master password must have at least one Lowercase')
.matches(/(?=.*?[0-9])/).withMessage('Master password must have at least one Number')
.not().matches(/^$|\s+/).withMessage('White space not allowed'),
check('confirm_master_password').trim().not().isEmpty()
.withMessage('Master password confirmation required').custom((value, {req}) => {
    if(value !== req.body.master_password){
        throw new Error(`Master password confirmation does not match the master password`);
    }
    return true;
}), create_user, redirect_user_view);
app.get('/:id/edit_user', edit_user);
app.put('/:id/update_user', update_user, redirect_user_view);

app.post('/login', passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/vault_landing_page',
    failureFlash: true
}));
app.get('/password_hint', password_hint_view);
app.post('/password_hint', retrieve_password_hint, redirect_user_view);

app.get('/vault_landing_page', is_auth, vault);
app.post('/create_password', create, redirect_password_view);
app.get('/logout', logout);

app.listen(app.get('port'), () => {
    console.log(`The server has started and is listening on port number: ${app.get('port')}`);
});