const mongoose = require("mongoose");

const PermissionsSchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String
});

module.exports = PermissionsSchema;