const mongoose = require("mongoose");
const PermissionsSchema = require("./permissions");

const ProfileSchema = new mongoose.Schema({
    _id: String,
    name: String,
    permissions: [PermissionsSchema],
});

module.exports = ProfileSchema;
