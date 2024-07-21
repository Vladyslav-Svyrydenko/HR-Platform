const teamsmodel = require("../../models/teams.js");
const candmodel = require("../../models/candidat.js");
const express = require("express");
const router = express.Router();
const candidate = require("../../models/candidat")


//Add team
router.post("/addTeams", async (req, res) => {
  
  const teamName = req.body.teamName;
  const participantNumber = req.body.participantNumber;
  const description = req.body.description;

  const t = new teamsmodel({
      teamName: teamName, 
      participantNumber: participantNumber, 
      description: description
  });

  try {
      await t.save();
      res.json(t);
      console.log("Team ++");
  }catch(err){
      console.log("Error to add team");
  }

});

//Affect Candidate to Team
router.post("/affect/:id/:idt", async(req,res)=>{

let id = req.params.id;
let idt = req.params.idt;


const cand = await candidate.findById(id).populate({
  path: "candidate",
})
.select("fullName");
const team = await  teamsmodel.findById(idt);

team.candidate.push(cand);


team.save();
console.log("candidate affect");
res.json("candidate affect ");

})

//View All teams
router.get("/allteams", function (req,res) {
  console.log("Get all Teams");
  teamsmodel.find({}).exec(function (err, t) {
    if (err) {
      console.log("Error View All teams ");
    } else {
      res.json(t);
    }
  });
});

//View All Cand
router.get("/allcand", function (req,res) {
  console.log("Get all Teams");
  candmodel.find({}).exec(function (err, t) {
    if (err) {
      console.log("Error ");
    } else {
      res.json(t);
    }
  });
});

//Update team
router.put("/updateTeam/:id", function (req, res) {
    
    teamsmodel.findByIdAndUpdate(req.params.id,
      {
        $set: {
          teamName: req.body.teamName,
          participantNumber: req.body.participantNumber,
          description: req.body.description
        },
      },
  
      {
        new: true,
      },
      function (err, updated) {
        if (err) {
          res.send("Error updating");
        } else {
          res.json(updated);
          console.log("Team updated ++");
        }
      }
    );
  });

  
//Get Candidats by teams
router.get("/teamCand/:id", async(req,res)=>{

  let id = req.params.id;

    const team = await teamsmodel.findById(id).populate({
      path: "candidate",
    }).select("candidate");

    res.json(team)

})



//Delete team
  router.delete("/deleteTeam/:id", function (req, res) {

    console.log("Team deleted -- ");
    teamsmodel.findOneAndDelete(req.params.id, function (err, deleted) {
      if (err) {
        res.send("error deleting");
      } else {
        res.json(deleted);
      }
    });

  });


module.exports = router;

