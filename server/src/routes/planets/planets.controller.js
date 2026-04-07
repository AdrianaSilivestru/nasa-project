const { getAllPlanets } = require("../../models/planets.model");

function getAllPlanetsController(req, res) {
    return res.status(200).json(getAllPlanets());
}

module.exports = {
    getAllPlanetsController
}