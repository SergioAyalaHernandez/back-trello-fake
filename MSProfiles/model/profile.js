const mongoose = require("mongoose");
const permissionsSchema = require("./permissions.js");
var Schema = mongoose.Schema;


var profileSchema = Schema({
    name: String,
    permissions:[permissionsSchema]
},
{ versionKey: false });

module.exports = mongoose.model("colProfiles", profileSchema);