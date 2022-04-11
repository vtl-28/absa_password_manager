require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const express_session = require('express-session');
const cookie_parser = require('cookie-parser');
const connect_flash = require('connect-flash');
const method_override = require('method-override');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const connect_db = require('./config/db_conn');

const home_route = require('./routes/home');
const user_route = require('./routes/user');
const password_hint_route = require('./routes/password_hint');
const application_passwords_route = require('./routes/application_passwords');

connect_db();

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
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URI
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 
    }
}));



//middleware to print session details of authenticated user
app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});



app.use(home_route);
app.use(user_route);
app.use(password_hint_route);
app.use(application_passwords_route);


app.listen(app.get('port'), () => {
    console.log(`The server has started and is listening on port number: ${app.get('port')}`);
});