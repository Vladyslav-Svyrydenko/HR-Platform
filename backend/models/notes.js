const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notesSchema = new Schema({
  Todo: Array,
  Doing: Array,
  Done: Array,
  hr: {
    type: Schema.Types.ObjectId,
    ref: "HR",
  },
});

module.exports = mongoose.model("note", notesSchema, "note");
