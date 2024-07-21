const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  fullName: String,
  profilePhoto: String,
  birthday: Date,
  phoneNumber: String,
  location: String,
  /*region*/
  region: String,
  /*college*/
  education: String,
  /*speciality*/
  background: Array,
  experience: {
    /*  jobtitle: String,
    company: String,
    starting_date: Date,
    ending_date: Date,
    description: String,
    */
  },

  aboutMe: String,
  states: String,
  skills: Array,
  SubmittedJobs: Array,
  ratio: Number,
  teamStatus: Boolean,
  cv: String,
  title: String,
  HR_viewed: [{}],
  status: Boolean,
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
      ref: "candidateTest",
    },
  ],
  teams: 
    {
      type: Schema.Types.ObjectId,
      ref: "teams",
    },
  
});

module.exports = mongoose.model("Candidate", candidateSchema, "Candidate");
