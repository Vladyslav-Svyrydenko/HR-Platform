const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const morgan = require("morgan");
const router = express.Router();
const Role = require("../backend/models/Role");
const db = require("../backend/models");
const candidate = require("./routes/Candidate/CandidateAPI");
const hr = require("./routes/HR/HRAPI");
const hrTest = require("./routes/HR/HRTEST");
const response = require("./routes/Candidate/responseApi");

const dbConfig = require("./config/DBconfig");
const cv = require("./cv/app");
const multer = require("multer");
const job = require("./routes/JobsAPI");
var http = require("http");
var debug = require("debug")("server:server");
var connectIo = require("./chatbotService");
var socket = require("socket.io");
const eventsmodel = require("./Controllers/events/eventController");
const teams = require("./Controllers/teams/teamsController");

var logger = require("morgan");

var cookieParser = require("cookie-parser");
var callback = require("./routes/callback");
const app = express();

const { Chat } = require("./models/chat");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use("/job", job);
app.use("/cv", cv);
app.use("/events", eventsmodel);
app.use("/teams", teams);
// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
require("../backend/routes/User/auth")(app);
require("../backend/routes/User/userRoute")(app);
require("./routes/User/auth")(app);
require("./routes/User/userRoute")(app);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var dir = path.join(__dirname, "public");

app.use("/public", express.static(dir));
console.log(__dirname);
app.use("/candidate", candidate);
app.use("/hr", hr);
app.use(express.static(path.join(__dirname, "../build")));
app.use("/callback", callback);
app.get("/linkedin", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});
app.use("/response", response);
app.use("/hrTest", hrTest);

const userRouter = require("./routes/Test/user");
const testRouter = require("./routes/Test/test");
app.use("/api/user", userRouter);
app.use("/api/test", testRouter);

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
console.log("storageeeeeeeeeeeeeeeeeeee", storage);
var upload = multer({ storage: storage });
app.get("/", function (req, res) {
  res.send("Hello HR HUB");
});
app.post("/uploadfile", upload.single("file"), (req, res, next) => {
  console.log("first file upload");
  const file = req.file;
  console.log("first file upload", file);
  const error = new Error("Please upload a file");
  if (!file) {
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});
app.get("/file/:image", function (req, res) {
  console.log(__dirname + "/public/" + req.params.image);
  res.sendFile(__dirname + "/public/" + req.params.image);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.render("error");
});

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

module.exports = router;
