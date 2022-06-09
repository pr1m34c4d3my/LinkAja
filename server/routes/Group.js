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
    server.get('/group', (req, res) => {
        const isDesktop = req.useragent.isDesktop;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (isDesktop) return app.render(req, res, '/group');
            else return app.render(req, res, '/mobiles/group');
        } else {
            res.redirect('/auth');
        }
    });

    server.get('/group/:id', (req, res) => {
        const isDesktop = req.useragent.isDesktop;
        const apiParams = req.params;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (isDesktop) return app.render(req, res, '/group/category/' + apiParams.id);
            else return app.render(req, res, '/mobiles/group/category/' + apiParams.id);
        } else {
            res.redirect('/auth');
        }
    });

    server.get('/group/post/:id', (req, res) => {
        const isDesktop = req.useragent.isDesktop;
        const apiParams = req.params;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (isDesktop) return app.render(req, res, '/group/post/' + apiParams.id);
            else return app.render(req, res, '/mobiles/group/post/' + apiParams.id);
        } else {
            res.redirect('/auth');
        }
    });

    //==================================================================//
    //=================== [POST] - API DOCUMENTATION ===================//
    //==================================================================//
    server.post('/group', reqTime, (req, res) => {
        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.get(config.apiHost + '/v1/group',
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
                    // console.log('groups.response: ' + JSON.stringify(response.data.data));
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
                    // console.log('groups.error: ' + JSON.stringify(error));
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

    server.post('/group/:id', reqTime, (req, res) => {
        const apiParams = req.params;
        const apiQueries = req.query;
        const apiQueryPage = (typeof apiQueries.page == 'undefined') ? 1 : apiQueries.page;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.get(`${config.apiHost}/v1/group/${apiParams.id}/?page=${apiQueryPage}`,
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
                    // console.log('groupCategory.response: ' + JSON.stringify(response.data.data));
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
                    // console.log('groupCategory.error: ' + JSON.stringify(error));
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

    server.post('/group/post/:id', reqTime, (req, res) => {
        const apiParams = req.params;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.get(config.apiHost + '/v1/group/post/' + apiParams.id,
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

                        res.status(200).json(retCode.ret200(req, res, { _error, payload }));
                    } else {
                        res.status(response.status).json(retCode.ret401(req, res, { _error: 1, message: response.data.message }));
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
                            res.status(error.response.status).json(retCode.ret422(req, res, { _error: true, status: errorStatus, data: errorData, message: errorMessage }));
                        }
                    } else {
                        res.status(500).json(retCode.ret500(req, res, { error }));
                    }
                });
        }
    });

    server.post('/group/post/:id/like', reqTime, (req, res) => {
        const apiParams = req.params;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.post(`${config.apiHost}/v1/group/post/${apiParams.id}/like`,
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
                    // console.log('groupPostLike.response: ' + JSON.stringify(response.data.data));
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
                    // console.log('groupPostLike.error: ' + JSON.stringify(error));
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

    server.post('/group/post/:id/comment', reqTime, (req, res) => {
        const apiParams = req.params;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.post(`${config.apiHost}/v1/group/post/${apiParams.id}/comment`,
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
                    // console.log('groupPostReply.response: ' + JSON.stringify(response.data.data));
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
                    // console.log('groupPostReply.error: ' + JSON.stringify(error));
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

    server.post('/group/post/:id/share', reqTime, (req, res) => {
        const apiParams = req.params;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            axios.get(`${config.apiHost}/v1/group/post/${apiParams.id}/share`,
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

                        res.status(200).json(retCode.ret200(req, res, { _error, payload }));
                    } else {
                        res.status(response.status).json(retCode.ret401(req, res, { _error: 1, message: response.data.message }));
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
                            res.status(error.response.status).json(retCode.ret422(req, res, { _error: true, status: errorStatus, data: errorData, message: errorMessage }));
                        }
                    } else {
                        res.status(500).json(retCode.ret500(req, res, { error }));
                    }
                });
        }
    });

}
