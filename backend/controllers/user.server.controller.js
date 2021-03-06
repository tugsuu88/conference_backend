const Users = require('../models/UserModel');
const TeamMembers = require('../models/TeamMembersModel');
const Teams = require('../models/TeamModel');

exports.createUser = async function (req, res) {
    try {
        const { firstName, lastName } = req.body;
        console.log('firstName', firstName);
        const existUser = await Users.findOne({ lastName: lastName, firstName: firstName }).exec();
        if(existUser) {
            console.log(existUser);
            return res.status(200).json({intResult: 1, msg: 'user already registered', data: existUser});
        }

        const newUser = new Users({firstName, lastName});
        await newUser.save();
        res.json({intResult: 0, msg: 'successfully created', data: newUser});

    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
};

exports.updateUser = async function (req, res) {
    try {
        const { id,firstName, lastName } = req.body;
        console.log('firstName', firstName);
        const existUser = await Users.findOne({ _id: id }).exec();
        if(existUser) {
            existUser.firstName = firstName;
            existUser.lastName = lastName;

            await existUser.save();
            
            return res.status(200).json({intResult: 0, msg: 'successfully updated', data: existUser});
        }

        res.json({intResult: 1, msg: 'cant find user', data: {}});

    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
};

exports.deleteUser = async function (req, res) {
    try {
        const { id } = req.body;
        const existUser = await Users.findOne({ _id: id }).exec();
        if(existUser) {

            await existUser.deleteOne();
            
            return res.status(200).json({intResult: 0, msg: 'successfully deleted', data: existUser});
        }

        res.json({intResult: 1, msg: 'cant find user', data: {}});

    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
};

exports.getUsers = async function (req, res) {
    try {
        const users = await Users.find({}).exec();

        res.json({intResult: 0, msg: '', data: users});
    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
};

exports.getTeamsOfUser = async function(req, res) {
    try {
        const userId = req.query.userId;
        var retList = [];
        if(!userId) {
            return res.status(200).json({intResult: 1, msg: 'user id must be entered', data: ''});
        }
        const teamMembers = await TeamMembers.find({userId: userId}).exec();

        for(const member of teamMembers) {
            const team = await Teams.findOne({ _id: member.teamId });
            retList.push(team);
        }

        res.json({intResult: 0, msg: '', data: retList});
    }
    catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
}