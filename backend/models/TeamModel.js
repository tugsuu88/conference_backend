const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name : {
        type: String,
        default: ''
    },
    ownerId : {
        type: String,
        default: ''
    },
    totalConferenceTime : {
        type: Number,
        default: 0
    }

}, {timestamps: true});


const Teams = mongoose.model('TEAMS', TeamSchema, 'TEAMS');
module.exports = Teams;