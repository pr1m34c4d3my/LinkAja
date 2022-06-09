const { writeTDRLOG, writeSYSLOG } = require('../log');

const makeReturn = (req, res, data, isLog) => {
  if (isLog) {
    if (res.statusCode != 200) {
      writeSYSLOG(req, res, data, data.error);
    }
    writeTDRLOG(req, res, data);
  }

  return data;
}

// ret200
// make message for 404 status
exports.ret200 = (req, res, data, isLog = true) => {
  return makeReturn(req, res, data, isLog);
}

// ret400
// make message for 404 status
exports.ret401 = (req, res, isLog = true) => {
  var data =
  {
    status: 401,
    msg: 'Unauthorized',
    data: []
  }

  return makeReturn(req, res, data, isLog);
}

// ret422
// make message for 404 status
exports.ret422 = (req, res, error, isLog = true) => {
  var data =
  {
    status: 422,
    msg: 'Unprocessable Entry',
    data: error
  }

  return makeReturn(req, res, data, isLog);
}

// ret500
// make message for 500 status
exports.ret500 = (req, res, message, isLog = true) => {
  var data =
  {
    status: 500,
    msg: "Internal server error",
    data: message
  }

  return makeReturn(req, res, data, isLog);
}
