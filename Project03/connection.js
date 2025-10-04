const { url } = require('inspector');
const mongoose = require('mongoose');

async function connectMongoDb(url) {
    return mongoose.connect(url)
        .then(() => console.log("MongoDB is connected"))
        .catch((err) => console.log("Error while connecting", err));
}

module.exports = {
    connectMongoDb,
};