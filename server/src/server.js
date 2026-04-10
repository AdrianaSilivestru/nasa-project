const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await loadPlanetsData();

        server.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        });
    } catch (error) {
        console.error("FULL ERROR:");
        console.error(error);
    }
}

startServer();