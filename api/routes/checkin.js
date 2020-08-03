require("dotenv");

const express = require("express");
const router = express.Router();

// Middleware
const checkAuth = require("../middleware/check-auth");

// Controller
const checkinController = require("../controllers/checkin");

// GET - All Checkins
router.get("/", checkAuth, checkinController.get_all);

// GET - All checkins for a site
router.get("/:siteId", checkAuth, checkinController.get_one);

// POST - Create a new checkin
router.post("/", checkinController.create_checkin);

module.exports = router;
