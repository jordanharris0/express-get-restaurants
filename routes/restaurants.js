const express = require("express");

const restaurants = express.Router();
const Restaurant = require("../models/Restaurant");
const db = require("../db/connection");

restaurants.use(express.json());
restaurants.use(express.urlencoded({ extended: true }));

restaurants.get("/", async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.status(200).json(restaurants);
});

restaurants.get("/:id", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  res.json(restaurant);
});

restaurants.post("/", async (req, res) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(201).json(restaurant);
});

restaurants.put("/:id", async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findByPk(id);
  await restaurant.update(req.body);
  res.status(201).json(restaurant);
});

restaurants.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findByPk(id);
  await restaurant.destroy();
  res.status(204).send({ message: "Restaurant deleted" });
});

module.exports = restaurants;
