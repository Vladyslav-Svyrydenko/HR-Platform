const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
    titre:String ,
    response:String 
})
const hrTestSchema = new Schema({
  title: String,
  description: String,
  type: String,
  tags: Array,
  result: Number,
  companyName: String,
  color: String,
  startDate: Date,
  endDate: Date,
  hr: {
    type: Schema.Types.ObjectId,
    ref: "HR",
  },
  questions:[QuestionSchema]
});

module.exports = mongoose.model("hrTest", hrTestSchema, "hrTest");
