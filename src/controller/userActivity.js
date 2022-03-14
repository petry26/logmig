const fs = require('fs').promises;
const path = require('path');
const globalConst = require('../global/constants');

const os = require('os');

async function _readLogFile() {
  try {
    let data = await fs.readFile(path.join(globalConst.LOG_DIR));

    data = String(data);

    return data;
  } catch (e) {
    throw new Error('error while reading heroku log');
  }
}

function _breakTextInLines(text) {
  let lines = text.split(os.EOL);
  lines.pop();
  return lines;
}

function _filterLoginAndLogoutActions(logLines) {
  const regex = new RegExp('path="/login"|path="/logout"');
  const filteredLog = logLines.filter((logLine) => logLine.match(regex));

  return filteredLog;
}

function _filterInvalidUser(logLines) {
  const regex = new RegExp(/user_id=-1/);
  const filteredLog = logLines.filter((logLine) => !logLine.match(regex));

  return filteredLog;
}

function _filterValidProtocol(logLines) {
  const regex = new RegExp(/method=POST/);
  const filteredLog = logLines.filter((logLine) => logLine.match(regex));

  return filteredLog;
}

function _getLogDate(logLine) {
  return logLine.substr(0, 15);
}

function _getAction(logLine) {
  const actionRegex = new RegExp('path="/(.*?)"');

  return logLine.match(actionRegex)[1];
}

function _getRequestStatus(logLine) {
  const requestStatusRegex = new RegExp(/status\=(\d\d\d)/);

  return logLine.match(requestStatusRegex)[1];
}

function _getUserID(logLine) {
  const userIdRegex = new RegExp(/user_id=(\d.*?)\s/);

  return logLine.match(userIdRegex)[1];
}

function _logLinesToObj(logLines) {
  const time = new Date();

  let usersLogs = [];
  logLines.forEach((line) => {
    usersLogs.push({
      logdate: _getLogDate(line),
      action: _getAction(line),
      requeststatus: _getRequestStatus(line),
      userId: _getUserID(line),
      createdAt: time,
      updatedAt: time,
    });
  });

  return usersLogs;
}

async function importLogs() {
  const fileData = await _readLogFile();

  logLines = _breakTextInLines(fileData);

  logLines = _filterLoginAndLogoutActions(logLines);

  logLines = _filterInvalidUser(logLines);

  logLines = _filterValidProtocol(logLines);

  return _logLinesToObj(logLines);
}

const userActivity = {
  importLogs,
};

module.exports = userActivity;
