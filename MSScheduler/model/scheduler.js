const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const LocalizationSchema = require("./localization.js");
const UserSchema = require("./user.js");
const ProcessSchema = require("./process.js");
const CourtroomSchema = require("./courtroom.js");
const ApplicantSchema = require("./applicant.js");
const InvitedGuestsSchema = require("./invitedGuests.js");

var schedulerSchema = Schema({

    localization: [LocalizationSchema],
    user: [UserSchema],
    process: [ProcessSchema],
    startDate: Date,
    finishDate: Date,
    platform: String,
    typeRequest: String,
    state: String,
    courtroom : [CourtroomSchema],
    typeVideoConference: String,
    applicant: [ApplicantSchema],
    audienceType: String,
    processNumber: String,
    receivingMedium: String,
    receivingMediumDetails: String,
    onSiteSupport: String,
    participantType: String,
    observations: String,
    destinations: String,
    invitedGuests: [InvitedGuestsSchema],
    startUrl: String,
    joinUrl: String,

    
},
    { versionKey: false });

module.exports = mongoose.model("ColScheduler", schedulerSchema);