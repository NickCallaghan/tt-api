require("dotenv");

const express = require("express");
const router = express.Router();

// Middleware
const checkAuth = require("../middleware/check-auth");

// Controller
const siteController = require("../controllers/site");

//Routes

// GET - All Sites
router.get("/", siteController.sites_get_all);

// GET - SINGLE Sites by ID
router.get("/:siteId", siteController.get_site_by_id);

// POST - Create a new site
router.post("/", checkAuth, siteController.add_site);

// PATCH - Update a site.
router.patch("/:siteId", checkAuth, siteController.update_site);

// ROUTE - Delete a site by ID
router.delete("/:siteId", checkAuth, siteController.delete_site);

module.exports = router;
