const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connection.once("open", () => {
    console.log("mongodb connection ready");
});

mongoose.connection.on("error", (err) => {
    console.log(err);
});

async function mongoConnect() {
    await mongoose.connect(process.env.MONGO_URI)
};

async function mongoDisconnect() {
    await mongoose.disconnect();
};

module.exports = {
    mongoConnect,
    mongoDisconnect
}