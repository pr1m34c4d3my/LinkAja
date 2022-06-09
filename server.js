const server = require('./server/index')();
const config = require('./server/config');

// create the basic server setup 
server.create(config);

// start the server
server.start();