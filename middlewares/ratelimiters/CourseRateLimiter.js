let requestCounts = {};

function CourseRateLimiter(req, res, next) {
  const now = Date.now();
  const windowTime = 20 * 1000;
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
      empty_message: "Too many requests",
    });
  } else {
    requestCounts[userIP].push(now);
    next();
  }
}

module.exports = CourseRateLimiter;
