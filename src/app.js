const express = require("express");
const app = express();
const Restaurant = require("../models/Restaurant");
const db = require("../db/connection");

const restaurants = require("../routes/restaurants");

app.use(express.json());

//route imports
app.use("/restaurants", restaurants);

module.exports = app;
