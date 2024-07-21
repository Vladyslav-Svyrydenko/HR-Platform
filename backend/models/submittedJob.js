const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const submitJobSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },

  status: String,

  hr: {
    type: Schema.Types.ObjectId,
    ref: "HR",
  },

  candidate: {
    type: Schema.Types.ObjectId,
    ref: "Candidate",
  },
});

module.exports = mongoose.model("Sub", submitJobSchema, "Sub");
