const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = Schema({
    userId: String,
    clientId: String,
    clientSecret: String,
    refreshToken: String,
    createdAd: Date,

},
{ versionKey: false });

module.exports = mongoose.model("ColAuth", userSchema);