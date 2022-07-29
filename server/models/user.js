const mongoose = require('mongoose');
const { Schema } = mongoose;

const user_schema = Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    hash: String,
    salt: String,
    master_password_hint: {
        type: String,
        trim: true
    },
    application_passwords: [{
        type: Schema.Types.ObjectId,
        ref: 'Password'
    }]
});

module.exports = mongoose.model('User', user_schema);