const { getAllPlanets } = require("../../models/planets.model");

async function getAllPlanetsController(req, res) {
    return res.status(200).json(await getAllPlanets());
}

module.exports = {
    getAllPlanetsController
}