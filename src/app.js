const express = require("express");
const app = express();
const Restaurant = require("../models/Restaurant");
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded());

//TODO: Create your GET Request Route Below:
app.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findByPk(id);
  res.json(restaurant);
});

app.post("/restaurants", async (req, res) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(201).json(restaurant);
});

app.put("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findByPk(id);
  await restaurant.update(req.body);
  res.status(201).json(restaurant);
});

app.delete("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findByPk(id);
  await restaurant.destroy();
  res.status(204).send({ message: "Restaurant deleted" });
});

module.exports = app;
