require("dotenv");

const APP_PORT = process.env.APP_PORT;
const APP_BASEURL = process.env.APP_BASEURL;

const url = `${APP_BASEURL}:${APP_PORT}`;
const route = "user";

const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  res.status(201).json({ message: "New User Created" });
});

router.post("/signup", (req, res, next) => {
  res.status(201).json({ message: "User Logged In" });
});

module.exports = router;
