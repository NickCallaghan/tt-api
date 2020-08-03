require("dotenv");

// Libraries
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Mongoose Models
const User = require("../models/user");

// Controller
const userController = require("../controllers/user");

// POST - Create User / Sign Up Route
router.post("/signup", userController.signup);

// POST - Login and get token
router.post("/login", userController.login);

module.exports = router;
