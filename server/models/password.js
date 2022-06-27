const mongoose = require('mongoose');
const { Schema } = mongoose;

const password_schema = Schema({
    department: {
        type: String,
        trim: true
    },
    application_name: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        trim: true
    },
    hash: String,
    salt: String,
});

module.exports = mongoose.model('Password', password_schema);