const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var admCountriesSchema = Schema({
    name: String,
},
{ versionKey: false });

module.exports = mongoose.model("ColCountries", admCountriesSchema);