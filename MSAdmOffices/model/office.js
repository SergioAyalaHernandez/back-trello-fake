const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const CitySchema = require("./city.js");
const SpecialtySchema = require("./speciality.js");

var officeSchema = Schema({
    entityCode: String,
    courtCode: String,
    name: String,
    enabled: Boolean,
    address: String,
    phone: String,
    city: [CitySchema],
    specialty: [SpecialtySchema]
},
    { versionKey: false });

module.exports = mongoose.model("colOffice", officeSchema);