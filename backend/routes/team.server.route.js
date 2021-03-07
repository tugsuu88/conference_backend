module.exports = (app) => {
    const e = require('../controllers/team.server.controller');
    const auth = require('../middlewares/auth');

    app.route('/api/v1/team/createTeam').post(auth, e.createTeam);
    app.route('/api/v1/team/updateTeam').post(auth, e.updateTeam);
    app.route('/api/v1/team/addTeamMember').post(auth, e.addMember);
    app.route('/api/v1/team/addBulkMembers').post(auth, e.addBulkMembers);
    app.route('/api/v1/team/removeMember').post(auth, e.removeMember);
    app.route('/api/v1/team/removeBulkMember').post(auth, e.removeBulkMember);
    app.route('/api/v1/team/getTeams').get(auth, e.getTeams);
    app.route('/api/v1/team/getUsersOfTeam').get(auth, e.getUsersOfTeam);
};