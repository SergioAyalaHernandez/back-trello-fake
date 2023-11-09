const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ProfileSchema = require("./profiles.js");
const OficeSchema = require("./office.js");
const StateSchema = require("./state.js");
const CitySchema = require("./city.js");
const CountrySchema = require("./country.js");

var userSchema = Schema({
    name: String,
    firsName: String,
    lastName: String,
    email: String,
    password: String,
    vatNumber: String,
    phone: String,
    enabled: Boolean,
    loginFlag: Boolean,
    passwordTemporaly: String,
    profiles: [ProfileSchema],
    office: [OficeSchema],
    country: [CountrySchema],
    state: [StateSchema],
    city: [CitySchema]
},
    { versionKey: false });

module.exports = mongoose.model("ColUsers", userSchema);