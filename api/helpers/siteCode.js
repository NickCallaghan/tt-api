const Site = require("../models/site");

const randomDigit = () => {
  return Math.floor(Math.random() * 9);
};

const shortCodeExists = async (siteCode) => {
  const site = await Site.find({ siteCode: siteCode }).exec();
  console.log(site);
  if (site.length > 0) {
    return true;
  } else {
    return false;
  }
};

const makeShortCode = () => {
  let code = Array.from({ length: 6 }, randomDigit);
  code.splice(3, 0, "-");
  return code.join("");
};

const generate = () => {
  // Make Code
  let siteCode = makeShortCode();
  //If code exist make another
  if (shortCodeExists()) {
    console.log("loop1");
    siteCode = makeShortCode();
  }
  return siteCode;
};

module.exports = {
  generate,
};
