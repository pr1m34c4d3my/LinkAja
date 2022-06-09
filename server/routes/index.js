// const serverAPI = require('../api');

const Landing = require('./Landing');
const Auth = require('./Auth');
const Dashboard = require('./Dashboard');
const Mission = require('./Mission');
const News = require('./News');
const Notification = require('./Notification');
const Game = require('./Game');
const Forum = require('./Forum');
const Group = require('./Group');
const Profile = require('./Profile');
const Medal = require('./Medal');
const Points = require('./Points');
const Hadiah = require('./Hadiah');
const Support = require('./Support');

const init = (server, app) => {
    const handle = app.getRequestHandler();

    Landing(server, app);
    Auth(server, app);
    Dashboard(server, app);
    Mission(server, app);
    Notification(server, app);
    Game(server, app);
    Forum(server, app);
    Group(server, app);
    Profile(server, app);
    News(server, app);
    Medal(server, app);
    Points(server, app);
    Hadiah(server, app);
    Support(server, app);

    server.get('*', (req, res) => {
        // serverAPI.interceptors(req, res);
        return handle(req, res);
    });
}

module.exports = {
    init: init
};