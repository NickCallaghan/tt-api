const Site = require("../models/site");
const mongoose = require("mongoose");

const APP_PORT = process.env.APP_PORT;
const APP_BASEURL = process.env.APP_BASEURL;
const url = `${APP_BASEURL}:${APP_PORT}`;
const route = "site";
const siteCodeHelper = require("../helpers/siteCode");

module.exports.sites_get_all = async (req, res, next) => {
  try {
    // Get sites
    const sites = await Site.find()
      .select("siteName siteCode _id createdAt")
      .exec();
    // Build response
    const response = {
      noOfSites: sites.length,
      sites: sites.map((site) => {
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
  } catch (err) {
    res.status(500).json({
      message: "something went wrong!",
    });
  }
};

module.exports.get_site_by_id = async (req, res, next) => {
  const id = req.params.siteId;

  try {
    const site = await Site.findById(id).exec();
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
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports.add_site = async (req, res, next) => {
  try {
    const { siteName } = req.body;

    // Create new site object
    const site = new Site({
      _id: new mongoose.Types.ObjectId(),
      createdAt: Date.now(),
      siteCode: siteCodeHelper.generate(),
      siteName,
    });

    // Write new site to the DB
    await site.save();
    return res.status(201).json({
      message: "New Site Created",
      newSite: site,
      request: {
        type: "GET",
        url: `${url}/${route}/${site._id}`,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports.update_site = async (req, res, next) => {
  const id = req.params.siteId;
  // Add prarmaters to an object to allow optional updating of different fields.
  const updateOpts = {};
  for (const ops of req.body) {
    updateOpts[ops.propName] = ops.value;
  }
  try {
    // Check site exists
    const site = await Site.findById(id).exec();
    if (site) {
      //Update site if exists
      await Site.update(
        { _id: id },
        {
          $set: updateOpts,
        }
      ).exec();
      res.json({
        message: "Site Updated",
        fields: updateOpts,
        request: {
          type: "GET",
          url: `${url}/${route}/${id}`,
        },
      });
    } else {
      // Send 404 if site not found
      res.status(404).json({ message: "Site not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports.delete_site = async (req, res, next) => {
  try {
    const id = req.params.siteId;
    await Site.remove({ _id: id }).exec();
    res.status(200).json({ message: "Site sucessfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};
