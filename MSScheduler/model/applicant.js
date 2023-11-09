const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema({
    _id: String,
    name: String,
    phone: String,
    date: Date,
    email: String
});

module.exports = ApplicantSchema;