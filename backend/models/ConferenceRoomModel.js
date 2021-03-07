const mongoose = require('mongoose');

const ConferenceRoomSchema = new mongoose.Schema({
    teamid : {
        type: String,
        default: ''
    },
    ownerUserId : {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    canEnterGuest: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const ConferenceRooms = mongoose.model('CONFERENCE_ROOMS', ConferenceRoomSchema, 'CONFERENCE_ROOMS');
module.exports = ConferenceRooms;