const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
    conferenceRoomId: {
        type: String,
        default: ''
    },
    userType : {
        type: String,
        enum: ['user','guest'],
        default: 'user'
    },
    userGuestId: {
        type: String,
        default: ''
    },
    requiredType: {
        type: String,
        enum: ['required','optional'],
    },
    timeInMeeting: {
        type: Number,
        default: 0
    }
});

const Participants = mongoose.model('PARTICIPANTS', ParticipantSchema, 'PARTICIPANTS');
module.exports = Participants;