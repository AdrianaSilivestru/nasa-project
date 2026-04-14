const { request } = require("../../app");
const { getAllLaunches, existsLaunchWithId, abortLaunchById, scheduleNewLaunch } = require("../../models/launches.model");
const { getPagination } = require("../../services/query");

const getAllLaunchesController = async (req, res) => {
    const { skip, limit } = getPagination(req.query);
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
};

async function addNewLaunchController(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: "Missing required launch property"
        })
    }
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid launch date"
        })
    }

    await scheduleNewLaunch(launch);

    return res.status(201).json(launch);
}

async function abortLaunchController(req, res) {
    const launchId = +req.params.id;
    const existsLaunch = existsLaunchWithId(launchId);

    if (!existsLaunch) {
        return res.status(404).json({
            error: "Launch not found"
        })
    }

    const aborted = await abortLaunchById(launchId);
    if (!aborted) {
        return res.status(400).json({
            error: "Launch not aborted"
        });
    }
    return res.status(200).json({ ok: true });
}

module.exports = {
    getAllLaunchesController,
    addNewLaunchController,
    abortLaunchController
}