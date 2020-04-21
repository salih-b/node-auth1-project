const express = require('express');
const helmet = require('helmet');
const cors = require("cors");
const session = require("express-session");

const UsersRouter = require("./users/users-router.js");
const authRouter = require("./auth/auth-router.js");
const authenticator = require("./auth/authenticator.js");

const server = express();

const sessionConfig = {
    name: "ghost",
    secret: process.env.SESSION_SECRET || "The dark ones must not know!",
    resave: false,
    saveUninitialized: process.env.SEND_COOKIES || true,
    cookie: {
      maxAge: 1000 * 60 * 10, // good for 10 mins in ms
      secure: process.env.USE_SECURE_COOKIES || false, // used over https only, set to true in production
      httpOnly: true, // true means JS on the client cannot access the cooke
    },
  };

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig)); // take this off to test req.session

server.use("/api", authRouter);
server.use('/api', authenticator,  UsersRouter);


server.get("/", (req, res) => {
    res.json({ api: "up" });
  });
  

module.exports = server;