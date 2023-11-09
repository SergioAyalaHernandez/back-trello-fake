const mongoose = require("mongoose");

const OfiicesSchema = new mongoose.Schema({
    _id: String,
    name: String,
});

module.exports = OfiicesSchema;