const Guests = require('../models/GuestModel');

exports.createGuest = async function (req, res) {
    try {
        const { firstName, lastName } = req.body;
        console.log('firstName', firstName);
        const existGuest = await Guests.findOne({ lastName: lastName, firstName: firstName }).exec();
        if(existGuest) {
            console.log(existGuest);
            return res.status(200).json({intResult: 1, msg: 'Guest already registered', data: existGuest});
        }

        const newGuest = new Guests({firstName, lastName});
        await newGuest.save();
        res.json({intResult: 0, msg: 'successfully created', data: newGuest});

    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
};

exports.updateGuest = async function (req, res) {
    try {
        const { id,firstName, lastName } = req.body;
        console.log('firstName', firstName);
        const existGuest = await Guests.findOne({ _id: id }).exec();
        if(existGuest) {
            existGuest.firstName = firstName;
            existGuest.lastName = lastName;

            await existGuest.save();
            
            return res.status(200).json({intResult: 0, msg: 'successfully updated', data: existGuest});
        }

        res.json({intResult: 1, msg: 'cant find Guest', data: {}});

    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
};

exports.deleteGuest = async function (req, res) {
    try {
        const { id } = req.body;
        const existGuest = await Guests.findOne({ _id: id }).exec();
        if(existGuest) {

            await existGuest.deleteOne();
            
            return res.status(200).json({intResult: 0, msg: 'successfully deleted', data: existGuest});
        }

        res.json({intResult: 1, msg: 'cant find Guest', data: {}});

    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
};

exports.getGuests = async function (req, res) {
    try {
        const Guests = await Guests.find({}).exec();

        res.json({intResult: 0, msg: '', data: Guests});
    } catch(err) {
        return res.status(500).json({
            intResult: 1,
            msg: 'error on server',
            data : err
        });
    }
};