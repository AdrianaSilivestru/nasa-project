const http = require("http");
const app = require("./app");
const { mongoConnect } = require("./services/mongo");
require("dotenv").config();
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
    try {
        await mongoConnect();
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