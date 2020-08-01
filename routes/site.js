require("dotenv");

const APP_PORT = process.env.APP_PORT;
const APP_BASEURL = process.env.APP_BASEURL;

const url = `${APP_BASEURL}:${APP_PORT}`;
const route = "site";

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Site = require("../models/site");

// ROUTE - Get All Sites
router.get("/", (req, res, next) => {
  Site.find()
    .select("siteName siteCode _id createdAt")
    .exec()
    .then((sites) => {
      //Response Object
      const response = {
        noOfSites: sites.length,
        sites: sites.map((site) => {
          console.log(site);
          return {
            id: site._id,
            createdAt: site.createdAt,
            siteName: site.siteName,
            siteCode: site.siteCode,
            request: {
              type: "GET",
              url: `${url}/${route}/${site._id}`,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "something went wrong" });
    });
});

// ROUTE - Get SINGLE Sites by ID
router.get("/:siteId", (req, res, next) => {
  const id = req.params.siteId;
  Site.findById(id)
    .exec()
    .then((site) => {
      console.log(site);
      const response = {
        id: id,
        createdAt: site.createdAt,
        siteName: site.siteName,
        siteCode: site.siteCode,
        request: {
          type: "GET",
          url: `${url}/${route}/${site._id}`,
        },
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// ROUTE - Create a new site
router.post("/", (req, res, next) => {
  const { siteCode, siteName } = req.body;

  // Create new site object
  const site = new Site({
    _id: new mongoose.Types.ObjectId(),
    createdAt: Date.now(),
    siteCode,
    siteName,
  });

  // Write new site to the DB
  site
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "New Site Created",
        newSite: site,
        request: {
          type: "GET",
          url: `${url}/${route}/${site._id}`,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

// ROUTE - PATCH - Update a site.
router.patch("/:siteId", (req, res, next) => {
  const id = req.params.siteId;
  // Add prarmaters to an object to allow optional updating of different fields.
  const updateOpts = {};
  for (const ops of req.body) {
    updateOpts[ops.propName] = ops.value;
  }
  Site.update(
    { _id: id },
    {
      $set: updateOpts,
    }
  )
    .exec()
    .then(() => {
      res.json({
        message: "Site Updated",
        fields: updateOpts,
        request: {
          type: "GET",
          url: `${url}/${route}/${id}`,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// ROUTE - Delete a site by ID
router.delete("/:siteId", (req, res, next) => {
  const id = req.params.siteId;
  Site.remove({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Site sucessfully deleted" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
