require("dotenv");

const APP_PORT = process.env.APP_PORT;
const APP_BASEURL = process.env.APP_BASEURL;

const url = `${APP_BASEURL}:${APP_PORT}`;
const route = "checkin";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Checkin = require("../../models/checkinModel");

// GET - All Checkins
router.get("/", async (req, res, next) => {
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
});

// GET - All checkins for a site
router.get("/:siteId", async (req, res, next) => {
  const id = req.params.siteId;

  try {
    const checkins = await Checkin.find()
      .populate("site", "siteName siteCode")
      .where({ site: id });
    res.status(200).json({
      noCheckins: checkins.length,
      checkins,
    });
  } catch (err) {
    res(500).json({ error: err });
  }
});

// POST - Create a new checkin
router.post("/", async (req, res, next) => {
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
      request: {
        type: "GET",
        url: `${url}/${route}/${checkin._id}`,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
