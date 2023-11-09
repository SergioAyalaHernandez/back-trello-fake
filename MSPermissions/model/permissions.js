const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var permissionsSchema = Schema({
    name: String,
    description: String,
    routes: String
},
{ versionKey: false });

module.exports = mongoose.model("colPermissions", permissionsSchema);