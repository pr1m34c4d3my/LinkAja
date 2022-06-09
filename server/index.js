const express = require('express');
const useragent = require('express-useragent');
const redis = require('redis');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const bcrypt = require('bcryptjs');
const compression = require('compression');
const next = require('next');
const { initLog } = require('../log');

require('dotenv').config();

const dev = (process.env.NODE_ENV !== 'production');
const app = next({ dev });

module.exports = function () {
    let server = express(),
        create,
        start;

    create = (config) => {
        let RedisStore = require('connect-redis')(session);

        const redisHost = process.env.REDIS_HOST;
        const redisPort = process.env.REDIS_PORT;
        const redisUser = process.env.REDIS_USER;
        const redisPassword = process.env.REDIS_PASSWORD;

        let redisClient = null;

        if ((typeof redisUser !== 'undefined' && redisUser != null && redisUser != '') && (typeof redisPassword !== 'undefined' && redisPassword != null && redisPassword != '')) {
            console.log(`redis.auth`);
            redisClient = redis.createClient(`redis://${redisUser}:${redisPassword}@${redisHost}:${redisPort}`);
        } else {
            console.log(`redis.noauth`);
            redisClient = redis.createClient({
                host: redisHost,
                port: redisPort,
                no_ready_check: true,
                auth_pass: ''
            });
        }

        let routes = require('./routes');

        // set all the server things
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);
        server.set('trustproxy', true);

        // add Cors
        if (process.env.NODE_ENV != 'production') {
            server.use(function (req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });
        }

        // server.use(compression({ threshold: 0 }));
        server.use(useragent.express());
        server.use(bodyParser.json()); // add middleware to parse the json
        server.use(bodyParser.urlencoded({ extended: true }));

        server.use(session({
            genid: (req) => {
                return uuidv4();
            },
            store: new RedisStore({ client: redisClient }),
            name: '__ssn',
            secret: bcrypt.genSaltSync(10),
            proxy: true,
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: ((600000 * 24) * 364),
                secure: (process.env.NODE_ENV == 'production') ? true : false,
            }
        }));

        server.use(cookieParser()); // cookie parser middleware
        server.use('/static', express.static('public')); // Set up static

        // Set up routes
        app.prepare().then(() => {
            routes.init(server, app);
        }).catch((ex) => {
            console.error(ex.stack);
            process.exit(1);
        });
    };

    start = async () => {
        let hostname = server.get('hostname'),
            port = server.get('port');

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on ${hostname}:${port}`);
        })
    };

    // start log
    initLog()

    return {
        create: create,
        start: start
    };
}
