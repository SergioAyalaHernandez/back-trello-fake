const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
    city_id: String
});

module.exports = CitySchema;