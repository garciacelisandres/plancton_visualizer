"use strict";

const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express(); // create express app

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// add middlewares
app.use(cors())
app.use(helmet.contentSecurityPolicy({
  useDefaults: false,
  directives: {
    defaultSrc: ["'self'", "'unsafe-inline'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    upgradeInsecureRequests: [],
  },
}));
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`Started server on port ${PORT}`)
});
