const express = require("express");
const bodyParser = require("body-parser");
const { API_VERSION } = require("./constants");

const app = express();

/// Import Routings
// ....

// Configure Body Parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure Header HTTP - CORS
// ...

// Configure routings
// ...

module.exports = app;
