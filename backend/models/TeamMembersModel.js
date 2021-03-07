const mongoose = require('mongoose');

const TeamMembersSchema = new mongoose.Schema({
    teamId : {
        type: String,
        default: ''
    },
    userId : {
        type: String,
        default: ''
    },

}, {timestamps: true});


const TeamMembers = mongoose.model('TEAM_MEMBERS', TeamMembersSchema, 'TEAM_MEMBERS');
module.exports = TeamMembers;