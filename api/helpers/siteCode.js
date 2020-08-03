const Site = require("../models/site");

const randomDigit = () => {
  return Math.floor(Math.random() * 9);
};

// Checks the database wether the siteCode already exists
const shortCodeExists = async (siteCode) => {
  const site = await Site.find({ siteCode: siteCode }).exec();
  if (site.length > 0) {
    return true;
  } else {
    return false;
  }
};

// Make a shortcode for siteCode in correct format
const makeShortCode = () => {
  let code = Array.from({ length: 6 }, randomDigit);
  code.splice(3, 0, "-");
  return code.join("");
};

// Generate a unique shortcode to be used as the site code
const generate = () => {
  // Make Code
  let siteCode = makeShortCode();
  //If code exist make another
  if (shortCodeExists()) {
    siteCode = makeShortCode();
  }
  return siteCode;
};

module.exports = {
  generate,
};
