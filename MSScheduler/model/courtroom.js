const mongoose = require("mongoose");

const CourtRoomSchema = new mongoose.Schema({
    _id: String,
    name: String
});

module.exports = CourtRoomSchema;