const Users = require('../models/UserModel');

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