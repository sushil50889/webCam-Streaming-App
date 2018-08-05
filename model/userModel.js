const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({

    userEmail: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },

    userName: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },

    userPassword: {
        type: String,
        trim: true
    },

    active: {
        type: Boolean,
        default: true
    }
});






module.exports = mongoose.model('user', userSchema);