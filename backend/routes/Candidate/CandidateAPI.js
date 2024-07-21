const express = require("express");
var ObjectId = require("mongodb").ObjectID;

const router = express.Router();
const Candidate = require("../../models/candidat");
const User = require("../../models/user");
const uuid = require("uuid").v4;
const path = require("path");

const multer = require("multer");

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post(
  "/addCandidate",
  upload.single("profilePhoto"),
  async (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");

    try {
      const candidate = new Candidate({
        user: req.body.user,
        fullName: req.body.fullName,
        profilePhoto: url + "/public/" + req.file.filename,
        birthday: req.body.birthday,
        phoneNumber: req.body.phoneNumber,
        education: req.body.education,
        location: req.body.location,
        region: req.body.region,
        background: req.body.background,
        experience: req.body.experience,
        aboutMe: req.body.aboutMe,
        states: req.body.states,
        skills: req.body.skills,
        SubmittedJobs: req.body.SubmittedJobs,
        ratio: req.body.ratio,
        teamStatus: req.body.teamStatus,
        cv: req.body.cv,
        HR_viewed: req.body.HR_viewed,
        title: req.body.title,
        jobs: req.body.jobs,
        events: req.body.events,
        tests: req.body.tests,
        teams: req.body.teams,
      });
      console.log("herreeeeeeeeee", req.body);

      candidate.save();
      console.log("aaaaaaaaaaaaaaaaaa", Candidate);
      const user = await User.findById({ _id: candidate.user });
      console.log(user);
      const email = user.email;
      const username = user.username;

      res.status(200).json({
        success: true,
        data: candidate,
        email: email,
        username: username,
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
);
router.get("/all", function (req, res) {
  Candidate.find(function (err, Candidate) {
    res.json(Candidate);
  });
});

//Update Event
router.put("/updateCandidate/:id", function (req, res) {
  console.log("update Candidate");
  const id = req.params.id;
  console.log("iddddd", id);

  Candidate.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      console.log("dta", data);
      if (!data) {
        res.status(404).send({
          message: `Cannot update Candidate with id=${id}. Maybe Candidate was not found!`,
        });
      } else {
        res.status(200).json({
          success: true,
          data: data,
        });
      }
    })
    .catch((err) => {
      console.log("errrrr", err);
      res.status(500).send({
        message: "Error updating Candidate with id=" + id,
      });
    });
});
router.put("/updateHRVIEW/:id", function (req, res) {
  console.log("update Candidate");
  const id = req.params.id;
  console.log("iddddd", id);

  Candidate.findByIdAndUpdate(
    id,
    { $push: { HR_viewed: req.body.HR_viewed } },
    {
      useFindAndModify: false,
    }
  )
    .then((data) => {
      console.log(req.body.HR_viewed);
      console.log("dta", data);
      if (!data) {
        res.status(404).send({
          message: `Cannot update Candidate with id=${id}. Maybe Candidate was not found!`,
        });
      } else {
        res.status(200).json({
          success: true,
          data: data,
        });
      }
    })
    .catch((err) => {
      console.log("errrrr", err);
      res.status(500).send({
        message: "Error updating Candidate with id=" + id,
      });
    });
});

router.get("/fetch/:id", function (req, res) {
  Candidate.findById(req.params.id, async (err, Candidate) => {
    if (!Candidate) {
      res.status(404).send("No result found");
    } else {
      const user = await User.findById({ _id: Candidate.user });
      const email = user.email;
      res.status(200).json({ Candidate: Candidate, Email: email });
    }
  });
});

router.get("/fetchtext/:text", function (req, res) {
  Candidate.find({ skills: req.params.text }, async (err, Candidate) => {
    if (!Candidate) {
      res.status(404).send("No result found");
    } else {
      res.status(200).json({ Candidate: Candidate });
    }
  });
});

module.exports = router;
