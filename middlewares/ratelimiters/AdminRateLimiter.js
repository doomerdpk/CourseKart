let requestCounts = {};

function AdminRateLimiter(req, res, next) {
  const now = Date.now();
  const windowTime = 60 * 1000; // 1 minute
  const requestLimit = 5;
  const userId = req.userId || req.ip;

  if (!requestCounts[userId]) {
    requestCounts[userId] = { count: 0, lastReset: now };
  }

  if (now - requestCounts[userId].lastReset > windowTime) {
    // Reset the count if the window time has passed
    requestCounts[userId].count = 0;
    requestCounts[userId].lastReset = now;
  }

  requestCounts[userId].count++;

  if (requestCounts[userId].length >= requestLimit) {
    res.json({
      error: `Too many requests. Please try again after ${Math.ceil(
        windowTime / 1000
      )}`,
    });
    return;
  }
  next();
}

module.exports = AdminRateLimiter;
