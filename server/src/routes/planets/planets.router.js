const express = require("express");
const planetsRouter = express.Router();
const { getAllPlanetsController } = require("./planets.controller");

planetsRouter.get("/", getAllPlanetsController);

module.exports = planetsRouter;