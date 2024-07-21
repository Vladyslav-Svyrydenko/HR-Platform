const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ElearningTestSchema = new Schema({
  title: String,
  description: String,
  type: String,
  tags: Array,
  result: Number,
  category: String,
  // Candidate: [{ type: mongoose.Schema.ObjectId, ref: "Candidate" }],
});

module.exports = mongoose.model(
  "ElearningTest",
  ElearningTestSchema,
  "JoElearningTests"
);
