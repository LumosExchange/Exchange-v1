const express = require("express");
const router = express.Router();
const fs = require("fs");
const bcrypt = require("bcrypt");
const mysql = require("mysql");

const { checkLogin, logout } = require("../controllers/index");

//Change this to randomly generate salt
const saltRounds = 10;

const db = mysql.createPool({
  connectionLimit: 100,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
});

router.post("/register", (req, res) => {
  const firstName = req.body.firstName;

  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const userName = req.body.userName;
  const date = new Date();

  const theme = "Dark";
  const timezone = "UTC+0";
  const currency = "GBP";
  const accountLevel = "Standard";

  //hash password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      res.send({ err });
    } else {
      db.query(
        "INSERT INTO users (firstName, lastName, email, password, userName, registeredDate) VALUES (?,?,?,?,?,?)",
        [firstName, lastName, email, hash, userName, date],
        (err, result) => {
          console.log(err);
        }
      );
      db.query(
        "INSERT INTO userSettings (theme, timezone, currency) VALUES (?,?,?)",
        [theme, timezone, currency],
        (err, result) => {
          console.log(err);
        }
      );
      db.query(
        "INSERT INTO accountLevel (accountLevel, dateUpgraded) VALUES (?,?)",
        [accountLevel, date],
        (err, result) => {
          console.log(err);
        }
      );
      db.query(
        "INSERT INTO userAuth (Email, emailVerified, SMS, google, googleSecret, Authy, phoneNumber) VALUES (?,?,?,?,?,?,?)",
        [email, 0, 0, 0, 0, 0, "0"],
        (err, result) => {
          console.log(err);
        }
      );
      db.query(
        "INSERT INTO userPaymentAccounts (EUBank, UKBank, InterBank, Paypal, Skrill) VALUES (?,?,?,?,?)",
        [0, 0, 0, 0, 0],
        (err, result) => {
          console.log(err);
        }
      );
      res.send({
        registered: true,
      });
    }
  });
});

//Login functionality
//check logged in state
router.get("/login", checkLogin);

router.post("/logout", logout);

module.exports = router;
