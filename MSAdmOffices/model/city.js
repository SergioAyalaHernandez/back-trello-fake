const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
    _id: String,
});

module.exports = CitySchema;