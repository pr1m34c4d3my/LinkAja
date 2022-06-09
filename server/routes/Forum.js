const axios = require('axios');
const config = require('../config');
const helperAPI = require('../api');
const retCode = require('../retCode');
const { reqTime } = require('../retTime');
const { v4: uuidv4 } = require('uuid');

module.exports = function (server, app) {

    var jid = uuidv4();

    //=================================================================//
    //=================== [GET] - API DOCUMENTATION ===================//
    //=================================================================//
    server.get('/forum', (req, res) => {
        const isDesktop = req.useragent.isDesktop;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (isDesktop) return app.render(req, res, '/forum');
            else return app.render(req, res, '/mobiles/forum');
        } else {
            res.redirect('/auth');
        }
    });

    server.get('/forum/:id', (req, res) => {
        const isDesktop = req.useragent.isDesktop;
        const apiParams = req.params;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (isDesktop) return app.render(req, res, '/forum/category/' + apiParams.id);
            else return app.render(req, res, '/mobiles/forum/category/' + apiParams.id);
        } else {
            res.redirect('/auth');
        }
    });

    server.get('/forum/thread/:id', (req, res) => {
        const isDesktop = req.useragent.isDesktop;
        const apiParams = req.params;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (isDesktop) return app.render(req, res, '/forum/thread/' + apiParams.id);
            else return app.render(req, res, '/mobiles/forum/thread/' + apiParams.id);
        } else {
            res.redirect('/auth');
        }
    });

    //==================================================================//
    //=================== [POST] - API DOCUMENTATION ===================//
    //==================================================================//
    server.post('/forum', reqTime, (req, res) => {
        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.get(config.apiHost + '/v1/forum',
                {
                    responseType: 'json',
                    crossdomain: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionAccessToken}`,
                        'jid': jid,
                    }
                })
                .then((response) => {
                    // console.log('forums.response: ' + JSON.stringify(response.data.data));
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
                    // console.log('forums.error: ' + JSON.stringify(error));
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
        }
    });

    server.post('/forum/:id', reqTime, (req, res) => {
        const apiParams = req.params;
        const apiQueries = req.query;
        const apiQueryPage = (typeof apiQueries.page == 'undefined') ? 1 : apiQueries.page;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.get(`${config.apiHost}/v1/forum/${apiParams.id}/?page=${apiQueryPage}`,
                {
                    responseType: 'json',
                    crossdomain: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionAccessToken}`,
                        'jid': jid,
                    }
                })
                .then((response) => {
                    // console.log('forumCategory.response: ' + JSON.stringify(response.data.data));
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
                    // console.log('forumCategory.error: ' + JSON.stringify(error));
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
        }
    });

    server.post('/forum/thread/:id', reqTime, (req, res) => {
        const apiParams = req.params;
        const apiQueries = req.query;
        const apiQueryPage = (typeof apiQueries.page === 'undefined') ? 1 : apiQueries.page;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.get(`${config.apiHost}/v1/forum/thread/${apiParams.id}/?page=${apiQueryPage}`,
                {
                    responseType: 'json',
                    crossdomain: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionAccessToken}`,
                        'jid': jid,
                    }
                })
                .then((response) => {
                    // console.log('forumThread.response: ' + JSON.stringify(response.data.data));
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
                    // console.log('forumThread.error: ' + JSON.stringify(error));
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
        }
    });

    server.post('/forum/thread/:id/reply', reqTime, (req, res) => {
        const apiParams = req.params;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.post(`${config.apiHost}/v1/forum/thread/${apiParams.id}/reply`,
                JSON.stringify(req.body),
                {
                    responseType: 'json',
                    crossdomain: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionAccessToken}`,
                        'jid': jid,
                    }
                })
                .then((response) => {
                    // console.log('commentPost.response: ' + JSON.stringify(response.data.data));
                    if (response.status === 200) {
                        const resData = response.data.data;

                        const _error = 0;
                        const payload = resData;

                        res.status(200).json(retCode.ret200(req, response, { _error, payload }));
                    } else {
                        res.status(response.status).json(retCode.ret401(req, res, { _error: 1, message: response.data.message }));
                    }
                })
                .catch(error => {
                    // console.log('commentPost.error: ' + JSON.stringify(error));
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
        }
    });

    server.post('/forum/thread/:id/share', reqTime, (req, res) => {
        const apiParams = req.params;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.get(`${config.apiHost}/v1/forum/thread/${apiParams.id}/share`,
                {
                    responseType: 'json',
                    crossdomain: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionAccessToken}`,
                        'jid': jid,
                    }
                })
                .then((response) => {
                    // console.log('groupPost.response: ' + JSON.stringify(response.data.data));
                    if (response.status === 200) {
                        const resData = response.data.data;

                        const _error = 0;
                        const payload = resData;

                        res.status(200).json({ _error, payload });
                    } else {
                        res.status(response.status).json({ _error: 1, message: response.data.message });
                    }
                })
                .catch(error => {
                    // console.log('groupPost.error: ' + JSON.stringify(error));
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
                            res.status(error.response.status).json({ _error: true, status: errorStatus, data: errorData, message: errorMessage });
                        }
                    } else {
                        res.status(500).json(error);
                    }
                });
        }

    });

}
