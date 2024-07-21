const { stringify } = require("querystring");

const express = require("express"),
  router = express.Router(),
  fs = require("fs"),
  parseIt = require("../utils/parseIt"),
  multer = require("multer"),
  upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "cv/uploads/");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    }),
  });
let dataPath = "";
var data = "";
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/post", upload.single("upl"), function (req, res, next) {
  console.log("success");
  console.log(req.file.path);
  parseIt.parseResume(req.file.path, "cv/compiled");
  res.status(204).end();
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "cv/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var uploade = multer({ storage: storage }).single("file");

router.all("/upload", function (req, res) {
  uploade(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    parseIt.parseResume(req.file.path, "cv/compiled");
    console.log("filename", req.file.filename);
    return res.status(200).send(req.file);
  });
  console.log(req.file);
  // READ
});
dataPath = "cv/compiled/ErnaniJoppert P Martins.pdf.json";
console.log("rrer");
router.get("/data", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.log("error");
    }

    res.send(JSON.parse(data));
  });
});

module.exports = router;
