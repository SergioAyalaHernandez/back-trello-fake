const mongoose = require("mongoose");
const OfficeSchema = require("./office.js");

const UserSchema = new mongoose.Schema({
    _id: String,
    name: String,
    userIdTeams: String,
    userIdZoom: String,
    office:[OfficeSchema]
});

module.exports = UserSchema;