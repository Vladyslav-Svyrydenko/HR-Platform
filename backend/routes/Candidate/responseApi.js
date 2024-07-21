const express = require("express");
const router = express.Router();
const ResponseTest = require("../../models/ResponseTest");


router.post("/addResponseTest", async (req, res) => {
  try {
    const candidateResponse = new ResponseTest(req.body);
    await candidateResponse.save();

    //return new book object, after saving it to Publisher
    res.status(200).json({ success: true, data: candidateResponse });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/updateCandateTest", async (req, res) => {

   console.log(req.body)
  try {
   const tt= await ResponseTest.findByIdAndUpdate({_id:req.body._id},req.body,{new:true});

    //return new book object, after saving it to Publisher
    res.status(200).json({ success: true, data: tt });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    
    const hrs = await ResponseTest.find(); ;

    //return new book object, after saving it to Publisher
    res.status(200).json({ success: true, data: hrs });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});




router.delete("/deleteQuestion/:id/", function (req, res) {

  ResponseTest.findByIdAndUpdate({_id:req.params.id}, function (err, item) {

    res.status(200).json({ success: true, message: err,data:item });
  
  });
});

module.exports = router;
