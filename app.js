const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const method_override = require('method-override');
// const express_session = require('express-session');
// const cookie_parser = require('cookie-parser');
// const connect_flash = require('connect-flash');
// const passport = require('passport');
// const local_strategy = require('passport-local').Strategy;
//const express_validator = require('express-validator');
mongoose.connect("mongodb://127.0.0.1:27017/password_vault", {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected");
});

app.use(express.urlencoded({
    extended:false
}));
app.use(express.json());
app.use(express.static('public'));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
// app.use(
//     method_override("_method", {
//       methods: ["POST", "GET"]
//     })
//   );

app.listen(app.get('port'), () => {
    console.log(`The server has started and is listening on port number: ${app.get('port')}`);
});