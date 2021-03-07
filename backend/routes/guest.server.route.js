module.exports = (app) => {
    const e = require('../controllers/guest.server.controller');
    const auth = require('../middlewares/auth');

    app.route('/api/v1/guest/createGuest').post(auth, e.createGuest);
    app.route('/api/v1/guest/updateGuest').post(auth, e.updateGuest);
    app.route('/api/v1/guest/deleteGuest').delete(auth, e.deleteGuest);
    app.route('/api/v1/guest/getGuests').get(auth, e.getGuests);
};