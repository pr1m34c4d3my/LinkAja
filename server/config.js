const _             = require('lodash');
const env           = (process.env.NODE_ENV) || 'development';
const envConfig     = require('./env/' + env);
let defaultConfig   = {
    env: env
};

module.exports = _.merge(defaultConfig, envConfig);