const mongoose = require("mongoose");


const invitedGuestsSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String
});

module.exports = invitedGuestsSchema;