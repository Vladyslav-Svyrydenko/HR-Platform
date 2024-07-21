const hrTest = require("../../models/hrTest");
const teamsmodel = require("../../models/hrTest");
//const dbe = require("../../config/DBconfig.js");

module.exports = {

  create: function (req, res) {
    console.log("postHR");
    var newEv = new hrTest(req.body);
    newEv.save(function (err, item) {
      if (err) {
        console.log("Error Add ",err);
        res.json({status:"error", message: ".....", data:null});
      } else {
        res.json({status:"success", message: "+ GOAL +", data:item});
      }
    });
  },

  update: function (req, res) {
    hrTest.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function(err,item){
      if (err) {
        console.log("Nop",err);
        res.json({status:"error", message: "Nop", data:null});
      } else {
        res.json({status:"success", message: "Updated <3", data:item});
      }
       
    })
  },
  updateQuestion: function (req, res) {
    hrTest.findByIdAndUpdate({_id:req.params.id},{ $push: { questions: req.body } },{new:true},function(err,item){
      if (err) {
        console.log("Nop",err);
        res.json({status:"error", message: "Nop", data:null});
      } else {
        res.json({status:"success", message: "Updated <3", data:item});
      }
       
    })
  },

  delete: function (req, res) {
    hrTest.findByIdAndDelete({_id:req.params.id},function(err,item){
      if (err) {
        console.log("Error",err);
        res.json({status:"error", message: "Nop for Delete", data:null});
      } else {
        res.json({status:"success", message: "Bye <3", data:item});
      }
      
    })
  },

  findAll: function (req, res) {
    console.log("Get All Events");
    hrTest.find({}).exec(function (err, items) {
      if (err) {
        console.log("Error",err);
        res.json({status:"error", message: "Nop", data:null});
      } else {
        res.json({status:"success", message: "All <3", data:items});
      }
    });
  },


};
