const fs = require('fs');
const path = require('path');
const readline = require('readline');
const Stream = require('stream');

const { retYMD } = require('./server/timedate');
const LOGDIR = path.join(__dirname + '/log/');
const TDRLOG = path.join(__dirname, '/log/TDRLog');
const SYSLOG = path.join(__dirname, '/log/SYSLog');
const { v4: uuidv4 } = require('uuid');
var today;

exports.initLog = async () => {
  today = new Date();

  if (!fs.existsSync(LOGDIR)) {
    fs.mkdirSync(LOGDIR, { recursive: true });
  }

  if (!fs.existsSync(TDRLOG)) {
    await makeFile(TDRLOG);
  }
  else {
    var lastLine = await getLastLine(TDRLOG, 1);

    if (lastLine) {
      var logJSON = JSON.parse(lastLine);
      var logLastTime = retYMD(logJSON.logTime);
      var logTodayTime = retYMD(today);

      if (logLastTime != logTodayTime) {
        await renameFile(TDRLOG, logLastTime);
      }
    }

    if (!fs.existsSync(SYSLOG)) {
      await makeFile(SYSLOG);
    }
    else {
      // ambil tanggal dari terakhir
      var lastLine = await getLastLine(SYSLOG, 1);

      if (lastLine) {
        var logJSON = JSON.parse(lastLine);
        var logLastTime = retYMD(logJSON.logTime);
        var logTodayTime = retYMD(today);

        if (logLastTime != logTodayTime) {
          await renameFile(SYSLOG, logLastTime);
        }
      }
    }


  }
}

exports.writeTDRLOG = (req, res, data) => {
  // set time to today
  var now = new Date();
  var logNowTime = retYMD(now);
  var logTodayTime = retYMD(today);


  if (logNowTime != logTodayTime) {
    renameFile(TDRLOG, logTodayTime).then(() => {
      today = now;
      writeLog(TDRLOG, req, res, data, "TDR");
    });
  }
  else {
    writeLog(TDRLOG, req, res, data, "TDR");
  }

}

exports.writeSYSLOG = (req, res, data, error = "") => {
  // set time to today
  var now = new Date();
  var logNowTime = retYMD(now);
  var logTodayTime = retYMD(today);

  if (logNowTime != logTodayTime) {
    renameFile(SYSLOG, logTodayTime).then(() => {
      writeLog(SYSLOG, req, res, data, "SYS", error);
    });
  }
  else {
    writeLog(SYSLOG, req, res, data, "SYS", error);
  }

}

const writeLog = (file, req, res, data, type, error = "") => {
  try {
    // initialize
    var headers = {
      ...req.rawHeaders
    };

    var ip = req.socket.remoteAddress ? req.socket.remoteAddress : '0.0.0.0';

    var reqs = { ...req.body };
    var resp = {
      ...data
    };

    var xid = uuidv4();
    var jid = req.jid ? req.jid : null;
    var cid = '';

    var header = {
      "host": headers[1],
      "x-real-ip": ip,
      "content-length": headers[5],
      "accept": headers[9],
      "content-type": headers[13],
      "user-agent": headers[17],
      "xid": xid
    }

    // generate logTime
    var date = new Date();
    var rt = date - res.req_start;
    var logTime = date.toISOString();

    // remove password from request
    if (reqs.hasOwnProperty('password')) {
      delete reqs['password'];
    }

    if (reqs.hasOwnProperty('password_confirmation')) {
      delete reqs['password_confirmation'];
    }

    if (reqs.hasOwnProperty('refresh_token')) {
      delete reqs['refresh_token'];
    }

    // remove response payload
    if (resp.hasOwnProperty('payload')) {
      delete resp['payload'];
    }


    var log = {
      jid: jid,
      cid: cid,
      xid: xid,
      logTime: logTime,
      logType: type,
      rt: rt,
      port: process.env.NODE_PORT,
      ip: process.env.NODE_IP,
      app: process.env.NODE_APP,
      ver: process.env.NODE_VERSION,
      path: req.originalUrl,
      header: header,
      req: reqs,
      resp: resp,
      error: error,
      addData: ""
    }

    fs.appendFile(file, JSON.stringify(log) + '\n', function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
  catch (err) {
    console.log(err)
  }
}
exports.writeLog = writeLog;


// Get Last Line
const getLastLine = async (fileName, minLength) => {
  let inStream = fs.createReadStream(fileName);
  let outStream = new Stream;

  return new Promise((resolve, reject) => {
    let rl = readline.createInterface(inStream, outStream);

    let lastLine = '';
    rl.on('line', function (line) {
      if (line.length >= minLength) {
        lastLine = line;
      }
    });

    rl.on('error', reject)

    rl.on('close', function () {
      resolve(lastLine)
    });
  })
}

// Rename File
const renameFile = async (filename, logLastTime) => {
  await fs.rename(filename, filename + '.' + logLastTime + '.log.gz', async () => {
    await makeFile(filename);
  });
}

// Make File
const makeFile = async (filename) => {
  await fs.appendFile(filename, '', function (err) { });
}
