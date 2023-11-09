const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema({
    _id: String,
    name: String
});

module.exports = StateSchema;