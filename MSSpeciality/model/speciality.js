const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var specialitySchema = Schema({
    code: String,
    name: String,
    enabled: Boolean
},
    { versionKey: false });

module.exports = mongoose.model("colSpeciality", specialitySchema);