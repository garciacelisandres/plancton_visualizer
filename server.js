"use strict";

const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express(); // create express app

// Constants
const PORT = 8080;

// add middlewares
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      baseUri: ["plankton.westeurope.cloudapp.azure.com"],
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "plankton.westeurope.cloudapp.azure.com"],
      styleSrc: ["'self'", "plankton.westeurope.cloudapp.azure.com", "'unsafe-inline'"],
      fontSrc: ["'self'", "plankton.westeurope.cloudapp.azure.com"],
      objectSrc: ["'self'"]
    },
  })
);
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

app.get("/", cors(), (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`);
});
