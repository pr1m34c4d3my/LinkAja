const axios = require('axios');
const config = require('../config');
const helperAPI = require('../api');
const retCode = require('../retCode');
const { reqTime } = require('../retTime');
const { v4: uuidv4 } = require('uuid');

module.exports = function (server, app, session) {

    var jid = uuidv4();

    server.get('/permainan', (req, res) => {
        const isDesktop = req.useragent.isDesktop;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (isDesktop) return app.render(req, res, '/permainan');
            else return app.render(req, res, '/mobiles/permainan');
        } else {
            res.redirect('/auth');
        }
    });

    server.get('/permainan/bisa-buka', (req, res) => {
        const isDesktop = req.useragent.isDesktop;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            axios.get(config.apiHost + '/v1/bisa-buka',
                {
                    responseType: 'json',
                    crossdomain: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${req.session.accessToken}`,
                        'jid': jid,
                    }
                })
                .then((response) => {
                    console.log('gameBisaBuka.response: ' + JSON.stringify(response.data.data));
                    req.body = response.data.data;

                    if (isDesktop) return app.render(req, res, '/permainan/bisa-buka');
                    else return app.render(req, res, '/mobiles/permainan/bisa-buka');
                })
                .catch(error => {
                    console.log('gameBisaBuka.error: ' + JSON.stringify(error));
                    if (isDesktop) return app.render(req, res, '/permainan/bisa-buka');
                    else return app.render(req, res, '/mobiles/permainan/bisa-buka');
                });
        } else {
            res.redirect('/auth');
        }
    });

    server.post('/permainan/bisa-buka', (req, res) => {
        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.get(config.apiHost + '/v1/bisa-buka',
                {
                    responseType: 'json',
                    crossdomain: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${req.session.accessToken}`,
                        'jid': jid,
                    }
                })
                .then((response) => {
                    // console.log('gameBisaBuka.response: ' + JSON.stringify(response.data.data));
                    if (response.status === 200) {
                        const resData = response.data.data;

                        const _error = 0;
                        const payload = resData;

                        res.status(200).json(retCode.ret200(req, res, { _error, payload }));
                    } else {
                        res.status(response.status).json(retCode.ret401(req, res, { _error: 1, message: response.data.message }));
                    }
                })
                .catch(error => {
                    // console.log('gameBisaBuka.error: ' + JSON.stringify(error));
                    const errorResponse = (typeof error.response === 'undefined' || error.response === '') ? null : error.response;
                    if (errorResponse !== null) {
                        // console.log('api.errorResponse: ' + JSON.stringify(errorResponse));
                        const errorLogout = (error.response.logout == undefined || error.response.logout == null || error.response.logout == '') ? false : error.response.logout;
                        const errorStatus = error.response.data.status;
                        const errorData = error.response.data.data;
                        const errorMessage = error.response.data.msg;

                        if (errorStatus == 401) {
                            if (!errorLogout) {
                                helperAPI.checkRefreshToken(req, res, error.config);
                            } else {
                                console.log('api.logout: ' + JSON.stringify(errorLogout));
                                delete req.session.accessToken;
                                delete req.session.refreshToken;

                                req.session.destroy;

                                res.redirect('/auth');
                            }
                        } else {
                            res.status(error.response.status).json(retCode.ret422(req, res, { _error: true, status: errorStatus, data: errorData, message: errorMessage }));
                        }
                    } else {
                        res.status(500).json(retCode.ret500(req, res, { error }));
                    }
                });
        } else {
            res.redirect('/auth');
        }
    });

    //============================================================//
    //=================== GAMES - BISA TANGKEP ===================//
    //============================================================//
    server.get('/permainan/bisa-tangkep', reqTime, (req, res) => {
        const isDesktop = req.useragent.isDesktop;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (isDesktop) return app.render(req, res, '/permainan/bisa-tangkep');
            else return app.render(req, res, '/mobiles/permainan/bisa-tangkep');
        } else {
            res.redirect('/auth');
        }
    });

    server.post('/permainan/bisa-tangkep', reqTime, (req, res) => {
        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.get(config.apiHost + '/v1/bisa-tangkap',
                {
                    responseType: 'json',
                    crossdomain: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${req.session.accessToken}`,
                        'jid': jid,
                    }
                })
                .then((response) => {
                    // console.log('gameBisaTangkep.response: ' + JSON.stringify(response.data.data));
                    if (response.status === 200) {
                        const resData = response.data.data;

                        const _error = 0;
                        const payload = resData;

                        res.status(200).json(retCode.ret200(req, res, { _error, payload }));
                    } else {
                        res.status(response.status).json(retCode.ret401(req, res, { _error: 1, message: response.data.message }));
                    }
                })
                .catch(error => {
                    // console.log('gameBisaTangkep.error: ' + JSON.stringify(error));
                    const errorResponse = (typeof error.response === 'undefined' || error.response === '') ? null : error.response;
                    if (errorResponse !== null) {
                        // console.log('api.errorResponse: ' + JSON.stringify(errorResponse));
                        const errorLogout = (error.response.logout == undefined || error.response.logout == null || error.response.logout == '') ? false : error.response.logout;
                        const errorStatus = error.response.data.status;
                        const errorData = error.response.data.data;
                        const errorMessage = error.response.data.msg;

                        if (errorStatus == 401) {
                            if (!errorLogout) {
                                helperAPI.checkRefreshToken(req, res, error.config);
                            } else {
                                console.log('api.logout: ' + JSON.stringify(errorLogout));
                                delete req.session.accessToken;
                                delete req.session.refreshToken;

                                req.session.destroy;

                                res.redirect('/auth');
                            }
                        } else {
                            res.status(error.response.status).json(retCode.ret422(req, res, { _error: true, status: errorStatus, data: errorData, message: errorMessage }));
                        }
                    } else {
                        res.status(500).json(retCode.ret500(req, res, { error }));
                    }
                });
        } else {
            res.redirect('/auth');
        }
    });

    //==========================================================//
    //=================== GAMES - BISA JAWAB ===================//
    //==========================================================//
    server.get('/permainan/bisa-jawab', reqTime, (req, res) => {
        const isDesktop = req.useragent.isDesktop;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.get(config.apiHost + '/v1/bisa-jawab',
                {
                    responseType: 'json',
                    crossdomain: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${req.session.accessToken}`,
                        'jid': jid,
                    }
                })
                .then((response) => {
                    // console.log('gameBisaJawab.response: ' + JSON.stringify(response.data.data));
                    req.body = response.data.data;

                    if (isDesktop) return app.render(req, res, '/permainan/bisa-jawab');
                    else return app.render(req, res, '/mobiles/permainan/bisa-jawab');
                })
                .catch(error => {
                    // console.log('gameBisaJawab.error: ' + JSON.stringify(error));
                    if (isDesktop) return app.render(req, res, '/permainan/bisa-jawab');
                    else return app.render(req, res, '/mobiles/permainan/bisa-jawab');
                });
        } else {
            res.redirect('/auth');
        }
    });

    server.post('/permainan/bisa-jawab', reqTime, (req, res) => {
        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.get(config.apiHost + '/v1/bisa-jawab',
                {
                    responseType: 'json',
                    crossdomain: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${req.session.accessToken}`,
                        'jid': jid,
                    }
                })
                .then((response) => {
                    // console.log('gameBisaJawab.response: ' + JSON.stringify(response.data.data));
                    if (response.status === 200) {
                        const resData = response.data.data;

                        const _error = 0;
                        const payload = resData;

                        res.status(200).json(retCode.ret200(req, res, { _error, payload }));
                    } else {
                        res.status(response.status).json(retCode.ret401(req, res, { _error: 1, message: response.data.message }));
                    }
                })
                .catch(error => {
                    // console.log('gameBisaJawab.error: ' + JSON.stringify(error));
                    const errorResponse = (typeof error.response === 'undefined' || error.response === '') ? null : error.response;
                    if (errorResponse !== null) {
                        // console.log('api.errorResponse: ' + JSON.stringify(errorResponse));
                        const errorLogout = (error.response.logout == undefined || error.response.logout == null || error.response.logout == '') ? false : error.response.logout;
                        const errorStatus = error.response.data.status;
                        const errorData = error.response.data.data;
                        const errorMessage = error.response.data.msg;

                        if (errorStatus == 401) {
                            if (!errorLogout) {
                                helperAPI.checkRefreshToken(req, res, error.config);
                            } else {
                                console.log('api.logout: ' + JSON.stringify(errorLogout));
                                delete req.session.accessToken;
                                delete req.session.refreshToken;

                                req.session.destroy;

                                res.redirect('/auth');
                            }
                        } else {
                            res.status(error.response.status).json(retCode.ret422(req, res, { _error: true, status: errorStatus, data: errorData, message: errorMessage }));
                        }
                    } else {
                        res.status(500).json(retCode.ret500(req, res, { error }));
                    }
                });
        } else {
            res.redirect('/auth');
        }
    });

}