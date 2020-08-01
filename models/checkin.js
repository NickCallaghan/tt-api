const mongoose = require("mongoose");

const checkinSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  checkinTime: { type: Date, required: true },
  site: { type: mongoose.Schema.Types.ObjectId, ref: "Site", required: true },
  guestFirstName: { type: String, required: true },
  guestLastName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  guestPhone: { type: String, required: true },
  partySize: { type: String, required: true },
});

module.exports = mongoose.model("Checkin", checkinSchema);
