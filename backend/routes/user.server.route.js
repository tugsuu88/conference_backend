module.exports = (app) => {
    const e = require('../controllers/user.server.controller');
    const auth = require('../middlewares/auth');

    app.route('/api/v1/user/createUser').post(auth, e.createUser);
    app.route('/api/v1/user/updateUser').post(auth, e.updateUser);
    app.route('/api/v1/user/deleteUser').delete(auth, e.deleteUser);
    app.route('/api/v1/user/getUsers').get(auth, e.getUsers);
};