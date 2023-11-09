const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var admStatesSchema = Schema({
    name: String,
    idCountry: String
},
{ versionKey: false });

module.exports = mongoose.model("ColStates", admStatesSchema);