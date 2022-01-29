const mongoose = require('mongoose');
const { Schema } = mongoose;

const user_schema = Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        trim: true
    },
    master_password: {
        type: String
    },
    master_password_hint: {
        type: String,
    },
    application_passwords: [{
        type: Schema.Types.ObjectId,
        ref: 'Password'
    }]
});

module.exports = mongoose.model('User', user_schema);