const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup
module.exports.signup = async (req, res, next) => {
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
};

// Login
module.exports.login = async (req, res, next) => {
  function authFailure() {
    return res.status(401).json({ message: "Auth Failure" });
  }

  // Check if user exists
  const user = await User.find({ userEmail: req.body.userEmail }).exec();
  if (user.length < 1) authFailure();
  // Check password matches hashed version
  await bcrypt.compare(
    req.body.userPassword,
    user[0].userPassword,
    async (err, same) => {
      try {
        if (!same) {
          authFailure();
        } else {
          // Return token on success
          const token = await jwt.sign(
            { userEmail: user[0].userEmail, userId: user[0]._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          return res.status(201).json({ message: "Login successful", token });
        }
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  );
};
