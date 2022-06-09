const axios = require('axios');
const config = require('../config');
const helperAPI = require('../api');
const retCode = require('../retCode');
const { reqTime } = require('../retTime');
const { v4: uuidv4 } = require('uuid');
const FormData = require('form-data');
const fs = require('fs');
const multer = require('multer')
const upload = multer();

module.exports = function (server, app, session) {

    var jid = uuidv4();

    server.get('/missions', (req, res) => {
        const isDesktop = req.useragent.isDesktop;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (isDesktop) return app.render(req, res, '/mission');
            else return app.render(req, res, '/mobiles/mission');
        } else {
            res.redirect('/auth');
        }
    });

    server.get('/missions/transaksi-harian-sk', (req, res) => {
        const isDesktop = req.useragent.isDesktop;
        const urlQuery = req.query;

        const queryConditionId = (typeof urlQuery.id === 'undefined' || urlQuery.id === '') ? null : urlQuery.id;
        const queryIsFollow = (typeof urlQuery.is_follow === 'undefined' || urlQuery.is_follow === '') ? null : urlQuery.is_follow;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (queryConditionId !== null && queryIsFollow !== null) {
                if (queryIsFollow === 'false') {
                    if (isDesktop) return app.render(req, res, '/mission');
                    else return app.render(req, res, `/mobiles/mission/sk-daily-transaction`);
                } else {
                    res.redirect(`/missions/upload-transaksi?id=${queryConditionId}&is_follow=${queryIsFollow}`);
                }
            } else {
                res.redirect('/missions');
            }
        } else {
            res.redirect('/auth');
        }
    });

    server.get('/missions/syariah-transaksi-harian-sk', (req, res) => {
        const isDesktop = req.useragent.isDesktop;
        const urlQuery = req.query;

        const queryConditionId = (typeof urlQuery.id === 'undefined' || urlQuery.id === '') ? null : urlQuery.id;
        const queryIsFollow = (typeof urlQuery.is_follow === 'undefined' || urlQuery.is_follow === '') ? null : urlQuery.is_follow;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (queryConditionId !== null && queryIsFollow !== null) {
                if (queryIsFollow === 'false') {
                    if (isDesktop) return app.render(req, res, '/mission');
                    else return app.render(req, res, `/mobiles/mission/sk-daily-transaction-syariah`);
                } else {
                    res.redirect(`/missions/upload-transaksi?id=${queryConditionId}&is_follow=${queryIsFollow}`);
                }
            } else {
                res.redirect('/missions');
            }
        } else {
            res.redirect('/auth');
        }
    });

    server.get('/missions/transaksi-special-sk', (req, res) => {
        const isDesktop = req.useragent.isDesktop;
        const urlQuery = req.query;

        const queryConditionId = (typeof urlQuery.id === 'undefined' || urlQuery.id === '') ? null : urlQuery.id;
        const queryIsFollow = (typeof urlQuery.is_follow === 'undefined' || urlQuery.is_follow === '') ? null : urlQuery.is_follow;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (queryConditionId !== null && queryIsFollow !== null) {
                if (queryIsFollow === 'false') {
                    if (isDesktop) return app.render(req, res, '/mission');
                    else return app.render(req, res, `/mobiles/mission/sk-special-transaction`);
                } else {
                    res.redirect(`/missions/upload-transaksi?id=${queryConditionId}&is_follow=${queryIsFollow}`);
                }
            } else {
                res.redirect('/missions');
            }
        } else {
            res.redirect('/auth');
        }
    });

    server.get('/missions/syariah-transaksi-special-sk', (req, res) => {
        const isDesktop = req.useragent.isDesktop;
        const urlQuery = req.query;

        const queryConditionId = (typeof urlQuery.id === 'undefined' || urlQuery.id === '') ? null : urlQuery.id;
        const queryIsFollow = (typeof urlQuery.is_follow === 'undefined' || urlQuery.is_follow === '') ? null : urlQuery.is_follow;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (queryConditionId !== null && queryIsFollow !== null) {
                if (queryIsFollow === 'false') {
                    if (isDesktop) return app.render(req, res, '/mission');
                    else return app.render(req, res, `/mobiles/mission/sk-special-transaction-syariah`);
                } else {
                    res.redirect(`/missions/upload-transaksi?id=${queryConditionId}&is_follow=${queryIsFollow}`);
                }
            } else {
                res.redirect('/missions');
            }
        } else {
            res.redirect('/auth');
        }
    });

    server.get('/missions/upload-transaksi', (req, res) => {
        const isDesktop = req.useragent.isDesktop;
        const urlQuery = req.query;

        const queryConditionId = (typeof urlQuery.id === 'undefined' || urlQuery.id === '') ? null : urlQuery.id;
        const queryIsFollow = (typeof urlQuery.is_follow === 'undefined' || urlQuery.is_follow === '') ? null : urlQuery.is_follow;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (queryConditionId !== null && queryIsFollow !== null) {
                if (queryIsFollow) {
                    if (isDesktop) return app.render(req, res, '/mission');
                    else return app.render(req, res, '/mobiles/mission/upload-transaction');
                } else {
                    res.redirect('/missions');
                }
            } else {
                res.redirect('/missions');
            }
        } else {
            res.redirect('/auth');
        }
    });

    server.get('/missions/finish', (req, res) => {
        const isDesktop = req.useragent.isDesktop;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (isDesktop) return app.render(req, res, '/mission/finish');
            else return app.render(req, res, '/mobiles/mission/finish');
        } else {
            res.redirect('/auth');
        }
    });

    server.get('/missions/upload', (req, res) => {
        const isDesktop = req.useragent.isDesktop;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (isDesktop) return app.render(req, res, '/misi-harian/upload');
            else return app.render(req, res, '/mobiles/misi-harian/upload');
        } else {
            res.redirect('/auth');
        }
    });

    server.get('/missions/term-condition', (req, res) => {
        const isDesktop = req.useragent.isDesktop;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            if (isDesktop) return app.render(req, res, '/misi-harian/term-condition');
            else return app.render(req, res, '/mobiles/misi-harian/term-condition');
        } else {
            res.redirect('/auth');
        }
    });

    //==================================================================//
    //=================== [POST] - API DOCUMENTATION ===================//
    //==================================================================//
    server.post('/missions/my-missions', reqTime, (req, res) => {
        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.get(config.apiHost + '/v1/home/my-mission',
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
                    // console.log('dashboardMyMissions.response: ' + JSON.stringify(response.data.data));
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
                    // console.log('dashboardMyMissions.error: ' + JSON.stringify(error));
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

    server.post('/challenge/:id/join', reqTime, (req, res) => {
        const apiParams = req.params;
        const paramChallangeId = apiParams.id;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.post(`${config.apiHost}/v1/challenge/${paramChallangeId}/join`,
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
                    // console.log('dashboardMyMissions.response: ' + JSON.stringify(response.data.data));
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
                    // console.log('dashboardMyMissions.error: ' + JSON.stringify(error));
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

    server.post('/missions/my-alphabet', reqTime, (req, res) => {
        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.get(config.apiHost + '/v1/alphabet/my-alphabet',
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
                    // console.log('dashboardMyMissions.response: ' + JSON.stringify(response.data.data));
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
                    // console.log('dashboardMyMissions.error: ' + JSON.stringify(error));
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

    server.post('/missions/:id/upload-bukti', reqTime, upload.single('file'), (req, res) => {
        const apiParams = req.params;

        const bodyFormData = new FormData();
        bodyFormData.append('file', req.file.buffer, req.file.originalname);

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.post(`${config.apiHost}/v1/challenge/${apiParams.id}/upload-bukti`,
                bodyFormData,
                {
                    responseType: 'json',
                    crossdomain: true,
                    headers: {
                        ...bodyFormData.getHeaders(),
                        'Authorization': `Bearer ${req.session.accessToken}`,
                    }
                })
                .then((response) => {
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

    server.post('/missions/:id/submit-bukti', reqTime, (req, res) => {
        const apiParams = req.params;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken !== null) {
            // helperAPI.interceptors(req, res);

            axios.post(`${config.apiHost}/v1/challenge/${apiParams.id}/submit-bukti`,
                req.body,
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
