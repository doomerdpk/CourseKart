const { logModel } = require("../Database/app_database");

async function logRequests(req, res, next) {
  const date = new Date().toISOString();
  requestLog = `${req.method} ${req.url} - ${date}`;
  await logModel.create({
    requestLog,
  });
  next();
}

module.exports = logRequests;
