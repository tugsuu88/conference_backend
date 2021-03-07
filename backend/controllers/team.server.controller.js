const Guests = require('../models/GuestModel');
const Users = require('../models/UserModel');
const Teams = require('../models/TeamModel');
const TeamMembers = require('../models/TeamMembersModel');

exports.createTeam = async function (req, res) {
    try {
        const { name, ownerId } = req.body;

        // server validation
        if(!name) {
            return res.status(200).json({intResult: 1, msg: 'team name must be entered', data : ''});
        }
        if(!ownerId) {
            return res.status(200).json({intResult: 1, msg: 'team owner must be entered', data : ''});
        }

        const ownerUser = await Users.findOne({_id: ownerId});
        if(!ownerUser) {
            return res.status(200).json({intResult: 1, msg: 'create user not exists', data : ''});
        }

        // save new team
        const newTeam = new Teams({name: name, ownerId: ownerId});
        await newTeam.save();
        return res.status(200).json({intResult: 0, msg: 'successfully created', data : newTeam});

    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
};

exports.updateTeam = async function(req, res) {
    try {
        const { id, name } = req.body;
        if(!id) {
            return res.status(200).json({intResult: 1, msg: 'team id must be entered', data : ''});
        }

        const existTeam = await Teams.findOne({_id: id});
        if(!existTeam) {
            return res.status(200).json({intResult: 1, msg: 'cant find team', data : ''});
        }

        existTeam.name = name;
        await existTeam.save();

        return res.status(200).json({intResult: 0, msg: 'successfully updated', data : existTeam});

    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}

exports.addMember = async function(req, res) {
    try {
        const { teamId, userId } = req.body;
        // validation
        if(!teamId) {
            return res.status(200).json({intResult: 1, msg: 'team id must be entered', data : ''});
        }
        if(!userId) {
            return res.status(200).json({intResult: 1, msg: 'team user id must be entered', data : ''});
        }

        const team = await Teams.findOne({_id: teamId});
        const user = await Users.findOne({_id: userId});
        const existTeamMember = await TeamMembers.findOne({teamId: teamId, userId: userId});
        if(!team) {
            return res.status(200).json({intResult: 1, msg: 'cant find team', data : ''});
        }
        if(!user) {
            return res.status(200).json({intResult: 1, msg: 'cant find user', data : ''});
        }
        if(existTeamMember) {
            return res.status(200).json({intResult: 1, msg: 'user already exists in team', data : existTeamMember});
        }

        // TeamMembers add
        const newTeamMember = new TeamMembers({teamId: teamId, userId: userId});
        await newTeamMember.save();
        return res.status(200).json({intResult: 0, msg: 'user successfully added', data : newTeamMember});
    }
    catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}

exports.addBulkMembers = async function(req, res) {
    try {
        const { teamId, listUserId } = req.body;
        var retList = [];
        var successCount = 0;
        var errorCount = 0;

        // validation
        if(!teamId) {
            return res.status(200).json({intResult: 1, msg: 'team id must be entered', data : ''});
        }
        if(!listUserId || listUserId.length <= 0) {
            return res.status(200).json({intResult: 1, msg: 'list user ids must be entered', data : ''});
        }

        const team = await Teams.findOne({_id: teamId});
        if(!team) {
            return res.status(200).json({intResult: 1, msg: 'cant find team', data : ''});
        }

        for(const member of listUserId) {
            const user = await Users.findOne({_id: member.userId});
            const existTeamMember = await TeamMembers.findOne({teamId: teamId, userId: member.userId});
            console.log('member.userId', member.userId);
            if(!user) {
                retList.push({intResult: 1, msg: '[' + member.userId + ']'+' cant find user', data : ''});
                errorCount++;
                continue;
            }
            if(existTeamMember) {
                retList.push({intResult: 1, msg: '[' + member.userId + ', '+teamId+' ]'+' user already exists in team', data : ''});
                errorCount++;
                continue;
            }

            const newTeamMember = new TeamMembers({teamId: teamId, userId: member.userId});
            await newTeamMember.save();
            retList.push({intResult: 0, msg: 'user successfully added', data : newTeamMember});
            successCount++;
        }

        return res.status(200).json({intResult: 0, msg: 'successfully added success: ['+successCount+'], ['+errorCount+']', data : retList});
    }
    catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }   
}

exports.removeMember = async function(req, res) {
    try {
        const { teamMemberId } = req.body;
        // validation
        if(!teamMemberId) {
            return res.status(200).json({intResult: 1, msg: 'team member id must be entered', data : ''});
        }

        const existTeamMember = await TeamMembers.findOne({_id: teamMemberId});
        if(!existTeamMember) {
            return res.status(200).json({intResult: 1, msg: 'cant find team member', data : ''});
        }

        await existTeamMember.remove();
        return res.status(200).json({intResult: 0, msg: 'successfully deleted', data : existTeamMember});
    }
    catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}

exports.removeBulkMember = async function(req, res) {
    try {
        const { listTeamMembersId } = req.body;
        var retList = [];
        var successCount = 0;
        var errorCount = 0;
        for(const member of listTeamMembersId) {
            // validation
            if(!member.teamMemberId) {
                errorCount++;
                retList.push({intResult: 1, msg: '[' + member.teamMemberId + '] team member id must be entered', data : ''});
            }
            console.log('member.teamMemberId', member.teamMemberId);

            const existTeamMember = await TeamMembers.findOne({_id: member.teamMemberId});
            if(!existTeamMember) {
                errorCount++;
                retList.push({intResult: 1, msg: 'cant find team member', data : ''});
            }

            await existTeamMember.remove();
            successCount++;
            retList.push({intResult: 0, msg: 'successfully deleted', data : ''});
            
        }
        return res.status(200).json({intResult: 0, msg: 'successfully added success: ['+successCount+'], ['+errorCount+']', data : retList});
    }
    catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}

exports.getTeams = async function(req, res) {
    try {
        const teams = await Teams.find({}).exec();
        res.status(200).json({intResult: 0, msg: '', data : teams});
    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}

exports.getUsersOfTeam = async function(req, res) {
    try {
        const teamId = req.query.teamId;
        const retList =[];
        if(!teamId)  {
            return res.status(200).json({intResult: 1, msg: 'team id must be entered', data : ''});
        }

        const teamMembers = await TeamMembers.find({teamId: teamId});
        for(const member of teamMembers) {
            const user = await Users.findOne({_id: member.userId});
            retList.push(user);
        }
        res.status(200).json({intResult: 0, msg: '', data : retList});
    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}