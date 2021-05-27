"use strict";

const path = require("path");
const express = require("express");
const helmet = require("helmet");
const app = express(); // create express app

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// add middlewares
app.use(helmet());
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, HOST);
