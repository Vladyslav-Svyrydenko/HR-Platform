const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const responseSchema = new Schema({
 
    response:String,
  hrTest: {
    type: Schema.Types.ObjectId,
    ref: "hTest",
  },
  candidat: {
    type: Schema.Types.ObjectId,
    ref: "Candidate",
  }
});

module.exports = mongoose.model("response", responseSchema);
