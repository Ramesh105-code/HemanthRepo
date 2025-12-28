
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

const USERS = { admin: "password123" }; 
const COOKIE_NAME = "session";

function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).send("Authentication required");
  }

  const base64Credentials = authHeader.split(" ")[1];
  const [username, password] = Buffer.from(base64Credentials, "base64")
    .toString()
    .split(":");

  if (USERS[username] && USERS[username] === password) {
    req.user = { username };
    return next();
  }
  res.status(403).send("Invalid credentials");
}


app.post("/login", basicAuth, (req, res) => {
  const username = req.user.username;
  res.cookie(COOKIE_NAME, username, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.json({ message: "Logged in" });
});

function requireAuth(req, res, next) {
  const sessionCookie = req.cookies[COOKIE_NAME];
  if (sessionCookie) {
    req.user = { username: sessionCookie };
    next();
  } else {
    res.status(401).send("Not authenticated");
  }
}


app.get("/protected", requireAuth, (req, res) => {
  res.json({ message: `Hello ${req.user.username}` });
});

app.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.json({ message: "Logged out" });
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
