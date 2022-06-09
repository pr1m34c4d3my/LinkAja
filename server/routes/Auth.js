const axios = require('axios');
const config = require('../config');
const retCode = require('../retCode');
const { reqTime } = require('../retTime');
const { v4: uuidv4 } = require('uuid');


module.exports = function (server, app) {

    var jid = uuidv4();

    server.get('/auth', (req, res) => {
        const isDesktop = req.useragent.isDesktop;
        const urlQueries = req.query;
        const queryToken = (typeof urlQueries.linkaja_token === 'undefined' && urlQueries.linkaja_token == '') ? null : urlQueries.linkaja_token;

        const session = req.session;
        const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

        if (sessionAccessToken == null) {
            if (isDesktop) return app.render(req, res, '/auth/email-auth');
            else return app.render(req, res, '/mobiles/auth/email-auth');
        } else {
            if (queryToken != null) {
                if (isDesktop) return app.render(req, res, '/auth/email-auth');
                else return app.render(req, res, '/mobiles/auth/email-auth');
            } else {
                res.redirect('/dashboard');
            }
        }
    });

    server.get('/auth/oauth', (req, res) => {
        const isDesktop = req.useragent.isDesktop;

        if (req.session.accessToken != undefined && req.session.accessToken != null && req.session.accessToken != '') {
            res.redirect('/dashboard');
        } else {
            if (isDesktop) return app.render(req, res, '/auth/oauth');
            else return app.render(req, res, '/mobiles/auth/oauth');
        }
    });

    server.get('/auth/login-linkaja', (req, res) => {
        const urlQueries = req.query;
        const queryToken = (typeof urlQueries.token === 'undefined' && urlQueries.token == '') ? null : urlQueries.token;

        if (queryToken === null) {
            res.redirect('/auth');
        } else {
            const session = req.session;
            const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

            axios.post(config.apiHost + '/v1/auth/login/linkaja',
                {
                    token: queryToken
                },
                {
                    responseType: 'json',
                    crossdomain: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => {
                    // console.log('loginLinkAja.response: ' + JSON.stringify(response.data.data));
                    if (response.status === 200) {
                        const resData = response.data.data;

                        req.session.accessToken = resData.access_token;
                        req.session.refreshToken = resData.refresh_token;

                        res.redirect('/dashboard');
                    } else {
                        delete req.session.accessToken;
                        delete req.session.refreshToken;

                        res.redirect(`/auth?token=${queryToken}`);
                    }
                })
                .catch(error => {
                    // console.log('loginLinkAja.error: ' + JSON.stringify(error));
                    delete req.session.accessToken;
                    delete req.session.refreshToken;

                    res.redirect(`/auth?token=${queryToken}`);
                });
        }
    });

    server.get('/auth/forgot', (req, res) => {
        const isDesktop = req.useragent.isDesktop;

        if (req.session.accessToken != undefined && req.session.accessToken != null && req.session.accessToken != '') {
            res.redirect('/dashboard');
        } else {
            if (isDesktop) return app.render(req, res, '/auth/email-forgot');
            else return app.render(req, res, '/mobiles/auth/email-forgot');
        }
    });

    server.get('/auth/reset-password', (req, res) => {
        const isDesktop = req.useragent.isDesktop;

        if (req.session.accessToken != undefined && req.session.accessToken != null && req.session.accessToken != '') {
            res.redirect('/dashboard');
        } else {
            if (isDesktop) return app.render(req, res, '/auth/password-reset');
            else return app.render(req, res, '/mobiles/auth/password-reset');
        }
    });

    server.get('/auth/activation', (req, res) => {
        const isDesktop = req.useragent.isDesktop;

        if (req.session.accessToken != undefined && req.session.accessToken != null && req.session.accessToken != '') {
            res.redirect('/dashboard');
        } else {
            if (isDesktop) return app.render(req, res, '/auth/email-activate');
            else return app.render(req, res, '/mobiles/auth/email-activate');
        }
    });

    server.get('/auth/activate-email', (req, res) => {
        const isDesktop = req.useragent.isDesktop;
        const urlQueries = req.query;
        const queryToken = (typeof urlQueries.token === 'undefined' || urlQueries.token == '') ? null : urlQueries.token;

        if (queryToken !== null) {
            axios.post(`${config.apiHost}/v1/auth/activate-email`,
                {
                    token: queryToken
                })
                .then((response) => {
                    // console.log('authActivateEmail.response: ' + JSON.stringify(response.data.data));
                    if (response.status === 200) {
                        if (isDesktop) return app.render(req, res, '/auth/activate-success');
                        else return app.render(req, res, '/mobiles/auth/activate-success');
                    } else {
                        res.redirect('/auth');
                    }
                })
                .catch(error => {
                    // console.log('authActivateEmail.error: ' + JSON.stringify(error));
                    res.redirect('/auth');
                });
        } else {
            res.redirect('/auth');
        }
    });

    //==================================================================//
    //=================== [POST] - API DOCUMENTATION ===================//
    //==================================================================//
    server.post('/login', reqTime, (req, res) => {
        axios.post(config.apiHost + '/v1/auth/login',
            req.body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'jid': jid,
                }
            })
            .then((response) => {
                // console.log('login.response: ' + JSON.stringify(response.data.data));
                if (response.status === 200) {
                    const resData = response.data.data;

                    req.session.accessToken = resData.access_token;
                    req.session.refreshToken = resData.refresh_token;

                    // console.log(`session-auth: ${JSON.stringify(req.session)}`);

                    const _error = 0;
                    const message = "Selamat anda berhasil masuk";

                    res.status(200).json(retCode.ret200(req, res, { _error, message }));
                } else {
                    res.status(response.status).json(retCode.ret401(req, res, { _error: 1, message: response.data.message }));
                }
            })
            .catch(error => {
                // console.log('login.error: ' + JSON.stringify(error));
                const errorResponse = (typeof error.response === 'undefined' || error.response === '') ? null : error.response;
                if (errorResponse !== null) {
                    const errorStatus = error.response.data.status;
                    const errorData = error.response.data.data;
                    const errorMessage = error.response.data.msg;

                    res.status(error.response.status).json(retCode.ret422(res, req, { _error: true, status: errorStatus, data: errorData, message: errorMessage }));
                } else {
                    res.status(500).json(retCode.ret500(res, req, error, false));
                }
            });
    });

    server.post('/register', reqTime, (req, res) => {
        axios.post(config.apiHost + '/v1/auth/register',
            req.body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'jid': jid,
                }
            })
            .then((response) => {
                // console.log('authRegister.response: ' + JSON.stringify(response.data.data));
                if (response.status === 200) {
                    const resData = response.data.data;
                    const _error = 0;
                    const message = "Selamat anda berhasil masuk";

                    res.status(200).json(retCode.ret200(req, res, { _error, message, payload: resData }));
                } else {
                    res.status(response.status).json(retCode.ret401(req, res, { _error: 1, message: response.data.message }));
                }
            })
            .catch(error => {
                // console.log('authRegister.error: ' + JSON.stringify(error));
                const errorResponse = (typeof error.response === 'undefined' || error.response === '') ? null : error.response;
                if (errorResponse !== null) {
                    const errorStatus = error.response.data.status;
                    const errorData = error.response.data.data;
                    const errorMessage = error.response.data.msg;

                    res.status(error.response.status).json(retCode.ret422(req, res, { _error: true, status: errorStatus, data: errorData, message: errorMessage }));
                } else {
                    res.status(500).json(retCode.ret500(req, res, { error }));
                }
            });
    });

    server.post('/forgot-password', reqTime, (req, res) => {
        axios.post(`${config.apiHost}/v1/auth/forgot-password`,
            JSON.stringify(req.body),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'jid': jid,
                }
            })
            .then((response) => {
                // console.log('authForgot.response: ' + JSON.stringify(response.data.data));
                if (response.status === 200) {
                    const resData = response.data.data;
                    const _error = 0;
                    const message = "Selamat anda berhasil masuk";

                    res.status(200).json(retCode.ret200(req, res, { _error, message, payload: resData }));
                } else {
                    res.status(response.status).json(retCode.ret401(req, res, { _error: 1, message: response.data.message }));
                }
            })
            .catch(error => {
                // console.log('authForgot.error: ' + JSON.stringify(error));
                const errorResponse = (typeof error.response === 'undefined' || error.response === '') ? null : error.response;
                if (errorResponse !== null) {
                    const errorStatus = error.response.data.status;
                    const errorData = error.response.data.data;
                    const errorMessage = error.response.data.msg;

                    res.status(error.response.status).json(retCode.ret422(req, res, { _error: true, status: errorStatus, data: errorData, message: errorMessage }));
                } else {
                    res.status(500).json(retCode.ret500(req, res, { error }));
                }
            });
    });

    server.post('/reset-password/submit', reqTime, (req, res) => {
        axios.post(`${config.apiHost}/v1/auth/reset-password/submit`,
            JSON.stringify(req.body),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'jid': jid,
                }
            })
            .then((response) => {
                // console.log('authReset.response: ' + JSON.stringify(response.data.data));
                if (response.status === 200) {
                    const resData = response.data.data;
                    const _error = 0;
                    const message = "Selamat anda berhasil masuk";

                    res.status(200).json(retCode.ret200(req, res, { _error, message, payload: resData }));
                } else {
                    res.status(response.status).json(retCode.ret401(req, res, { _error: 1, message: response.data.message }));
                }
            })
            .catch(error => {
                // console.log('authReset.error: ' + JSON.stringify(error));
                const errorResponse = (typeof error.response === 'undefined' || error.response === '') ? null : error.response;
                if (errorResponse !== null) {
                    const errorStatus = error.response.data.status;
                    const errorData = error.response.data.data;
                    const errorMessage = error.response.data.msg;

                    res.status(error.response.status).json(retCode.ret422(req, res, { _error: true, status: errorStatus, data: errorData, message: errorMessage }));
                } else {
                    res.status(500).json(retCode.ret500(req, res, { error }));
                }
            });
    });

    //==================================================================//
    //=================== [DELETE] - API DOCUMENTATION ===================//
    //==================================================================//
    server.post('/logout', reqTime, (req, res) => {
        axios.delete(config.apiHost + '/v1/auth/logout', { data: { refresh_token: req.session.refreshToken } })
            .then((response) => {
                // console.log('logout.response: ' + JSON.stringify(response.data.data));
                if (response.status === 200) {
                    const _error = 0;
                    const message = "Anda telah keluar";

                    delete req.session.accessToken;
                    delete req.session.refreshToken;

                    req.session.destroy;

                    res.status(200).json(retCode.ret200(req, res, { _error, message }));
                } else {
                    res.status(response.status).json(retCode.ret401(req, res, { _error: 1, message: response.data.message }));
                }
            })
            .catch(error => {
                // console.log('logout.error: ' + JSON.stringify(error));
                const errorResponse = (typeof error.response === 'undefined' || error.response === '') ? null : error.response;
                if (errorResponse !== null) {
                    const errorStatus = error.response.data.status;
                    const errorData = error.response.data.data;
                    const errorMessage = error.response.data.msg;

                    res.status(error.response.status).json(retCode.ret422(req, res, { _error: true, status: errorStatus, data: errorData, message: errorMessage }));
                } else {
                    res.status(500).json(retCode.ret500(req, res, { error }));
                }
            });
    });

}
