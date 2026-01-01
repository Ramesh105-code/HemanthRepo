const express = require("express");
const app = express();

const rateLimiter = (limit, windowMs) => {
  const ipStore = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!ipStore.has(ip)) {
      ipStore.set(ip, { count: 1, startTime: now });
      return next();
    }

    const data = ipStore.get(ip);

    if (now - data.startTime > windowMs) {
      ipStore.set(ip, { count: 1, startTime: now });
      return next();
    }

    if (data.count >= limit) {
      return res.status(429).json({
        error: "Too many requests. Please try again later."
      });
    }

    data.count++;
    next();
  };
};

app.use(rateLimiter(10, 60 * 1000));

app.get("/", (req, res) => {
  res.send("API response");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
