const express = require("express");
const router = express.Router();
const HR = require("../../models/hr");
const User = require("../../models/user");

router.post("/addHR", async (req, res) => {
  try {
    const hr = new HR(req.body);
    await hr.save();
    const user = await User.findById({ _id: hr.user });

    //return new book object, after saving it to Publisher
    res.status(200).json({ success: true, data: hr });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/updateHR", async (req, res) => {
  console.log(req.body);
  try {
    const tt = await HR.findByIdAndUpdate({ _id: req.body._id }, req.body, {
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
    const hrs = await HR.find();

    //return new book object, after saving it to Publisher
    res.status(200).json({ success: true, data: hrs });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
router.get("/fetch/:id", function (req, res) {
  HR.findById(req.params.id, async (err, HR) => {
    if (!HR) {
      res.status(404).send("No result found");
    } else {
      const user = await User.findById({ _id: HR.user });

      res.status(200).json({ hr: HR });
    }
  });
});

module.exports = router;
