const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Jobs = require("../models/jobs");
const hr = require("../models/hr");
var stringSimilarity = require("string-similarity");

const candidate = require("../models/candidat");
const ContentBasedRecommender = require("content-based-recommender");
const { include } = require("underscore");

router.get("/jobs", function (req, res) {
  console.log("Get request for all jobs");
  Jobs.find({}).exec(function (err, jobs) {
    if (err) {
      console.log("error jobs");
    } else {
      res.json(jobs);
    }
  });
});

router.post("/add_HR", function (req, res) {
  console.log("postHR");
  var newHR = new hr();

  newHR.fullName = req.body.fullName;
  console.log(newHR.fullName);

  newHR.save(function (err, insertedHR) {
    if (err) {
      console.log("Error saving  hr");
    } else {
      res.json(insertedHR);
      console.log(insertedHR);
    }
  });
});

router.get("/hr", function (req, res) {
  console.log("Get request for all hr");
  hr.find({}).exec(function (err, hr) {
    if (err) {
      console.log("error jobs");
    } else {
      res.json(hr);
    }
  });
});

router.get("/job/:id", function (req, res) {
  console.log("Get request single job");
  Jobs.findById(req.params.id).exec(function (err, job) {
    if (err) {
      console.log("error job");
    } else {
      res.json(job);
    }
  });
});

router.get("/jobs/:id", function (req, res) {
  console.log("Get request  jobs by hr");
  hr.findById(req.params.id)
    .populate({
      path: "jobs",
    })
    .select("jobs -_id")

    .exec(function (err, jobs) {
      if (err) {
        console.log("error jobs");
      } else {
        res.json(jobs);
      }
    });
});

router.post("/add/:id", async (req, res) => {
  console.log(req.params);
  let user = req.params;
  let idUser = user.id;
  const all = await Jobs.find({}).sort({ _id: -1 }).limit(1);

  for (var i in all) {
    console.log("all", all[i].id);
  }
  var hrUser = await hr.findById(idUser);
  var company = hrUser.company;

  var _id = all[i].id + 1;

  const { title, description, salary, requirement } = req.body;
  const job = await Jobs.create({
    _id,
    title,
    description,
    salary,
    requirement,
    company,
  });
  await job.save();

  const userById = await hr.findById(idUser);

  userById.jobs.push(job);
  await userById.save();
  console.log("hrrrrr");
  return res.send(userById);
});

router.post("/submit/:id/:ide", async (req, res) => {
  console.log(req.params);
  let user = req.params;
  let id = user.id;
  let ide = user.ide;

  const job = await Jobs.findById(ide);
  const cand = await candidate.findById(id);
  const c = await candidate.findById(id);

  var test = [];
  for (let i in cand.SubmittedJobs) {
    test.push(cand.SubmittedJobs[i]._id);
  }
  console.log(test);

  if (test.includes(job._id)) {
    console.log("job already exist");
    res.send("job already exist");
  } else {
    cand.SubmittedJobs.push(job);
    cand.save();

    job.candidateSubmit.push(c);
    job.save();

    res.send("job not exist");
    console.log("not exist");
  }
});

router.get("/submittedJobs/:id", function (req, res) {
  console.log("Get request  Applied jobs ");

  console.log(req.params);
  let user = req.params;
  let id = user.id;
  candidate
    .findById(id)

    .select("SubmittedJobs")

    .exec(function (err, jobs) {
      if (err) {
        console.log("error Submitted jobs");
      } else {
        res.json(jobs);
      }
    });
});

router.get("/submittedCandidates/:id", function (req, res) {
  console.log("Get request  candidate jobs applied ");

  console.log(req.params);
  let user = req.params;
  let id = user.id;
  Jobs.findById(id)
    .populate({
      path: "candidateSubmit",
    })
    .select("candidateSubmit")

    .exec(function (err, cands) {
      if (err) {
        console.log("error candidateSubmit jobs");
      } else {
        res.json(cands);
      }
    });
});

router.put("/job/:id", function (req, res) {
  console.log("update a job");
  Jobs.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        salary: req.body.salary,
        requirement: req.body.requirement,
      },
    },

    {
      new: true,
    },
    function (err, updatedJob) {
      if (err) {
        res.send("Error updating Job");
      } else {
        res.json(updatedJob);
        console.log("update success");
      }
    }
  );
});

router.delete("/deleteJob/:id", function (req, res) {
  console.log("deleteing a job ");
  Jobs.findOneAndDelete(req.params.id, function (err, deleteJob) {
    if (err) {
      res.send("error deleting Job");
    } else {
      res.json(deleteJob);
    }
  });
});

router.post("/post", function (req, res) {
  // router.post('/post',function(req,res){

  console.log("post a post");
  var newPost = new Jobs();

  newPost.title = req.body.title;

  // newPost.date = req.body.Date.now();

  newPost.save(function (err, insertedPost) {
    if (err) {
      console.log("Error saving  post");
    } else {
      res.json(insertedPost);
      console.log(insertedPost);
    }
  });
});

router.get("/similarJobs/:id", async (req, res) => {
  const recommender = new ContentBasedRecommender({
    minScore: 0.1,
    maxSimilarDocuments: 100,
  });
  let id = req.params.id;

  var similar = [];
  console.log(typeof id);
  const documents = await Jobs.find({}, { _id: 1, requirement: 1 });

  console.log(documents);

  recommender.train(documents);

  const similarJobs = recommender.getSimilarDocuments(id, 0, 10);
  console.log(similarJobs);

  for (let i in similarJobs) {
    console.log(similarJobs[i]);
    var Sjob = await Jobs.findById(similarJobs[i].id);
    console.log(Sjob);
    similar.push(Sjob);
  }
  console.log("Get  Similar jobs");
  var similarity = stringSimilarity.compareTwoStrings("heal", "healed");
  console.log("similarit", similarity);
  res.send(similar);
});

router.get("/match/:id/:idc", async (req, res) => {
  let id = req.params.id;

  let idc = req.params.idc;

  const job = await Jobs.findById(id, { _id: 1, requirement: 1 });
  const cand = await candidate.findById(idc).select("skills.value");
  console.log(job.requirement);
  let skill = cand.skills;
  var arr = skill.map(function (obj) {
    return obj.value;
  });
  console.log(arr.toString());

  var similarity = stringSimilarity.compareTwoStrings(
    job.requirement,
    arr.toString()
  );

  if (job.requirement.toString().includes(arr.toString().replace(/,/g, " "))) {
    console.log("include");
    similarity = 1;
  } else console.log("not included");
  console.log("jobs", typeof arr.toString());

  console.log("similarit", similarity);
  res.json(similarity);
});

router.get("/rec/:id", async (req, res) => {
  let userID = req.params.id;
  const cand = await candidate.findById(userID);
  const skill = cand.skills;

  var arr = skill.map(function (obj) {
    return obj.value;
  });

  console.log("arr", arr);

  const jobs = await Jobs.find({}, { _id: 1, requirement: 1 });
  console.log(jobs);

  const recommendeer = new ContentBasedRecommender();

  recommendeer.trainBidirectional(jobs, skill);

  for (let job of jobs) {
    var relatedTags = recommendeer.getSimilarDocuments(jobs.id);
    console.log(job.requirement, "related tags:", skill);
  }
  var table = [];
  console.log(relatedTags);
  for (let i in relatedTags) {
    var Sjob = await Jobs.findById(relatedTags[i].id).select(
      "title salary description requirement"
    );
    console.log(Sjob);

    table.push(Sjob);
  }

  console.log(table);
  console.log("Get  recommended jobs");
  res.send(table);
});

module.exports = router;
