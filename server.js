require("dotenv").config();
const path = require("path");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const favicon = require("serve-favicon");
const router = require("./controllers");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitTracker", {
  useNewUrlParser: true,
});

// app.use(favicon(path.join(__dirname, "./public/favicon.ico")));

app.use(router);

app.listen(PORT, () => {
  console.log("Now listening on port", PORT);
});
