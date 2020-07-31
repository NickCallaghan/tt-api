const mongoose = require("mongoose");

const siteSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, required: true },
  siteName: { type: String, required: true },
  siteCode: { type: String, required: true },
});

module.exports = mongoose.model("Site", siteSchema);
