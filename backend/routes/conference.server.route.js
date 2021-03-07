module.exports = (app) => {
    const e = require('../controllers/conference.server.controller');
    const auth = require('../middlewares/auth');

    app.route('/api/v1/room/createConferenceRoom').post(auth, e.createConferenceRoom);
    app.route('/api/v1/room/updateConferenceRoom').post(auth, e.updateConferenceRoom);

    app.route('/api/v1/room/addRequiredParticipants').post(auth, e.addRequiredParticipants);
    app.route('/api/v1/room/addBulkRequiredParticipants').post(auth, e.addBulkRequiredParticipants);
    app.route('/api/v1/room/addOptionalParticipants').post(auth, e.addOptionalParticipants);
    app.route('/api/v1/room/addBulkOptionalParticipants').post(auth, e.addBulkOptionalParticipants);
    app.route('/api/v1/room/addGuestParticipants').post(auth, e.addGuestParticipants);
    app.route('/api/v1/room/addBulkGuestParticipants').post(auth, e.addBulkGuestParticipants);
    app.route('/api/v1/room/changeParticipantTimeInMeeting').post(auth, e.changeParticipantTimeInMeeting);

    app.route('/api/v1/room/getParticipants').get(auth, e.getParticipants);
    app.route('/api/v1/room/getRequiredParticipants').get(auth, e.getRequiredParticipants);
    app.route('/api/v1/room/getOptionalParticipants').get(auth, e.getOptionalParticipants);
    app.route('/api/v1/room/getGuestParticipants').get(auth, e.getGuestParticipants);
    app.route('/api/v1/room/getUserParticipants').get(auth, e.getUserParticipants);
};