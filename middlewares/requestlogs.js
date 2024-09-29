const { logModel } = require("../Database/app_database");
const sanitize = require("mongo-sanitize");

async function logRequests(req, res, next) {
  const date = new Date().toISOString();
  const requestLog = {
    ip: sanitize(req.ip),
    method: sanitize(req.method),
    url: sanitize(req.url),
    timestamp: sanitize(date),
  };

  try {
    logModel.create({ requestLog: JSON.stringify(requestLog) });
  } catch (error) {
    console.error("Error logging request:", error.message);
    res.json({
      error: "Error Logging Request",
    });
  }

  next();
}

module.exports = logRequests;
