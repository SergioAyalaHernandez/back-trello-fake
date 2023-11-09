const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var admCitiesSchema = Schema({
    name: String,
    idCounrty: String,
    idState: String
},
{ versionKey: false });

module.exports = mongoose.model("ColCities", admCitiesSchema);