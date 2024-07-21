const { verifySignUp } = require("../../middlewares");
const controller = require("../../Controllers/user/auth");
const candidat = require("../../models/candidat");
const hrmodel = require("../../models/hr");
const db = require("../../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../../config/auth");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", async (req, res) => {
    try {
      let [candidate, user, hr] = await new Promise((resolve, reject) => {
        User.findOne({
          username: req.body.username,
        })
          .populate("roles", "-__v")
          .exec((err, user) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            if (!user) {
              return res.status(404).send({ message: "User Not found." });
            }
            console.log("useerrr", user);
            var passwordIsValid = bcrypt.compareSync(
              req.body.password,
              user.password
            );

            if (!passwordIsValid) {
              return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
              });
            }
            const hr = hrmodel.findOne({ user: user }).exec((err, hr) => {
              const candi = candidat
                .findOne({ user: user })
                .exec((err, candidate) => {
                  //RESOLVE YOUR CANDIDATE
                  resolve([candidate, user, hr]);
                });
            });
            var token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: 86400, // 24 hours
            });

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
              authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
          });
      });
      res.status(200).send({
        candidate,
        user,
        hr,
      });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  });
};
