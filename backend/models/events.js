const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventsSchema = new Schema({
  eventName: String,
  eventDate: {
    type: Date,
    default: Date.now,
  },
  description: String,
  file: String,
  teams: [{
    type: Schema.Types.ObjectId,
    ref: "teams",
  }],

});
module.exports = mongoose.model("event", eventsSchema, "event");
