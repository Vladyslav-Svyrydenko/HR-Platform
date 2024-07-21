const express = require("express");
const router = express.Router();
const HRTest = require("../../models/hrTest");

router.post("/addHrTest", async (req, res) => {
  try {
    const hr = new HRTest(req.body);
    await hr.save();

    //return new book object, after saving it to Publisher
    res.status(200).json({ success: true, data: hr });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/updateHrTest", async (req, res) => {
  console.log(req.body);
  try {
    const tt = await HRTest.findByIdAndUpdate({ _id: req.body._id }, req.body, {
      new: true,
    });

    //return new book object, after saving it to Publisher
    res.status(200).json({ success: true, data: tt });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const hrs = await HRTest.find();

    //return new book object, after saving it to Publisher
    res.status(200).json({ success: true, data: hrs });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete("/deleteTest/:id", function (req, res) {
  console.log("deleteing a Test ");
  HRTest.findOneAndDelete(req.params.id, function (err, deleteTest) {
    if (err) {
      res.send("error deleting test");
    } else {
      res.json(deleteTest);
    }
  });
});

router.put("/updateHRQuuestion", async (req, res) => {
  console.log("herreee", req.body);
  try {
    const tt = await HRTest.findByIdAndUpdate(
      { _id: req.body._id },
      { $push: { questions: req.body.question } },
      { new: true }
    );

    //return new book object, after saving it to Publisher
    res.status(200).json({ success: true, data: tt });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/questions/:id", async (req, res) => {
  try {
    const hr = await HRTest.findOne({ _id: req.params.id });

    //return new book object, after saving it to Publisher
    res.status(200).json({ success: true, data: hr.questions });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete("/deleteQuestion/:id/:idqte", function (req, res) {
  HRTest.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { questions: { _id: req.params.idqte } } },
    function (err, item) {
      res.status(200).json({ success: true, message: err, data: item });
    }
  );
});

module.exports = router;
