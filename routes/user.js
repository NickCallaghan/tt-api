require("dotenv");

// Libraries
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Mongoose Models
const User = require("../models/user");

// POST - Create User / Sign Up Route
router.post("/signup", async (req, res, next) => {
  // Check if user email already exists
  const matchedUsers = await User.find({
    userEmail: req.body.userEmail,
  }).exec();

  if ((await matchedUsers.length) >= 1) {
    return res.status(422).json({ message: "User email already exists" });
  } else {
    // Create new user object
    const { userFirstName, userLastName, userEmail, userPassword } = req.body;

    // Create password hash
    await bcrypt.hash(userPassword, 10, async (err, hash) => {
      try {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          createdAt: Date.now(),
          userFirstName,
          userLastName,
          userEmail,
          userPassword: hash,
        });

        // Save new user to db
        const result = await user.save();
        res.status(201).json({
          message: "user Created",
          user: result,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
      }
    });
  }
});

router.post("/signup", (req, res, next) => {
  res.status(201).json({ message: "User Logged In" });
});

module.exports = router;
