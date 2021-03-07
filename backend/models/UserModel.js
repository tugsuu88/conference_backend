const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName : {
        type: String,
        default: ''
    },
    lastName : {
        type: String,
        default: ''
    },
    idAuthorized: {
        type: String,
        default: ''
    }

}, {timestamps: true});


const Users = mongoose.model('USERS', UserSchema, 'USERS');
module.exports = Users;