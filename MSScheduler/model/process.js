const mongoose = require("mongoose");


const ProcessSchema = new mongoose.Schema({
    _id: String,
    yearOfRegistration: String,
    processNumber: String,
    instance: String
});

module.exports = ProcessSchema;