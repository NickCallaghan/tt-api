const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, required: true },
  userFirstName: { type: String, required: true },
  userLastName: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  userPassword: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
