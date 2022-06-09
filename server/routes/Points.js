const axios = require('axios');
const config = require('../config');
const helperAPI = require('../api');
const retCode = require('../retCode');
const { reqTime } = require('../retTime');
const { v4: uuidv4 } = require('uuid');

module.exports = function (server, app, session) {

  var jid = uuidv4();

  server.get('/points', (req, res) => {
    const isDesktop = req.useragent.isDesktop;

    if (req.session.accessToken != undefined && req.session.accessToken != null && req.session.accessToken != '') {
      if (isDesktop) return app.render(req, res, '/points');
      else return app.render(req, res, '/mobiles/points');
    } else {
      res.redirect('/auth');
    }
  });

  //==================================================================//
  //=================== [POST] - API DOCUMENTATION ===================//
  //==================================================================//
  server.post('/point', reqTime, (req, res) => {
    const session = req.session;
    const sessionAccessToken = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;

    if (sessionAccessToken !== null) {
      // helperAPI.interceptors(req, res);

      axios.get(config.apiHost + '/v1/point',
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
          // console.log('notification.error: ' + JSON.stringify(error));
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
