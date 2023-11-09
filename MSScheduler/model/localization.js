const mongoose = require("mongoose");

const LocalizationSchema = new mongoose.Schema({
    _id: String,
    name: String,
});

module.exports = LocalizationSchema;