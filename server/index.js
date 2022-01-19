const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const Nexmo = require("nexmo");
const nodemailer = require("nodemailer");
const SMTPPool = require("nodemailer/lib/smtp-pool");

require("dotenv").config();

//Change this to randomly generate salt
const saltRounds = 10;

//create nexmo request
const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_KEY,
});

//needed to avoid cors errors
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

app.use(
  cors({
    origin: ["http:localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "generateARandomSentenceHere",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expries: 60 * 60 * 1,
    },
  })
);

//Initiate Imports
app.use(express.json());

//initiate 2fa speakeasy for google auth
var secret = speakeasy.generateSecret({
  name: "LumosExchange",
});

// Connection deatils for DB
const db = mysql.createConnection({
  host: "sql4.freemysqlhosting.net",
  user: "sql4453277",
  password: "YC9x3dNeWI",
  database: "sql4453277",
});

//Register
app.post("/register", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const nationality = req.body.nationality;

  //hash password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO users (firstName, lastName, email, password, nationality) VALUES (?,?,?,?,?)",
      [firstName, lastName, email, hash, nationality],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

//Login functionality
//check logged in state
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

//create JWT aauth
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Token needed");
  } else {
    jwt.verify(token, "JWTSECRET", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "You failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

//check authentication
app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("Authenticated");
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
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
  });
});

//Create sell functionality

app.post("/sell", (req, res) => {
  const amountForSale = req.body.amountForSale;
  const aboveOrBelow = req.body.aboveOrBelow;
  const change = req.body.change;

  const id = req.session.user[0].userID;

  db.query(
    "INSERT INTO sale (userID, amountForSale, aboveOrBelow, percentChange) VALUES (?,?,?,?)",
    [id, amountForSale, aboveOrBelow, change],

    (err, result) => {
      console.log(err);
    }
  );
});

//Get users open listings
app.get("/getListings", (req, res) => {
  const id = req.session.user[0].userID;

  db.query("SELECT * FROM sale WHERE (userID) = (?)", [id], (err, result) => {
    res.send(result);
    console.log(err);
  });
});

//get Sales for buyers this will eventually take parameters to specify the types of payments from the seller
app.get("/getAllListings", (req, res) => {
  db.query("SELECT * FROM sale", (err, result) => {
    res.send(result);
    console.log(err);
  });
});

//get userID name
app.get("/getUserName", (req, res) => {
  let params = req.query.sellerID;
  db.query(
    "SELECT * FROM users WHERE (userID) = (?)",
    [params],
    (err, result) => {
      res.send(result);
    }
  );
});

app.get("/getUserFeedback", (req, res) => {
  let params = req.query.sellerID;
  console.log("ID = " + params);
  db.query(
    "SELECT * FROM Feedback WHERE (saleUserID) = (?)",
    [params],
    (err, result) => {
      res.send(result);
    }
  );
});

//creates secret for 2fa app
app.post("/getSecret", (req, res) => {
  var secret = speakeasy.generateSecret({
    name: "Lumos Exchange",
  });
  console.log("secret is: " + secret);
  res.send(secret);
});

app.get("/VerifyGoogle2FA", (req, res) => {
  //Get 6 digit passcode from user & get base32
  secret = req.query.secret;

  token = req.query.passcode;

  console.log("Secret: " + secret + " Token is: " + token);

  var verified = speakeasy.totp.verify({
    secret: secret,
    encoding: "base32",
    token: token,
  });

  console.log("user is verfiedd: " + verified);
  res.send(verified);
});

//maybe chnage this to post
app.get("VonageSMSRequest", (req, res) => {
  //verify the user has specified a number
  if (!req.body.number) {
    res
      .status(400)
      .send("You must supply a phone number to get a verification code");
    return;
  }
  //Send request to Vonage Servers
  nexmo.verify.request(
    {
      number: req.body.number,
      brand: "Lumos Exchange",
      code_length: "6",
    },
    (err, result) => {
      if (err) {
        //if error let the user know
        res.status(500).send(err.error_text);
        return;
      }
      //send back request ID as need for the verify step
      const requestId = result.request_id;
      res.send(requestId);
    }
  );
});

app.get("VonageSMSVerify", (req, res) => {
  //user needs to send request id and code for authetication

  if (!requestId || !userCode) {
    res.status(400).send("You must supply a code");
    return;
  }

    //Pass details to vonage servers for validation
  nexmo.verify.check(
    {
      request_id: req.body.requestId,
      code: req.body.code,
    },
    (err, result) => {
      if (err) {
        res.status(500).send(err.error_text);
        return;
      }
      res.send(result);
    }
  );
});

app.post("/Send_Email_Verification", cors(), async (req, res) => {
//Get email from user and pass 6 digit code

let {text} = "111111"

  //Pass connection details to Emailer API from ENV 
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.emv.MAIL_PASS
    }

  })

  //Send email 
  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: req.body.email,
    subject: "Lumos Email Verification",
    html: `<div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px; 
    ">
    <h2>Here is your verification code!</h2>
    <p>${text}</p>
     </div>
`
  })

})


//app.get('/', (req, res)=> {

//});

app.listen(3001, () => {
  console.log("running on port 3001");
});
