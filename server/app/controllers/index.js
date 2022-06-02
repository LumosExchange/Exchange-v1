const bcrypt = require("bcrypt");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

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

const register = async (req, res) => {
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
};

const getUserInfo = async (req, res) => {
  const id = req.session.user[0].userID;
  db.query("SELECT * FROM userInfo WHERE", [], (err, result) => {});
  res.send("this function is not implemented");
};

const login = async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE userName = ?",
    userName,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (response) {
            //create session
            req.session.user = result;

            const id = result[0].id;

            //replace jwtsecret with env file
            const token = jwt.sign({ id }, "JWTSECRET", {
              expiresIn: 300,
            });

            req.session.user = result;

            console.log(req.session.user);
            res.json({ auth: true, token: token, result: result });
          } else {
            res.send({
              auth: false,
              message: "Wrong username / password combination",
            });
          }
        });
      } else {
        res.json({ auth: false, message: "No user Exists" });
      }
    }
  );
};

const checkLogin = async (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

const logout = async (req, res) => {
  req.session.destroy();
  req.session = null;
  res.send("User logged out");
};

module.exports = { register, login, checkLogin, logout, getUserInfo };
