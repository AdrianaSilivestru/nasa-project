const express = require("express");
const launchesRouter = express.Router();
const { getAllLaunchesController, addNewLaunchController, abortLaunchController } = require("./launches.controller");

launchesRouter.get("/", getAllLaunchesController);
launchesRouter.post("/", addNewLaunchController);
launchesRouter.delete("/:id", abortLaunchController);

module.exports = launchesRouter;