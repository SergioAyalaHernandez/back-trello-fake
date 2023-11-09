const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
    _id: String,
    name: String,
    postalCode: String,
});

module.exports = CitySchema;