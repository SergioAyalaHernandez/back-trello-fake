const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const CitySchema = require("./city.js");

var courtRoomsSchema = Schema({
    name: String,
    enabled: Boolean,
    address: String,
    phone: String,
    localization: [CitySchema]
},
    { versionKey: false });

module.exports = mongoose.model("colCourtRooms", courtRoomsSchema);