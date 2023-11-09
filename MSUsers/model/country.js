const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
    _id: String,
    name: String
});

module.exports = CountrySchema;