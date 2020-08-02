require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const siteRoutes = require("./api/routes/site");
const checkinRoutes = require("./api/routes/checkin");
const userRoutes = require("./api/routes/user");

const APP_PORT = process.env.APP_PORT || 3000;

// Connect to database
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_UNAME = process.env.DB_UNAME;
const DB_URL = process.env.DB_URL;
const DB_CONNCTION_STRING = `mongodb+srv://${DB_UNAME}:${DB_PASSWORD}@${DB_URL}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_CONNCTION_STRING, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

// Logging and body parser
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Adding cors headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    req.header("Access-Control-Allow-Methods", "GET, PATCH, POST, PUT, DELETE");
    return res.status(200).json({});
  }
  next();
});

// API - Routes
app.use("/site", siteRoutes);
app.use("/checkin", checkinRoutes);
app.use("/user", userRoutes);

// Handle 404 - not found
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Handle Unhandled Errors
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).json({ message: error.message });
});

// Start the Server
app.listen(APP_PORT, () => console.log(`App listening on ${APP_PORT}`));
