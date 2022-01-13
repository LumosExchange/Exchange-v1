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

//Change this to randomly generate salt
const saltRounds = 10;

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
name: "LumosExchange"
})

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

  db.query(
    "SELECT * FROM sale WHERE (userID) = (?)",
    [id],
    (err, result) => {
      res.send(result);
      console.log(err);

    }
  );
});


//get Sales for buyers this will eventually take parameters to specify the types of payments from the seller
app.get("/getAllListings", (req, res) => {
  db.query(
    "SELECT * FROM sale",
    (err, result) => {
      res.send(result);
      console.log(err);
    
  
    }
  );


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
app.get("/getSecret", (req, res)=> {
var secret = speakeasy.generateSecret({
  name: "Lumos Exchange"
})

console.log(secret);

qrcode.toDataURL(secret.otpauth_url, function (err, data){
 res.send(data);
 res.send(secret.base32);

})
});
  

app.post("/VerifyGoogle2FA", (req, res)=> {

//Get 6 digit passcode from user & get base32 


  speakeasy.totp.verify({
    secret: "",
    encoding: "base32",
    token: "000000"
  })
})



//app.get('/', (req, res)=> {

//});

app.listen(3001, () => {
  console.log("running on port 3001");
});
