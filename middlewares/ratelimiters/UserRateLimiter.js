let requestCounts = {};

function UserRateLimiter(req, res, next) {
  const now = Date.now();
  const windowTime = 60 * 1000;
  const requestLimit = 5;

  const userIP = req.ip;

  if (!requestCounts[userIP]) {
    requestCounts[userIP] = [];
  }
  requestCounts[userIP] = requestCounts[userIP].filter(
    (timestamp) => now - timestamp < windowTime
  );

  if (requestCounts[userIP].length >= requestLimit) {
    res.json({
      error: "Too many Requests!",
    });
    return;
  } else {
    requestCounts[userIP].push(now);
    next();
  }
}

module.exports = UserRateLimiter;
