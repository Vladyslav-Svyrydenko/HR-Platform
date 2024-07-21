const eventsmodel = require("../../models/events.js");
const teamsmodel = require ("../../models/teams.js");
const express = require("express");
const router = express.Router();

//Add Event
router.post("/addEvents", async (req, res) => {
try {

  const ev = new eventsmodel({
      eventName: req.body.eventName, 
      eventDate: req.body.eventDate, 
      description: req.body.description,
      file: req.body.file,
      //teams: req.body.teams,
  });

      ev.save();
      res.json(ev);
      
      console.log("Event ++");
  }catch(err){
      console.log("Error to add event");
  }

});

//View All Events
router.get("/allEvents", function (req,res) {
  console.log("Get all events");
  eventsmodel.find({}).exec(function (err, ev) {
    if (err) {
      console.log("Error View All Events ");
    } else {
      res.json(ev);
    }
  });
});

//Update Event
router.put("/updateEvent/:id", function (req, res) {
    console.log("update Event");
    eventsmodel.findByIdAndUpdate(req.params.id,
      {
        $set: {
          eventName: req.body.eventName,
          eventDate: req.body.eventDate,
          description: req.body.description,
          file: req.body.file,
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
          console.log("Event updated ++");
        }
      }
    );
  });


//Delete Event
  router.delete("/deleteEvent/:id", function (req, res) {

    console.log("Event deleted -- ");
    eventsmodel.findOneAndDelete(req.params.id, function (err, deleted) {
      if (err) {
        res.send("error deleting");
      } else {
        res.json(deleted);
      }
    });

  });

//Affect Candidate to Team
router.post("/affectTeam/:idt/:id", async(req,res)=>{

  let id = req.params.id;
  let idt = req.params.idt;
  
  
  const tt = await teamsmodel.findById(idt)
            .populate({ path: "candidate",})
            .select("teamName");

  const ev = await  eventsmodel.findById(id);
  
  ev.teams.push(tt);
  ev.save();
 
  console.log("Team affect to Event");
  res.json("Team affect to Event ");
  
  })

//Get Team by Events
router.get("/teamEvent/:id", async(req,res)=>{

  let id = req.params.id;

    const ev = await eventsmodel.findById(id)
              .populate({ path: "teams",})
              .select("teams");

    res.json(ev)

})





module.exports = router;

