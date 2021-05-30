"use strict";

// Read .env
const dotenv = require('dotenv');
dotenv.config()

// Initialize resources
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express(); // Create express app

// Add middlewares
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      baseUri: ["'self'"],
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", `${process.env.DNS}`],
      styleSrc: ["'self'", `${process.env.DNS}`, "'unsafe-inline'"],
      fontSrc: ["'self'", `${process.env.DNS}`],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: null,
    },
  })
);
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

// Add routes
app.get("/", cors(), (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Initialize Express app
app.listen(PORT, () => {
  console.log(`Started server on port ${process.env.PORT}`);
});
