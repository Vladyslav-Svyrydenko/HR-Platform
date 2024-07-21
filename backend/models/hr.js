const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const hrSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  fullName: String,
  profilePhoto: String,
  birthday: Date,
  phoneNumber: Number,
  location: String,
  company: String,
  companyLogo: String,
  companyPhotos: String,

  jobs: [
    {
      type: Schema.Types.Number,
      ref: "job",
    },
  ],
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "event",
    },
  ],

  tests: [
    {
      type: Schema.Types.ObjectId,
      ref: "hrTest",
    },
  ],

  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "note",
    },
  ],

  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "teams",
    },
  ],
});

module.exports = mongoose.model("HR", hrSchema, "HR");
