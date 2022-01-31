const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { body, check} = require('express-validator');
const express_session = require('express-session');
const cookie_parser = require('cookie-parser');
const connect_flash = require('connect-flash');

const { index } = require('./controllers/home_controller');
const { new_user, create_user, edit_user, update_user, delete_user, redirect_user_view} 
    = require('./controllers/user_controller');
const User = require('./models/user');
// const method_override = require('method-override');

// const passport = require('passport');
// const local_strategy = require('passport-local').Strategy;

mongoose.connect("mongodb://127.0.0.1:27017/password_vault", {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected");
});

app.use(express.static('public'));
app.use(express.static('assets'));
app.set("view engine", "ejs");
app.use(express.urlencoded({
    extended:false
}));
app.use(express.json());
app.set("port", process.env.PORT || 3000);
// app.use(
//     method_override("_method", {
//       methods: ["POST", "GET"]
//     })
//   );
app.use(cookie_parser('geeksforgeeks'));
app.use(express_session({
    secret:'geeksforgeeks',
    saveUninitialized: false,
    resave: false
}));
app.use(connect_flash());
// app.use((req, res, next) => {
//     res.locals.flash_messages = req.flash();
//     next();
// });


app.get('/', index);
app.get('/user/new', new_user);
app.post('/user/create', check('email').notEmpty().withMessage(
    'Email is required').normalizeEmail().isEmail()
    .withMessage('Must be a valid email').custom((value, {req}) => {
        return User.findOne({email: value}).then(user => {
            if(user){
                throw new Error('Email already in use');
            }
        });
    }),
check('name').trim().notEmpty().withMessage('Name is required')
.isAlpha().withMessage('Must be only alphabetic characters'),
check('master_password').trim().notEmpty().withMessage('Master password is required')
.isLength({min: 5}).withMessage('Master password must have a minimum of 5 characters')
.matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
.matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
.matches(/(?=.*?[0-9])/).withMessage('At least one Number')
.not().matches(/^$|\s+/).withMessage('White space not allowed'),
check('confirm_master_password').trim().notEmpty()
.withMessage('Master password confirmation required').custom((value, {req}) => {
    if(value !== req.body.master_password){
        throw new Error(`Master password confirmation does not match the master password`);
    }
    return true;
}), create_user, redirect_user_view);


// app.get('/user/password_hint', (req, res) => {
//     res.render('password_hint.ejs');
// });
// app.get('/user/vault_landing_page', (req, res) => {
//     res.render('vault_landing_page.ejs');
// });

app.listen(app.get('port'), () => {
    console.log(`The server has started and is listening on port number: ${app.get('port')}`);
});