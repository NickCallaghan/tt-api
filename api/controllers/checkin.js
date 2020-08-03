const Checkin = require("../models/checkin");
const mongoose = require("mongoose");

module.exports.get_all = async (req, res, next) => {
  try {
    const result = await Checkin.find()
      .select(
        "_id siteId guestFirstName guestLastName guestEmail guestPhone partySize"
      )
      .populate("site")
      .exec();
    res.status(200).json({
      noCheckins: result.length,
      checkins: result,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports.get_one = async (req, res, next) => {
  try {
    const result = await Checkin.find()
      .select(
        "_id siteId guestFirstName guestLastName guestEmail guestPhone partySize"
      )
      .populate("site")
      .exec();
    res.status(200).json({
      noCheckins: result.length,
      checkins: result,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports.create_checkin = async (req, res, next) => {
  const {
    site,
    guestFirstName,
    guestLastName,
    guestEmail,
    guestPhone,
    partySize,
  } = req.body;

  const checkin = new Checkin({
    _id: new mongoose.Types.ObjectId(),
    checkinTime: Date.now(),
    site,
    guestFirstName,
    guestLastName,
    guestEmail,
    guestPhone,
    partySize,
  });

  try {
    // Save new checkin
    await checkin.save();
    res.status(201).json({
      message: "New Checkin Created",
      newCheckIn: checkin,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
