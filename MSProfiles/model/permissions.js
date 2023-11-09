const mongoose = require("mongoose");

const permissionsSchema = new mongoose.Schema({
    permission_id: String,
});

module.exports = permissionsSchema;