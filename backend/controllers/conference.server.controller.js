const ConferenceRooms = require("../models/ConferenceRoomModel");
const Participants = require("../models/ParticipantModel");
const Users = require("../models/UserModel");
const Guests = require("../models/GuestModel");
const Teams = require("../models/TeamModel");
const { find } = require("../models/ConferenceRoomModel");

exports.createConferenceRoom = async function (req, res) {
    try {
        // validating
        const { teamId, ownerUserId, canEnterGuest, name } = req.body;
        if(!teamId) {
            return res.status(200).json({intResult: 1, msg: 'team id must be entered', data: ''});
        }
        if(!ownerUserId) {
            return res.status(200).json({intResult: 1, msg: 'owner user id must be entered', data: ''});
        }
        // if(!canEnterGuest) {
        //     return res.status(200).json({intResult: 1, msg: 'can enter guest?', data: ''});
        // }

        //save entity
        const newConferenceRoom = new ConferenceRooms({teamId: teamId, ownerUserId: ownerUserId, canEnterGuest: canEnterGuest, name: name});
        await newConferenceRoom.save();

        res.json({intResult: 0, msg: 'successfully created', data: newConferenceRoom});
    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
};

exports.updateConferenceRoom = async function (req, res) {
    try {
        const { roomId, name } = req.body;
        if(!roomId) {
            return res.status(200).json({intResult: 1, msg: 'room id must be entered', data: ''});
        }

        const existRoom = await ConferenceRooms.findOne({_id: roomId});
        if(!existRoom) {
            return res.status(200).json({intResult: 1, msg: 'cant find conference room', data: ''});
        }

        existRoom.name = name;

        await existRoom.save();
        res.json({intResult: 0, msg: 'room name was changed', data: existRoom});
    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}

exports.addRequiredParticipants = async function(req, res) {
    try {
        const { roomId, userId } = req.body;

        
        // validating
        if(!roomId) {
            return res.status(200).json({intResult: 1, msg: 'room id must be entered', data: ''});
        }
        if(!userId) {
            return res.status(200).json({intResult: 1, msg: 'user id must be entered', data: ''});
        }
        
        const room = await ConferenceRooms.findOne({_id: roomId});
        const user = await Users.findOne({_id: userId});
        if(!room) {
            return res.status(200).json({intResult: 1, msg: 'cant find conference room', data: ''});
        }
        if(!user) {
            return res.status(200).json({intResult: 1, msg: 'cant find user', data: ''});
        }

        const existParticipant = await Participants.findOne({conferenceRoomId: roomId, userGuestId: userId});

        if(existParticipant) {
            return res.status(200).json({intResult: 1, msg: 'user already joined in this conference', data: ''});
        }
        
        // save Participant
        const newParticipant = new Participants({
            conferenceRoomId: roomId,
            userType: 'user',
            userGuestId: userId,
            requiredType: 'required',
            timeInMeeting: 0
        });
        await newParticipant.save();

        res.json({intResult: 0, msg: 'successfully created', data: newParticipant});
    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}

exports.addBulkRequiredParticipants = async function(req, res) {
    try {
        const { roomId, listUserId } = req.body;
        var retList = [];
        var successCount = 0;
        var errorCount = 0;

        console.log('roomId', roomId);

        // validating
        if(!roomId) {
            return res.status(200).json({intResult: 1, msg: 'room id must be entered', data: ''});
        }
        if(!listUserId || listUserId.lenght <= 0) {
            return res.status(200).json({intResult: 1, msg: 'list user ids must be entered', data : ''});
        }
        const room = await ConferenceRooms.findOne({_id: roomId});
        if(!room) {
            return res.status(200).json({intResult: 1, msg: 'cant find conference room', data: ''});
        }

        for(const member of listUserId) {
            
            const user = await Users.findOne({_id: member.userId});
            const existParticipant = await Participants.findOne({conferenceRoomId: roomId, userGuestId: member.userId});

            if(!user) {
                retList.push({intResult: 1, msg: '[' + member.userId + '] cant find user', data: ''})
                errorCount++;
                continue;
            }
            if(existParticipant) {
                retList.push({intResult: 1, msg: 'user already joined in this conference', data: ''});
                errorCount++;
                continue;
            }
            console.log('member.userId', member.userId);
            // save Participant
            const newParticipant = new Participants({
                conferenceRoomId: roomId,
                userType: 'user',
                userGuestId: member.userId,
                requiredType: 'required',
                timeInMeeting: 0
            });
            await newParticipant.save();
            retList.push({intResult: 0, msg: 'user successfully added', data : newParticipant});
            successCount++;
        }
        return res.status(200).json({intResult: 0, msg: 'successfully added success: ['+successCount+'], ['+errorCount+']', data : retList});
    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}

exports.addOptionalParticipants = async function(req, res) {
    try {
        const { roomId, userId } = req.body;
        // validating
        if(!roomId) {
            return res.status(200).json({intResult: 1, msg: 'room id must be entered', data: ''});
        }
        if(!userId) {
            return res.status(200).json({intResult: 1, msg: 'user id must be entered', data: ''});
        }
        
        const room = await ConferenceRooms.findOne({_id: roomId});
        const user = await Users.findOne({_id: userId});
        if(!room) {
            return res.status(200).json({intResult: 1, msg: 'cant find conference room', data: ''});
        }
        if(!user) {
            return res.status(200).json({intResult: 1, msg: 'cant find user', data: ''});
        }

        const existParticipant = await Participants.findOne({conferenceRoomId: roomId, userGuestId: userId});

        if(existParticipant) {
            return res.status(200).json({intResult: 1, msg: 'user already joined in this conference', data: ''});
        }
        
        // save Participant
        const newParticipant = new Participants({
            conferenceRoomId: roomId,
            userType: 'user',
            userGuestId: userId,
            requiredType: 'optional',
            timeInMeeting: 0
        });
        await newParticipant.save();

        res.json({intResult: 0, msg: 'successfully created', data: newParticipant});
    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}

exports.addBulkOptionalParticipants = async function(req, res) {
    try {
        const { roomId, listUserId } = req.body;
        var retList = [];
        var successCount = 0;
        var errorCount = 0;

        console.log('roomId', roomId);

        // validating
        if(!roomId) {
            return res.status(200).json({intResult: 1, msg: 'room id must be entered', data: ''});
        }
        if(!listUserId || listUserId.lenght <= 0) {
            return res.status(200).json({intResult: 1, msg: 'list user ids must be entered', data : ''});
        }
        const room = await ConferenceRooms.findOne({_id: roomId});
        if(!room) {
            return res.status(200).json({intResult: 1, msg: 'cant find conference room', data: ''});
        }

        for(const member of listUserId) {
            
            const user = await Users.findOne({_id: member.userId});
            const existParticipant = await Participants.findOne({conferenceRoomId: roomId, userGuestId: member.userId});

            if(!user) {
                retList.push({intResult: 1, msg: '[' + member.userId + '] cant find user', data: ''})
                errorCount++;
                continue;
            }
            if(existParticipant) {
                retList.push({intResult: 1, msg: 'user already joined in this conference', data: ''});
                errorCount++;
                continue;
            }
            console.log('member.userId', member.userId);
            // save Participant
            const newParticipant = new Participants({
                conferenceRoomId: roomId,
                userType: 'user',
                userGuestId: member.userId,
                requiredType: 'optional',
                timeInMeeting: 0
            });
            await newParticipant.save();
            retList.push({intResult: 0, msg: 'user successfully added', data : newParticipant});
            successCount++;
        }
        return res.status(200).json({intResult: 0, msg: 'successfully added success: ['+successCount+'], ['+errorCount+']', data : retList});
    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}

exports.getParticipants = async function(req, res) {
    const roomId = req.query.roomId;
    try {
        if(!roomId) {
            return res.status(200).json({intResult: 1, msg: 'room id must be entered', data: ''});
        }
        const rooms = await Participants.find({ conferenceRoomId:  roomId}).exec();
        res.json({intResult: 0, msg: '', data: rooms});
    }
    catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}

exports.getRequiredParticipants = async function(req, res) {
    try {
        const roomId = req.query.roomId;
        if(!roomId) {
            return res.status(200).json({intResult: 1, msg: 'room id must be entered', data: ''});
        }

        var option = {conferenceRoomId:  roomId, requiredType: 'required' }
        console.log("option", option);
        const rooms = await Participants.find(option).exec();
        res.json({intResult: 0, msg: '', data: rooms});
    }
    catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}
exports.getOptionalParticipants = async function(req, res) {
    try {
        const roomId = req.query.roomId;
        if(!roomId) {
            return res.status(200).json({intResult: 1, msg: 'room id must be entered', data: ''});
        }

        var option = {conferenceRoomId:  roomId, requiredType: 'optional' }
        console.log("option", option);
        const rooms = await Participants.find(option).exec();
        res.json({intResult: 0, msg: '', data: rooms});
    }
    catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}

exports.addGuestParticipants = async function(req, res) {
    try {
        const { roomId, userId } = req.body;
        // validating
        if(!roomId) {
            return res.status(200).json({intResult: 1, msg: 'room id must be entered', data: ''});
        }
        if(!userId) {
            return res.status(200).json({intResult: 1, msg: 'user id must be entered', data: ''});
        }
        
        const room = await ConferenceRooms.findOne({_id: roomId});
        const guest = await Guests.findOne({_id: userId});
        if(!room) {
            return res.status(200).json({intResult: 1, msg: 'cant find conference room', data: ''});
        }
        if(!guest) {
            return res.status(200).json({intResult: 1, msg: 'cant find user', data: ''});
        }

        const existParticipant = await Participants.findOne({conferenceRoomId: roomId, userGuestId: userId});

        if(existParticipant) {
            return res.status(200).json({intResult: 1, msg: 'user already joined in this conference', data: ''});
        }
        
        // save Participant
        const newParticipant = new Participants({
            conferenceRoomId: roomId,
            userType: 'guest',
            userGuestId: userId,
            requiredType: 'optional',
            timeInMeeting: 0
        });
        await newParticipant.save();

        res.json({intResult: 0, msg: 'successfully created', data: newParticipant});
    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}

exports.addBulkGuestParticipants = async function(req, res) {
    try {
        const { roomId, listUserId } = req.body;
        var retList = [];
        var successCount = 0;
        var errorCount = 0;

        console.log('roomId', roomId);

        // validating
        if(!roomId) {
            return res.status(200).json({intResult: 1, msg: 'room id must be entered', data: ''});
        }
        if(!listUserId || listUserId.lenght <= 0) {
            return res.status(200).json({intResult: 1, msg: 'list user ids must be entered', data : ''});
        }
        const room = await ConferenceRooms.findOne({_id: roomId});
        if(!room) {
            return res.status(200).json({intResult: 1, msg: 'cant find conference room', data: ''});
        }

        for(const member of listUserId) {
            
            const user = await Guests.findOne({_id: member.userId});
            const existParticipant = await Participants.findOne({conferenceRoomId: roomId, userGuestId: member.userId});

            if(!user) {
                retList.push({intResult: 1, msg: '[' + member.userId + '] cant find user', data: ''})
                errorCount++;
                continue;
            }
            if(existParticipant) {
                retList.push({intResult: 1, msg: 'user already joined in this conference', data: ''});
                errorCount++;
                continue;
            }
            console.log('member.userId', member.userId);
            // save Participant
            const newParticipant = new Participants({
                conferenceRoomId: roomId,
                userType: 'guest',
                userGuestId: member.userId,
                requiredType: 'optional',
                timeInMeeting: 0
            });
            await newParticipant.save();
            retList.push({intResult: 0, msg: 'user successfully added', data : newParticipant});
            successCount++;
        }
        return res.status(200).json({intResult: 0, msg: 'successfully added success: ['+successCount+'], ['+errorCount+']', data : retList});
    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}

exports.getGuestParticipants = async function(req, res) {
    const roomId = req.query.roomId;
    try {
        if(!roomId) {
            return res.status(200).json({intResult: 1, msg: 'room id must be entered', data: ''});
        }
        var option = {conferenceRoomId:  roomId, userType: 'guest' }
        console.log("option", option);

        const rooms = await Participants.find(option).exec();
        res.json({intResult: 0, msg: '', data: rooms});
    }
    catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}

exports.getUserParticipants = async function(req, res) {
    const roomId = req.query.roomId;
    try {
        if(!roomId) {
            return res.status(200).json({intResult: 1, msg: 'room id must be entered', data: ''});
        }
        var option = {conferenceRoomId:  roomId, userType: 'user' }
        console.log("option", option);

        const rooms = await Participants.find(option).exec();
        res.json({intResult: 0, msg: '', data: rooms});
    }
    catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}

exports.changeParticipantTimeInMeeting = async function (req, res) {
    try {
        // validating
        const { participantId, timeInMeeting } = req.body;
        if(!participantId) {
            return res.status(200).json({intResult: 1, msg: 'participant id must be entered', data: ''});
        }

        if(!timeInMeeting || timeInMeeting <= 0) {
            return res.status(200).json({intResult: 1, msg: 'time in meeting must be entered', data: ''});
        }

        const existParticipant = await Participants.findOne({_id: participantId});
        if(!existParticipant) {
            return res.status(200).json({intResult: 1, msg: 'cant find participant', data: ''});
        }
        // change time in meeting of participant
        existParticipant.timeInMeeting = timeInMeeting;
        await existParticipant.save();

        // change teams totalUsedConferenceTime
        const room = await ConferenceRooms.findOne({_id: existParticipant.conferenceRoomId});
        if(!room) {
            return res.status(200).json({intResult: 1, msg: 'cant find conference room', data: ''});
        }

        const team = await Teams.findOne({_id: room.teamid});
        if(!team) {
            return res.status(200).json({intResult: 1, msg: 'cant find team', data: ''});
        }

        // calculate totalUsedConferenceTime
        var totalUsedConferenceTime = 0;
        const option = {conferenceRoomId: existParticipant.conferenceRoomId, userType: 'user' };
        const listParticipants = await Participants.find(option).exec();

        for(const memberParticipant of listParticipants) {
            totalUsedConferenceTime += memberParticipant.timeInMeeting;
        }

        // change teams totalUsedConferenceTime
        team.totalUsedConferenceTime = totalUsedConferenceTime;
        await team.save();
        return res.status(200).json({intResult: 0, msg: 'time in meeting of participant and total used conference time of team was changed', data: existParticipant});
    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}