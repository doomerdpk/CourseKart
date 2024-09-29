let requestCounts = {};

function CourseRateLimiter(req, res, next) {
  const now = Date.now();
  const windowTime = 20 * 1000; // 20 seconds
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

  if (requestCounts[userId].count > requestLimit) {
    res.status(429).json({
      error: `Too many requests. Please try again after ${Math.ceil(
        windowTime / 1000
      )}`,
    });
    return;
  }

  next();
}

module.exports = CourseRateLimiter;
