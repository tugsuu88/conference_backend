const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
    firstName : {
        type: String,
        default: ''
    },
    lastName : {
        type: String,
        default: ''
    }

}, {timestamps: true});


const Guests = mongoose.model('GUESTS', GuestSchema, 'GUESTS');
module.exports = Guests;