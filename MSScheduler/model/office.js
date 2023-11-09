const mongoose = require("mongoose");

const OfficeSchema = new mongoose.Schema({
    _id: String,
    postalCode: String,
    entityCode: String,
    specialityCode: String,
    courtCode: String
});

module.exports = OfficeSchema;