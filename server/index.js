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
const crypto = require("crypto");
const { Console } = require("console");
const e = require("express");
const { resolveNaptr } = require("dns");
const { addAbortSignal } = require("stream");
const { Server } = require("socket.io");
const http = require("http");


require("dotenv").config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
 // console.log('user connected: ', socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log('User with ID : ', socket.id, ' joined the room: ', data );
  });
  
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
    console.log('RECIEVE MESSAGE: ', data);
    

  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

//Change this to randomly generate salt
const saltRounds = 10;

//needed to avoid cors errors
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000",
    "https://api.coingecko.com"
  );
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
  cors(
    {
      origin: ["http:localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
      optionSuccessStatus: 200,
    },
    {
      origin: ["https://api.coingecko.com"],
      methods: ["GET", "POST"],
      credentials: false,
      optionSuccessStatus: 200,
    }
  )
);

//Initiate Imports
app.use(express.json());

//app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

//initiate 2fa speakeasy for google auth
var secret = speakeasy.generateSecret({
  name: "LumosExchange",
});

// Connection deatils for DB
const db = mysql.createPool({
  connectionLimit: 100,
  host: "remotemysql.com",
  user: "zEPptCpVyR",
  password: "qmZ0jhRFE5",
  database: "zEPptCpVyR",
  multipleStatements: true,
});

//Register
app.post("/register", (req, res) => {
  const firstName = req.body.firstName;

  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const nationality = req.body.nationality;
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
    }
    db.query(
      "INSERT INTO users (firstName, lastName, email, password, nationality, userName, registeredDate) VALUES (?,?,?,?,?,?,?)",
      [firstName, lastName, email, hash, nationality, userName, date],
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
  });
});

//KYC TAB
app.post("/userInfo", (req, res) => {
  const LegalName = req.body.LegalName;
  const BirthDay = req.body.BirthDay;
  const BirthMonth = req.body.BirthMonth;
  const BirthYear = req.body.BirthYear;
  const DisplayName = req.body.DisplayName;
  const StreetAdress = req.body.StreetAdress;
  const CityTown = req.body.CityTown;
  const CityState = req.body.CityState;
  const PostCode = req.body.PostCode;
  const Country = req.body.Country;
  const Document = req.body.Document;

  db.query(
    "INSERT INTO  userInfo (legalName, birthDay, birthMonth, birthYear, displayName, streetAdress, cityTown, cityState, postCode, country, document) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    [
      LegalName,
      BirthDay,
      BirthMonth,
      BirthYear,
      DisplayName,
      StreetAdress,
      CityTown,
      CityState,
      PostCode,
      Country,
      Document,
    ],
    (err, result) => {
      console.log(err);
    }
  );
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
});

//Create sell functionality

app.post("/sell", (req, res) => {
  const amountForSale = req.body.amountForSale;
  const aboveOrBelow = req.body.aboveOrBelow;
  const change = req.body.change;
  const userName = req.session.user[0].userName;
  const id = req.session.user[0].userID;
  const payment1 = req.body.payment1;
  const payment2 = req.body.payment2;

  var sql =
    "SELECT Country AS Country FROM userInformation WHERE (userID) = (?);SELECT Town AS Town FROM userInformation WHERE (userID) = (?);SELECT saleID AS SaleID FROM TradeHistory WHERE (sellerID) = (?)";

  db.query(sql, [id, id, id], function (error, results) {
    if (error) {
      console.log(error);
    }
    db.query(
      "INSERT INTO sale (userID, amountForSale, aboveOrBelow, percentChange, userName, Country, Town, paymentMethod1, paymentMethod2, tradeHistory) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        id,
        amountForSale,
        aboveOrBelow,
        change,
        userName,
        results[0][0].Country,
        results[1][0].Town,
        payment1,
        payment2,
        results[2].length,
      ],
      (err, resultt) => {
        console.log(err);
      }
    );
  });
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

//get userID name for feedback
app.get("/getUserNameSeller", (req, res) => {
  let params = req.query.sellerID;
  db.query(
    "SELECT * FROM users WHERE (userID) = (?)",
    [params],
    (err, result) => {
      res.send(result);
    }
  );
});

//get username for navbar after user is logegd in
app.get("/getUserNameNav", (req, res) => {
  const name = req.session?.user[0].userName;
  res.send(name);
});

//get email for profile page
app.get("/getUserEmail", (req, res) => {
  const email = req.session.user[0].email;
  res.send(email);
});

app.get("/getUserSettings", (req, res) => {
  const user = req.session.user[0].userID;

  db.query(
    "SELECT * FROM userSettings WHERE (userID) = (?)",
    [user],
    (err, result) => {
      res.send(result);
    }
  );
});

//gte user account level for profile page
app.get("/getUserAccountLevel", (req, res) => {
  const user = req.session.user[0].userID;

  db.query(
    "SELECT accountLevel FROM accountLevel WHERE (userID) = (?)",
    [user],
    (err, result) => {
      res.send(result);
    }
  );
});

app.get("/getUserID" , (req, res) => {
  id = req.session.user[0].userID;
  req.send(id);
})

//update user settings
app.post("/updateUserSettings", (req, res) => {
  const theme = req.body.theme;
  const timezone = req.body.timezone;
  const currency = req.body.currency;
  const user = req.session.user[0].userID;

  db.query(
    "UPDATE userSettings SET currency = ?, timezone = ?, theme = ? WHERE userID = ?",
    [currency, timezone, theme, user],
    (err, result) => {
      res.send(result);
      console.log(err);
    }
  );
});

//creates secret for 2fa app
app.post("/getSecret", (req, res) => {
  var secret = speakeasy.generateSecret({
    name: "Lumos Exchange",
  });

  res.send(secret);
});

//Get 6 digit passcode from user & get base32
app.get("/VerifyGoogle2FASetup", (req, res) => {
  const user = req.session.user[0].userID;
  secret = req.query.secret;
  token = req.query.passcode;

  var verified = speakeasy.totp.verify({
    secret: secret,
    encoding: "base32",
    token: token,
  });

  console.log("user is verfiedd: " + verified);
  db.query(
    "UPDATE userAuth SET googleSecret = ? WHERE userID = ?",
    [secret, user],
    (err, result) => {
      console.log(err);
    }
  );
  res.send(verified);
});

//create nexmo request
const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
});

//maybe chnage this to post
app.post("/VonageSMSRequest", (req, res) => {
  const user = req.session.user[0].userID;
  //verify the user has specified a number
  console.log("user phone number: ", req.body.number);
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
        console.log("error: ", err);
        return;
      }
      const requestId = result.request_id;
      console.log("result", result);

      //Store user phone number in db
      db.query(
        "UPDATE userAuth SET phoneNumber = ?, SMS = ? WHERE userID = ?",
        [req.body.number, 1, user],
        (err, result) => {
          console.log(err);
          console.log("Phone number added to db");
        }
      );
      //send back request ID as need for the verify step
      res.send({ requestId });
    }
  );
});

app.post("/VonageSMSVerify", (req, res) => {
  //user needs to send request id and code for authetication

  if (!req.body.requestId || !req.body.userCode) {
    res.status(400).send("You must supply a code");
    return;
  }

  //Pass details to vonage servers for validation
  nexmo.verify.check(
    {
      request_id: req.body.requestId,
      code: req.body.userCode,
    },
    (err, result) => {
      if (err) {
        res.status(500).send(err.error_text);
        console.log("error:", err);
        return;
      } else {
        if (result && result.status == "0") {
          res.send({ message: "SMS Verified! " });
        } else {
          //handle the error wrong pin
        }
      }
    }
  );
});

app.post("/SendEmailVerification", (req, res) => {
  //Get email from user and send email with code

  const text = crypto.randomInt(0, 1000000);
  console.log("Verification code is: ", text);
  const name = req.body.firstName + " " + req.body.lastName;
  console.log("name: ", req.body.firstName);

  //store temp secret in DB

  //Pass connection details to Emailer API from ENV
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  //Send email
  transport.sendMail({
    from: process.env.MAIL_FROM,
    to: req.body.email,
    subject: "Lumos Email Verification",
    html: ` <table role="presentation" style="width:100%; border-collapse:collapse;border:0;border-spacing: 0;background: #131313;margin: 0 0 50px 0;">
    <tr>
        <td align="center" style="padding: 0">
            <table role="presentation" style="width: 100%;max-width: 600px;border-collapse: collapse;border-spacing: 0;text-align: left;">
                <tr>
                    <td align="center" style="padding: 40px 0 30px 0;">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAAA2CAYAAACLK3aNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABF4SURBVHgB7ZwJlBzFeYD/v6p7dmZ2jl1dC9pDEoKEI8QgMJcDfkoE4iWAnHBZIgHhcDv4xU5isPGLIBw2EIFsIWM7jyMQ7JgcGEMA2X558BDCgOIXX882EhbaXV272t2Z2d3Znemu+v1Xr7TszrUz0qwkW/W9V+rZ7urq6u7667+qBWCxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisfxOgnAQyO1KLA/F4QIQUBuuAH9UP+uE4ApQpasoH/9H7kq/gMdBDiyWacaBacbvb76KlH5C9YNbi3hiA4CIwxrHlV06rVdSGXFABy6GlqY4QOoJsFimmVrn/Jqg3uSNkFdfhiwLS7Bj6kKaty4MQhxWw5bUbWC0oK5Q34OZeoTW+QNNK8FimWamTcP4vYkVSsNayqODVYolsQBgBEAmcDWEUl/EP4A8VWFocR0+C75KqWQYetNPWPPs8IB2xcxmDuRkDAQJtp+HYV62FxF8OEDoZ2Cm0thoJDwz7IZc0H4W8tm+6X730+LDqN7kzawpvgz5QCCruoYRFgixBMfgs/BO+mFcPPZQKdd8sk7pn1B+qgbAaKYRGcc7MJZ6GOpErqvxZBfFP07cpwGHJWZuwVbWnVXidSVvk6hPn7gPEZ/D1sw3K503sjM831Wh+wXQ+LRDIPplW/rGfX/7Xc1m85cC/WXjdUikhoBuS7Zn+qEGzHug4ZDQ/ZG1Qug54/tRvC1b0w9WPHdzcFcNKpy4iDv5J2y/nEia5gjEuHk9PBAGWVh6taat3OBLsmP284hbqhrg9OMWs2lUzbnzCekcJFhECDN528wNOzzeBlHCgCDqIaCNCvV6t3X4J3w9gjpSdw3DZthNCuhuyrFmweoFUoS5JPFueD71EJZ18StgruRDRGXoXhpODmNj+htQB0LCOZE15WUFl9oNlOAeZ6oWGOZSTeLDE3cQ6HenOsnNhU4EiVfoiY+S+PoA4wKjtTIHl4AQk/oZ9mE7C8BdtQwa1dlkNhfzoLxFfyCjQIqivCkrMF5n0sxwJrBzPw/i3+fuRsxVccLFAyua4ATeeR7/vlp397zrdzbd73RU9j9pO7uolP2Ir/CfublTeFiFzeMInsjexxJYMRRMZuavZQLEKupObvA6xT1ux8DrUCfq6sOwZrmJH9paGsEZ1QpLYIY1BMJyF5thd5UUFqxQijrBQpOGNX4qeQMc4UgH/87b3viH1danbVGQkG8FpIewyqku84u4KTP5Jw9mep6F5RT+HZnqPDM+CJAFix73O5PPsFDMKlXP357gV4ps3ov1KPAsMMJS1c1AlF3fCwToFVBH6qZhfA4dKx/WoQ+i2ocdCAuHA0SCzbCymsUjEZOvTjqyr31FDazJPqRzEJ10CgsN5HANBwJ8pzn1OBy5xIR27+bnvKwaLaOla57sJ7nmMYXHSs1/tInL6HDIm5F4kn9dtN8WPsIKX4nWwS2xK+LHDvWMt98dMVGddqVDX+U6jVA7Wkj4L6gjdREY47OwNH8FR2oUljEHv6IZhg1Dxr1bXHT+rpZGFcp9CTy9qOSLylOE+7KWAwHD2JT+NhyhkBnI3TOWAvS/UrHeTuOgq5OUL66vduD7s5Om4j0C6aIy710R0SaB8B7bTJp/Hw9GA2HxuOPzPxoJifv557XjJ+sG0+ptrIWSxfWxUxE85wq92VMiy+fP47s4CYnO44N7fS96B3TiDYA01IsDFhjVn7yRFKxlYZFQg7CIEIeOY0E07J5afRbafnRUO8OPwCiuBF3+ohw9M2r5CdrT1ICzUk/BEYgxfRSoR6h31qk4e89gqTrmfejBvNADka+wL1DSNCo03nNb4+w76WXSEf9QosVRpfG7IYLbcX5m6/heozEQ2pRyvkBCXI2FphviNaqz+W3ZMfDo2N+BUvyzEr35nhhyLpPHT76fIGCRc1D3RpezYN7C7/5bTkf3CNSRA/JhqD/xcc6DrKVsbcJiNItoxtUizKFjrFFYiIUlNrxO51hYqjjThJw1waOUabqWNh/bAEcmx4yOeLfSs/yeSqA640ADDRexsCwu1wC/t/E3TF1tEJKJqJBsHZSoiiTu2KGbr8H56a0TD2DbiCndGsRNHNX6jBGsgnNRo/pkZrI/c3RR+wjfweOLhd9oORH2yWnPfNPpyPxRqCOzDurMfgsMx9jnaIFfMqHjWvIsJnQsI4HPcg/f4FTB4oJrshnWN/KAGsSVqKs/jxObUQ5v3g6t22fDkQm6BDfAmbHjCw/QQBPIuGwGKVZN1cYHvzI8cgY/xGbRiUXtAby0qyfytQUL3h8t15DbkQa3LfMkafG14ovgwqjC84O2KCiFYwS1hkuGftZ4FBwC9ltg8KihHp2lmyDMXjlVF7bEkImGwb3QmF69P6FjHc1xBE7fIGqJrBvzLwJ9ahhuxehINxypCJjnCXF74W4/o8Ef1J/i57QIqkRTUJZC8fghh+iu1tN3Vgy3B/7OjvCoI/Kr2ezqKzgc5tDwuWMVg/LrEk1cGE46b3ididVeZ9N55TTndHBAJpk7N/MKz9yXYIQ8qjTjjyUVQc7ANeKF9CocW+xSNcYMU+nEEypF12IQV6v2xMD86xMCVrit6e/BEQYVTCwC8CrqTCwdP97dBI4Up3K49rrJ51HFTDxbZyYkfGaJQ+9jR+YdqAJsHwEf3e3czluFx/h9HRtsObLH5etF547pumNYw32Ge/KaOrsp43clXlZdiTtz78dOoE1HR2GaOOA8jNuSWc9+zMdEmDOs5TSNEZZmvBPc1N/vl2bJjKzTbIaJWqKWRrM0QlaE8TKceeQJi4EH01sFfgJ6hPdRz+xYYO40ZQWHsYzT3jahDvsIolRUsfDpF+VauMn/g5oIelEkMDwJR/mIO8T/cHmWBXg9VbQqTFIVL2ThWyWl/Kk/J7vB70rewIGOONSZuiQuWdO8LNC5RkQpT1AsNOZJU5auhpHkFsomt04sOsfbCbNeId5A08M0qFdgjWYYp7f6OCH6MYynXoUjEx538DRvN03cybP3qf6od2OOM/P5vsgSrjZpdQAPzNfYay/OvO8VF7qT23hlmMcNFZlBbCrvgVo66Aelr+hSiA7sbgkl2zOQaMv0OXOHLmGt8i8AVZn+kuueytuve9n8i5yMnQt1pG6ZfpzT/4pW9McYpt5CTWMejBqEY1QfzC8qwzA/r3WssL3AwU8nnsRh+lue80JQJbTPDAvBcoylvw+HDcVGqyAxtXkpsWgmr9ak5aTYqPToep6hJ2kZ7ss/NTi4iM3bx2Cyict+BX2O48Ve0TX3be/kd3lhI8siFgVsuFOnQg1wlA25nFK0HyELLbsDP8iYX+jovCfxBi4L+PV+ljvzI7N2DKYQICHwPF+4z3OCtXozfqo+Qx1xWwY38oC9hoVmV+GdlE1olthvhEVHco+wGXZNLUvnaMzBzwqHzbCmw0lYgpTCrhI7pzQZ2IxvLdzHA3MQqsR34Vd8nTWT2kSIKk3rpaC2Se0SPcqpxh86JUxrmvCmxFjZVljHrPOiLbE5UAW0sQ3kjhiH/GlJ8UFMF65MiMxNmbLNeSz9oHwq82EW7EUSxSV8b/9KCD8OPvQoAXf6NDU3fhHUibp/D+PO4UAA0eVsEvVSTa79GCYp6YnRB3RaX1WrGSaNZomwGdZ8+JlhLMzbiveJ9ikdVMSTinYB7YYqGcw7NJR37mdfZWfBoVkF/esflXSfz6lsLpU9Bu4Al5eheIYP6QaxHKphHmff2zJLWcvNK2yehfmtcqcZDYefJ43tmS3YNvCixMaVDkbP0T58lHu1EUq5BIQnQ52Ylg/IWNO8oUfpYhmnndWGnA1BUjI8vE54cAvbsbVFw9hnUe7hZoZ9gHBgc9FO0hd4c7MnlDvHCBNPPsuKDiD8FKpkxsIBiLuUkiC+AFDOlCOFUtyaaB0s64NMNASk65vyOo/E3sJqWuPd2a2Js6ACtKOJa8r5Sos1xYt0qU+DemH8r19GTSnrh2DrTlOybl/mTdk3tJib+3lRn1Sx2be/TNsXl6H2zFvKh0+IWLF5VopguUtmbwa/Fs1EwacBe0REXeoeZmbYRIQn3uDBPzlCyJOCUPAgvR8tzGbz5DErrlqya7lSS8EhzabIeqgB2ZMC0Zf5N1YLJZe5sz/yfRmSL0zYUfGVYcsw+HlnN7dXtNyIk9jxkIRnvG3JJTxZThpfwRIcT6CH+gxfkbmHjhKtf6dh3lAw6Gl3I0AzHqUb3TdUZ/K+3LbYSWU7dTQ/wjktrgZdvJpZ0K+hTkzrN/2BedYXv5Qa4DkawZZyKwKkFGHdMPKACR3XHA2LQj+G9HUYH3oNDhIszzG+9vLctkSmYkUCHWoMfTdYwxUX72FW/y/vPb+g1mJ2TF/IdzU9LZTezJ6qi4KO8jv9q/l5nVPYJE/H74KO8cSQgmrB0wHyWyN5UN6n0ZE/HEshj7PHZ6F1964zc8aeP00V+3d839R8SDvOUv4x2eRBPMYsX1Hdidf9bfgcz/G7JUlS22EGP73FQuOf840U+28EXTnyVu37088Fgbjrua35XP9zEuVf5TuTbwrU67VSP3Ip+wtohFE+L+aPZs/m53Ula5hjC1vlMVVjuLvCfcM0gzMH3/T64n8hYvgDPQSRQqExsRaZwE/pQX0K25pQC8YM4xl6OSYGD6pm4V42crJirZy6u9rP587j7Uac2Z/xtyW/wfd/Lg+wSbMgD4jT2C04jfPVo2ZFOs/cRmiwxIXZvKdvyfbaFxSGFrBW6Ez+Pw+ux7idmz84Qv8e9uaMr+j1xy9VAE3ehdze8HuJnZCn6xpC8CLvKVx21GhyI6xjlpq3rIRmCxRDiGW+lCLISKlXNLZmdwR/mvzESFaqPdGbJtRq4wja5awyLhVSpBUkhyHH+U8IlmeZL99iJVoekHn5EtSJaf1PMPbhzhzcKEAvEXE2zwrNLRYYPwVnUA2h43EzLAQrsOWQmWFYTXEmjD1nXvo/+fZX6bImp/k4KngOxeM1mPnpGactcy/sJzwgiQvP4LSBm9vMU+8GmdN343EffCZs5IKghJ4vMVIaF2YgKvFtqXAFlAhq7AWDTwQJG8p+VGi+IEX6G2wd3LBvF2sn0H1RDiBgKf/F9MZ8l22ifPNpbBsr0e4QmwM34sKBuq3vPygCY2BNs5Gj+ys5uVkkNFhLL8byLFk1Fjr+rcvgO23pNXz/n4caQsNmqQrPzo9zROjmWld3T4QHpCm9TnvmXLc9/XtuW+ZcnPDB1n61OT8No4Q/8BQu5o7+B0CtHihs8jSczX16euIB6QtTXuTW7uP7r97+HG+XehTBSjNJQR05aAJjMMtoNDnXsrL29ifkbMCx0PEytzl1UHwWDlzU4lUVQn7BqiyzQrthQfqLUugzWNN8m1svLzhEeR4sLzqol4Tmp/7aRIOgBhRQ7f+Dyth/X1Wch6nwviILUhDuW7hV9i68Siq4gLWFMYEq9dUTwE4/wpWy7dhzIgWfARiQ2+SSGsnpO0ZG6Di25D7N3XoTxpKwVKrsjchuQxAPSCd/Zqgj/d9QZ2pzGuqE15O4kHPcT7GTP6vq/yjD5FmisIe9rhWHW1LyQPG642eTEifLMTsclYY0CvyV05bawM/Hg98y6FkwXoX0z4ydJUxIF9F8yMe3R0MaxM/5vjbyfdUszIFZqlB43YlTODl9MmoOIiA18MQwxIGEndLFTcjJTZhGDonAGPydySs5JLMGcnjUlHP4Xp8FI+pyjoa9ChbLIeKQCYzBTyf+FEbgScrh7Ep+DLuM/Rx4/gRHw54Hi+UQclB9mEKcZOYlEnA1Rsp8GjCWZ+kTBB+3wmI5HDikGmYfxD6NEqxpTHJzfGcQZDUZfGuGWSyFUF/8bL8nscPvSipOsJHuTfbScPwSsFgspfF2xz+i9iSHdU+y19udPB8sFktl8r3JRV4quQQsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrEU8xva9X2ZVcmjTAAAAABJRU5ErkJggg==" alt="" width="300" style="height: auto;display: block;width: 200px;" />
                    </td>
                </tr>
                <tr>
                    <td style="padding: 36px 30px 42px 30px; background: #fff; border-radius: 10px;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0">
                            <tr>
                                <td style="padding: 0; color: #153643; text-align: center;">
                                    <p style="margin: 0;font-size: 16px;line-height: 24px;font-family: Arial,sans-serif;">
                                        Hi there ${name},
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0;">
                                    <table role="presentation" style="width: 100%;border-collapse: collapse;border:0;border-spacing: 0;">
                                        <tr>
                                            <td style="width: 260px;padding: 0;vertical-align: top;color: #153643;">
                                                <p style="margin: 0 0 25px 0;font-size: 16px;line-height: 24px;font-family: Arial,sans-serif;">
                                                    <div style="height: auto;display: block;margin: auto;background: #131313;width: 200px;padding: 20px;font-size: 40px;color: #fff;text-align: center;border-radius: 5px;font-family: Monospace;">
                                                        ${text}
                                                    </div>
                                                </p>
                                                <p style="margin: 0 0 25px 0;font-size: 16px;line-height: 24px;font-family: Arial,sans-serif; text-align: center;">Enter it on the Lumos Exchange to confirm your email for 2FA. This code will expire in 60 minutes.</p>
                                                <p style="margin: 0;font-size: 16px;line-height: 24px;font-family: Arial,sans-serif;text-align: center;">Thanks, The Lumos Team.</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                <td align="center" style="padding: 40px 0 30px 0;">
                    <br />
                </td>
            </tr>
            </table>
        </td>
    </tr>
</table>
`,
  });
  console.log("email sent");
  //STORE EMAIL & PASSCODE IN DB

  db.query(
    "INSERT INTO TempAuth (Email, Secret) VALUES (?,?)",
    [req.body.email, text],

    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/VerifyEmail2FA", (req, res) => {
  const email = req.body.email;
  const yes = "Yes";

  const userCode = req.body.passcode;

  console.log("usercode: ", req.body.passcode);
  console.log("email is: ", req.body.email);
  let checkCode;
  let auth = false;

  db.query(
    "SELECT Secret FROM TempAuth WHERE (email) = (?)",
    [email],
    (err, result) => {
      //changed this
      checkCode = result;
      console.log("Checkcode from db: ", checkCode);
      console.log("Passcode from  user: ", userCode);
    }
  );
  let newcheckCode = toString(checkCode);
  let newuserCode = toString(userCode);
  //convert both to string before checking

  if (newcheckCode == newuserCode) {
    auth = true;
    //if true delete from temp db
    db.query(
      "DELETE * FROM TempAuth WHERE (email) = (?)",
      [email],
      (err, result) => {}
    );
  } else {
    auth = false;
  }
  //Add user to userAuth Table
  db.query(
    "UPDATE userAuth SET emailVerified = ? WHERE Email = ?",
    [1, email],
    (err, result) => {
      console.log(err);
    }
  );
  console.log("auth: ", auth);
  res.send(auth);

  //once verified delete 2fa from db
});

//UpgradeSilver
app.post("/UpgradeSilver", (req, res) => {
  const user = req.session.user[0].userID;
  const BirthDayy = req.body.BirthDayy;
  const BirthMonthh = req.body.BirthMonthh;
  const BirthYearr = req.body.BirthYearr;
  const CountryOfResidence = req.body.CountryOfResidence;
  const Phone = req.body.Phone;
  const Tax = req.body.Tax;
  const date = new Date();

  db.query(
    "INSERT INTO UpgradeTiers SET userID = ?,BirthDayy = ?, BirthMonthh = ?, BirthYearr = ?, PhoneNumber = ?, TaxCode = ?, CountryOfResidence = ?, DateSubmitted =? WHERE userID = ?",
    [
      user,
      BirthDayy,
      BirthMonthh,
      BirthYearr,
      Phone,
      Tax,
      CountryOfResidence,
      Tax,
      date,
      user,
    ],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send({
          message: "Succesfully Upgraded to silver account",
        });
      }
    }
  );
  // upgarde account level to silver in accountLevel
  db.query(
    "UPDATE accountLevel SET accountLevel = ?, dateUpgraded = ? WHERE userID =?",
    ["Silver", date, user],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
      }
    }
  );
});

//UpgradeGold
app.post("/UpgradeGold", (req, res) => {
  const user = req.session.user[0].userID;
  const EmployerName = req.body.EmployerName;
  const EmployerAddress = req.body.EmployerAddress;
  const Occupation = req.body.Occupation;
  const Income = req.body.Income;
  const addIncome = req.body.AdditionalIncome;
  const proofEmployment = req.body.ProofEmployment;
  const date = new Date();

  db.query(
    "UPDATE upgradeTiers SET EmployerName = ?, EmployerAddress = ?, Occupation = ?, ProofOfEmployment = ?, Income = ?, AdditionalIncome =?, DateSubmitted = ? WHERE userID = ?",
    [
      EmployerName,
      EmployerAddress,
      Occupation,
      proofEmployment,
      Income,
      addIncome,
      date,
      user,
    ],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send({
          message: "Account tier now Gold",
        });
      }
    }
  );
  //Update account level to gold

  db.query(
    "UPDATE accountLevel SET accountLevel = ?, dateUpgraded = ? WHERE userID =?",
    ["Gold", date, user],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
      }
    }
  );
});

//UpgradeTeam
app.post("/UpgradeTeam", (req, res) => {
  const user = req.session.user[0].userID;
  const RegistrationCountry = req.body.RegistrationCountry;
  const RegistrationNumber = req.body.RegistrationNumber;
  const CompanySourceOfIncome = req.body.CompanySourceOfIncome;
  const DirectorName = req.body.DirectorName;
  const DirectorAddress = req.body.DirectorAddress;
  const DirectorOwnership = req.body.DirectorOwnership;
  const AdditionalDirector = req.body.AdditionalDirector;

  db.query(
    "INSERT INTO UpgradeTeam (userID, RegistrationCountry, RegistrationNumber, CompanySourceOfIncome, DirectorName, DirectorAddress, DirectorOwnership,AdditionalDirector) VALUES (?,?,?,?,?,?,?,?)",
    [
      user,
      RegistrationCountry,
      RegistrationNumber,
      CompanySourceOfIncome,
      DirectorName,
      DirectorAddress,
      DirectorOwnership,
      AdditionalDirector,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});

//this email verification will be built for chnaging 2fa options
app.post("/2FAEmailVerificationSend", (req, res) => {
  //get user email and generate 6 digit code
  const email = req.session.user[0].email;
  console.log("email to send to ", email);
  const text = crypto.randomInt(0, 1000000);
  const name =
    req.session.user[0].firstName + " " + req.session.user[0].lastName;

  //Pass connection details to Emailer API from ENV
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  //Send email
  transport.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Lumos Email Verification",
    html: ` <table role="presentation" style="width:100%; border-collapse:collapse;border:0;border-spacing: 0;background: #131313;margin: 0 0 50px 0;">
    <tr>
        <td align="center" style="padding: 0">
            <table role="presentation" style="width: 100%;max-width: 600px;border-collapse: collapse;border-spacing: 0;text-align: left;">
                <tr>
                    <td align="center" style="padding: 40px 0 30px 0;">
                        <img src="data:image/png;base64,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" alt="" width="300" style="height: auto;display: block;width: 200px;" />
                    </td>
                </tr>
                <tr>
                    <td style="padding: 36px 30px 42px 30px; background: #fff; border-radius: 10px;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0">
                            <tr>
                                <td style="padding: 0; color: #153643; text-align: center;">
                                    <p style="margin: 0;font-size: 16px;line-height: 24px;font-family: Arial,sans-serif;">
                                        Hi there ${name},
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0;">
                                    <table role="presentation" style="width: 100%;border-collapse: collapse;border:0;border-spacing: 0;">
                                        <tr>
                                            <td style="width: 260px;padding: 0;vertical-align: top;color: #153643;">
                                                <p style="margin: 0 0 25px 0;font-size: 16px;line-height: 24px;font-family: Arial,sans-serif;">
                                                    <div style="height: auto;display: block;margin: auto;background: #131313;width: 200px;padding: 20px;font-size: 40px;color: #fff;text-align: center;border-radius: 5px;font-family: Monospace;">
                                                        ${text}
                                                    </div>
                                                </p>
                                                <p style="margin: 0 0 25px 0;font-size: 16px;line-height: 24px;font-family: Arial,sans-serif; text-align: center;">Enter it on the Lumos Exchange to confirm your email for 2FA. This code will expire in 60 minutes.</p>
                                                <p style="margin: 0;font-size: 16px;line-height: 24px;font-family: Arial,sans-serif;text-align: center;">Thanks, The Lumos Team.</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                <td align="center" style="padding: 40px 0 30px 0;">
                    <br />
                </td>
            </tr>
            </table>
        </td>
    </tr>
</table>
`,
  });
  console.log("email sent");
  //STORE EMAIL & PASSCODE IN DB

  db.query(
    "INSERT INTO TempAuth (Email, Secret) VALUES (?,?)",
    [req.session.user[0].email, text],

    (err, result) => {
      console.log(err);
    }
  );
});

//this email verification will be built for chnaging 2fa options
app.post("/EmailVerification2FA", (req, res) => {
  const email = req.session.user[0].email;
  const userCode = req.body.passcode;
  let checkCodee;
  let auth = false;

  db.query(
    "SELECT Secret FROM TempAuth WHERE (email) = (?)",
    [email],
    (err, result) => {
      //chnaged this
      checkCodee = result;
      console.log("DB 2FA code: ", checkCodee);
      console.log("userInput Code: ", userCode);
    }
  );

  let newcheckCode = toString(checkCodee);
  let newuserCode = toString(userCode);

  if (newcheckCode == newuserCode) {
    db.query("DELETE FROM TempAuth WHERE email = ?", [email], (err, result) => {
      console.log("Email Validation Success and temp secret deleted");
    });
    res.send({
      auth: true,
    });

    //if true delete from temp db
  } else {
    res.send({
      auth: false,
    });
  }
});

//used for user to chnage password verification
app.post("/checkChangePass", (req, res) => {
  const userName = req.session.user[0].userName;
  const password = req.body.oldPassword;
  let auth = false;

  console.log("userPassword: ", password);
  db.query(
    "SELECT * FROM users WHERE userName = ?",
    [userName],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          //if password match return auth as true
          if (response) {
            res.send({
              auth: true,
            });
          } else {
            res.send({
              auth: false,
              message: "Incorrect Password please try again",
            });
          }
        });
      } else {
        res.send({
          auth: false,
          message: "no user exists",
        });
      }
    }
  );
});

//update user password
app.post("/updateUserPass", (req, res) => {
  const user = req.session.user[0].userID;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "UPDATE users SET password = ? WHERE userID = ?",
      [hash, user],
      (err, result) => {
        console.log(err);
        console.log("Password Updated");
        res.send({
          updated: true,
          message: "Succesfully updated password.",
        });
      }
    );
  });
});

app.post("/getUser2FAOptions", (req, res) => {
  const user = req.session.user[0].userID;

  db.query(
    "SELECT emailVerified, SMS, google FROM userAuth WHERE (userID) = (?)",
    [user],
    (err, result) => {
      res.send(result);
    }
  );
});

//SETTING UP PAYMENT TO BANKS
//register uk bank account
app.post("/RegisterUkBank", (req, res) => {
  const user = req.session.user[0].userID;
  const name =
    req.session.user[0].firstName + " " + req.session.user[0].lastName;
  const sortCode = req.body.sortCode;
  const accountNumber = req.body.accountNumber;

  db.query(
    "INSERT INTO UKBankAccounts (userID, Name, sortCode, accountNumber) VALUES (?,?,?,?)",
    [user, name, sortCode, accountNumber],
    (err, result) => {
      if (err) {
        console.log("errors: ", err);
        res.send(err);
      } else {
        res.send({ message: "UK Bank account added" });
      }
    }
  ),
    db.query(
      "UPDATE userPaymentAccounts SET UKBank = ? WHERE userID = ?",
      [1, user],
      (err, result) => {
        if (err) {
          res.send(err);
        }
      }
    );
});

//register EU bank account
app.post("/RegisterEUBank", (req, res) => {
  const user = req.session.user[0].userID;
  const name = req.body.bankName;
  const BIC = req.body.BIC;
  const IBAN = req.body.IBAN;

  db.query(
    "INSERT INTO EUBankAccounts (userID, bankName, BIC, IBAN) VALUES (?,?,?,?)",
    [user, name, BIC, IBAN],
    (err, result) => {
      if (err) {
        console.log("errors: ", err);
        res.send(err);
      } else {
        res.send({ message: "EU Bank account added" });
      }
      db.query(
        "UPDATE userPaymentAccounts SET EUBank = ? WHERE userID = ?",
        [1, user],
        (err, result) => {
          console.log("errors: ", err);
        }
      );
    }
  );
});

//Register International bank account
app.post("/RegisterInternationalBank", (req, res) => {
  const user = req.session.user[0].userID;
  const bankName = req.body.bankName;
  const bankCity = req.body.bankCity;
  const bankCountry = req.body.bankCountry;
  const SWIFTCode = req.body.SWIFTCode;
  const payeesName = req.body.payeesName;
  const interBankName = req.body.interBankName;
  const interBankCity = req.body.interBankCity;
  const interBankCountry = req.body.interBankCountry;
  const interBankAccountNumber = req.body.interBankAccountNumber;
  const interBankRoutingNumber = req.body.bankName;

  db.query(
    "INSERT INTO internationalBankAccounts (userID, bankName, bankCountry, SWIFTCode, payeesName, interBankName, interBankCity, interBankCountry, interBankAccountNumber, interBankRoutingNumber) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [
      user,
      bankName,
      bankCity,
      bankCountry,
      SWIFTCode,
      payeesName,
      interBankName,
      interBankCity,
      interBankCountry,
      interBankAccountNumber,
      interBankRoutingNumber,
    ],
    (err, result) => {
      if (err) {
        console.log("errors: ", err);
        res.send(err);
      } else {
        res.send({ message: "International Bank account added" });
      }
    }
  ),
    db.query(
      "UPDATE userPaymentAccounts SET InterBank = ? WHERE userID = ?",
      [1, user],
      (err, result) => {
        console.log("errors: ", err);
      }
    );
});

//Register paypal
app.post("/RegisterPaypal", (req, res) => {
  const user = req.session.user[0].userID;
  const paypalEmail = req.body.paypalEmail;

  db.query(
    "INSERT INTO paypalAccounts (userID, paypalEmail) VALUES (?,?)",
    [user, paypalEmail],
    (err, result) => {
      if (err) {
        console.log("errors: ", err);
        res.send(err);
      } else {
        res.send({ message: "Paypal account added" });
      }
    }
  );
  db.query(
    "UPDATE userPaymentAccounts SET Paypal = ? WHERE userID = ?",
    [1, user],
    (err, result) => {
      console.log("errors: ", err);
    }
  );
});

//Register Skrill address
app.post("/RegisterSkrill", (req, res) => {
  const user = req.session.user[0].userID;
  const skrillEmail = req.body.skrillEmail;
  db.query(
    "INSERT INTO skrillAccounts (userID, skrillEmail) VALUES (?,?)",
    [user, skrillEmail],
    (err, result) => {
      if (err) {
        console.log("errors: ", err);
        res.send(err);
      } else {
        res.send({ message: "SKRILL account added" });
      }
    }
  );
  db.query(
    "UPDATE userPaymentAccounts SET Skrill = ? WHERE userID = ?",
    [1, user],
    (err, result) => {
      console.log("errors: ", err);
    }
  );
});

//get User bank details for Profile
app.post("/getUkBankDetails", (req, res) => {
  const user = req.session.user[0].userID;
  db.query(
    "SELECT accountNumber, sortCode FROM UKBankAccounts WHERE (userID) = (?)",
    [user],
    (err, result) => {
      console.log(err, "error in getUKbankDetails");
      if (result.length > 0) {
        res.send({
          type: "ukbank",
          name: "UK Bank Account",
          account: result[0].accountNumber,
          sort: result[0].sortCode,
        });
      } else {
        res.send({
          status: "none-added",
        });
      }
    }
  );
});

//get user EU Bank details for profile
app.post("/getEUBankDetails", (req, res) => {
  const user = req.session.user[0].userID;
  db.query(
    "SELECT BIC, IBAN, bankName FROM EUBankAccounts WHERE (userID) = (?)",
    [user],
    (err, result) => {
      console.log(err, "error in getUKbankDetails");
      if (result.length > 0) {
        res.send({
          type: "eubank",
          name: "EU Bank Account",
          bankName: result[0].bankName,
          BIC: result[0].BIC,
          IBAN: result[0].IBAN,
        });
      } else {
        res.send({
          status: "none-added",
        });
      }
    }
  );
});

//get international bank details for profile FINISH THIS
app.post("/getInterBankDetails", (req, res) => {
  const user = req.session.user[0].userID;
  db.query(
    "SELECT bankName, bankCity, bankCountry, SWIFTCode, payeesName, interBankName, interBankCity, interBankCountry, interBankAccountNumber, interBankRoutingNumber FROM internationalBankAccounts WHERE (userID) = (?)",
    [user],
    (err, result) => {
      console.log(err, "error in getIntbankDetails");
      if (result.length > 0) {
        res.send({
          type: "internationalBank",
          name: "International Bank",
          bankName: result[0].bankName,
          BIC: result[0].SWIFTCode,
          bankCity: result[0].bankCity,
          bankCountry: result[0].bankCountry,
          payeeName: result[0].payeesName,
          interBankName: result[0].interBankName,
          interBankCity: result[0].interBankCity,
          interBankCountry: result[0].interBankCountry,
          interBankAccountNumber: result[0].interBankAccountNumber,
          interBankRoutingNumber: result[0].interBankRoutingNumber,
        });
      } else {
        res.send({
          status: "none-added",
        });
      }
    }
  );
});

app.post("/getPaypalDetails", (req, res) => {
  const user = req.session.user[0].userID;
  db.query(
    "SELECT paypalEmail FROM paypalAccounts WHERE (userID) = (?)",
    [user],
    (err, result) => {
      console.log(err, "error in getUKbankDetails");
      if (result.length > 0) {
        res.send({
          type: "paypal",
          name: "PayPal",
          email: result[0].paypalEmail,
        });
      } else {
        res.send({
          status: "none-added",
        });
      }
    }
  );
});

//Get Skrill details for profile
app.post("/getSkrillDetails", (req, res) => {
  const user = req.session.user[0].userID;
  db.query(
    "SELECT skrillEmail FROM skrillAccounts WHERE (userID) = (?)",
    [user],
    (err, result) => {
      console.log(err, "error in getUKbankDetails");
      if (result.length > 0) {
        res.send({
          type: "skrill",
          name: "Skrill",
          email: result[0].skrillEmail,
        });
      } else {
        res.send({
          status: "none-added",
        });
      }
    }
  );
});

//return all user payment methords
app.post("/getUserPaymentMethods", (req, res) => {
  const user = req.session.user[0].userID;

  db.query(
    "SELECT EUBank, UKBank, InterBank, Paypal, Skrill FROM userPaymentAccounts WHERE (userID) = (?)",
    [user],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log("errors: ", err);
      } else {
        res.send({
          UKBank: result[0].UKBank,
          EUBank: result[0].EUBank,
          InterBank: result[0].InterBank,
          Paypal: result[0].Paypal,
          Skrill: result[0].Skrill,
        });
      }
    }
  );
});

//Update Uk bank

app.post("/UpdateUkBank", (req, res) => {
  const user = req.session.user[0].userID;
  const name =
    req.session.user[0].firstName + " " + req.session.user[0].lastName;
  const sortCode = req.body.sortCode;
  const accountNumber = req.body.accountNumber;

  db.query(
    "UPDATE UKBankAccounts SET Name = ?, sortCode = ?, accountNumber =? WHERE userID = ?",
    [name, sortCode, accountNumber, user],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log("error : ", err);
      } else {
        res.send({
          message: "UK Bank Updated!",
        });
      }
    }
  );
});

//Update Eu Bank
app.post("/UpdateEUBank", (req, res) => {
  const user = req.session.user[0].userID;
  const bankName = req.body.bankName;
  const BIC = req.body.BIC;
  const IBAN = req.body.IBAN;

  db.query(
    "UPDATE EUBankAccounts SET bankName = ?, BIC = ?, IBAN =? WHERE userID = ?",
    [bankName, BIC, IBAN, user],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log("error : ", err);
      } else {
        res.send({
          message: "EU Bank Updated!",
        });
      }
    }
  );
});

//Update International Bank
app.post("/UpdateInterBank", (req, res) => {
  const user = req.session.user[0].userID;
  const bankName = req.body.bankName;
  const bankCity = req.body.bankCity;
  const bankCountry = req.body.bankCountry;
  const SWIFTCode = req.body.SWIFTCode;
  const payeesName = req.body.payeesName;
  const interBankName = req.body.interBankName;
  const interBankCity = req.body.interBankCity;
  const interBankCountry = req.body.interBankCountry;
  const interBankAccountNumber = req.body.interBankAccountNumber;
  const interBankRoutingNumber = req.body.bankName;

  db.query(
    "UPDATE internationalBankAccounts SET bankName = ?, bankCity = ?, bankCountry = ?, SWIFTCode = ?, payeesName = ?, interBankName = ?, interBankCity = ?, interBankCountry =?, interBankAccountNumber =?, interBankRoutingNumber =?  WHERE userID = ?",
    [
      bankName,
      bankCity,
      bankCountry,
      SWIFTCode,
      payeesName,
      interBankName,
      interBankCity,
      interBankCountry,
      interBankAccountNumber,
      interBankRoutingNumber,
      user,
    ],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log("error : ", err);
      } else {
        res.send({
          message: "International Bank Updated!",
        });
      }
    }
  );
});

//Update Paypal
app.post("/UpdatePaypal", (req, res) => {
  const user = req.session.user[0].userID;
  const paypalEmail = req.body.paypalEmail;

  db.query(
    "UPDATE paypalAccounts SET paypalEmail = ? WHERE userID = ?",
    [paypalEmail, user],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log("error : ", err);
      } else {
        res.send({
          message: "Paypal Updated!",
        });
      }
    }
  );
});

//Update Skrill
app.post("/UpdateSkrill", (req, res) => {
  const user = req.session.user[0].userID;
  const skrillEmail = req.body.skrillEmail;

  db.query(
    "UPDATE skrillAccounts SET skrillEmail = ? WHERE userID = ?",
    [skrillEmail, user],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log("error : ", err);
      } else {
        res.send({
          message: "Skrill Updated!",
        });
      }
    }
  );
});

//delete UK bank
app.post("/DeleteUKBank", (req, res) => {
  const user = req.session.user[0].userID;
  db.query(
    "DELETE FROM UKBankAccounts WHERE (userId) = (?) ",
    [user],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log("error : ", err);
      } else {
        db.query(
          "UPDATE  UKBank WHERE (userID) = (?)",
          [0, user],
          (err, result) => {
            console.log("errors: ", err);
          }
        );
        res.send({
          message: "UK account Deleted!",
        });
      }
    }
  );
});

//Delete EUbank
app.post("/DeleteEUBank", (req, res) => {
  const user = req.session.user[0].userID;
  db.query(
    "DELETE FROM EUBankAccounts WHERE (userId) = (?)",
    [user],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log("error : ", err);
      } else {
        db.query(
          "UPDATE  EUBank WHERE (userID) = (?)",
          [0, user],
          (err, result) => {
            console.log("errors: ", err);
          }
        );
        res.send({
          message: "EU account Deleted!",
        });
      }
    }
  );
});

//Delete Inter Bank
app.post("/DeleteInterBank", (req, res) => {
  const user = req.session.user[0].userID;
  db.query(
    "DELETE FROM internationalBankAccounts WHERE (userId) = (?)",
    [user],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log("error : ", err);
      } else {
        db.query(
          "UPDATE internationalBankAccounts WHERE (userID) = (?)",
          [0, user],
          (err, result) => {
            console.log("errors: ", err);
          }
        );
        res.send({
          message: "International account Deleted!",
        });
      }
    }
  );
});

//delet paypal
app.post("/DeletePaypalBank", (req, res) => {
  const user = req.session.user[0].userID;
  db.query(
    "DELETE FROM paypalAccounts WHERE (userId) = (?)",
    [user],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log("error : ", err);
      } else {
        db.query(
          "UPDATE paypalAccounts WHERE (userID) = (?)",
          [0, user],
          (err, result) => {
            console.log("errors: ", err);
          }
        );
        res.send({
          message: "Paypal account Deleted!",
        });
      }
    }
  );
});

//Delete Skrill
app.post("/DeleteSkrillBank", (req, res) => {
  const user = req.session.user[0].userID;
  db.query(
    "DELETE FROM skrillAccounts WHERE userId = 1",
    [user],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log("error : ", err);
      } else {
        db.query(
          "UPDATE skrillAccounts WHERE (userID) = (?)",
          [0, user],
          (err, result) => {
            console.log("errors: ", err);
          }
        );
        res.send({
          message: "Skrill account Deleted!",
        });
      }
    }
  );
});

app.get("/getSellersTopTradeHistory", (req, res) => {
  const param = req.body.sellerID;
  db.query(
    "SELECT TOP (3) FROM feedback WHERE sellerUserID = ?",
    [param],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ result });
      }
    }
  );
});

app.get("/getSellerNoTrades", (req, res) => {
  const param = req.body.sellerID;
  db.query(
    "SELECT * FROM saleHistory WHERE userID =? ",
    [param],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result.length);
      }
    }
  );
});

app.post("/OpenTrade", (req, res) => {
  let saleID = req.body.saleID;
  let sellerID = req.body.sellerID;
  let buyerID = req.session.user[0].userID;
  var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  let paymentMethod = req.body.paymentMethod;
  let userSolPrice = req.body.userSolPrice;
  let amountOfSol = req.body.amountOfSol;
  let fiatAmount = req.body.fiatAmount;
  let paymentCurrency = req.body.paymentCurrency;
  let message = req.body.message;
  let reference = crypto.randomBytes(5).toString("hex");
  let no = "NO";

  db.query(
    "INSERT INTO LiveTrades (saleID, sellerID, buyerID, Date, paymentMethod, userSolPrice, amountOfSol, fiatAmount, paymentCurrency, Message, Reference, paymentRecieved, escrowReleaseTime) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      saleID,
      sellerID,
      buyerID,
      date,
      paymentMethod,
      userSolPrice,
      amountOfSol,
      fiatAmount,
      paymentCurrency,
      message,
      reference,
      no,
      date,
    ],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send({
          message: "Succesfully opened the trade",
        });
      }
    }
  );
});

//CLOSE TRADE
app.post("/UpdateLiveListing", (req, res) => {
  const sellerID = req.session.user[0].userID;
  const saleID = req.body.saleID;


  var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
  db.query(
    "Update liveTrades SET paymentRecieved = ?, escrowReleaseTime = ? , WHERE sellerID = ? && saleID = ?",
    ["YES", date, sellerID, saleID],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
    }});
});

app.post("/CloseTrade", (req,res) => {

  const buyerID = req.session.user[0].userID;
  const saleID = req.body.saleID;
  const sellerID = req.body.sellerID;
  const feedbackScore = req.body.feedbackScore;
  const feedbackComment = req.body.feedbackComment;

 
  db.query(
    "")

  //Calculate escrow release time and add to feedback db

  //delete trade from live trade and copy to tardeHistory db


})

app.post("/GetLiveTradeInfo", (req, res) => {
  const sellerID = req.body.sellerID;
  const buyerID = req.session.user[0].userID;
  const paymentMethod = req.body.paymentMethod;
  let reference = " ";

  db.query(
    "SELECT Reference FROM LiveTrades WHERE sellerID = ? AND buyerID = ?",
    [sellerID, buyerID],
    (err, result) => {
      if (err) {
        res.send(err);  
      } else {
        reference =  result[0].Reference;
        console.log(result[0].Reference);
        switch(paymentMethod){
     
          case "UK Bank Transfer":
            db.query(
              "SELECT Name, sortCode, accountNumber FROM UKBankAccounts WHERE userID = ?",
              [sellerID],
              (err, result) => {
                if (err) {
                  res.send(err);
                } else {
                  res.send({
                    name: result[0].Name,
                    sortCode: result[0].sortCode,
                    accountNumber: result[0].accountNumber,
                    reference: reference,
                  });
                }
              }
            );
            break;
            case "EU Bank Transfer":
             db.query(
               "SELECT bankName, BIC, IBAN FROM EUBankAccounts WHERE userID = ?",
               [sellerID],
               (err, result) => {
                 if (err) {
                   res.send(err);
                 } else {
                   res.send({
                     bankName: result[0].bankName,
                     BIC: result[0].BIC,
                     IBAN: result[0].IBAN,
                     reference: reference,
                   });
                 }
               }  
             );
             break;
             case "International Wire Transfer":
              db.query(
                "SELECT bankName, bankCity, bankCountry, SWIFTCode, payeesName, interBankName, interBankCity, interBankCountry, interBankAccountNumber, interBankRoutingNumber FROM internationalBankAccounts WHERE userID = ?",
                [sellerID],
                (err, result) => {
                  if (err) {
                    res.send(err);
                  } else {
                    res.send({
                      bankName: result[0].bankName,
                      bankCity: result[0].bankCity,
                      bankCountry: result[0].bankCountry,
                      SWIFTCode: result[0].SWIFTCode,
                      payeesName: result[0].payeesName,
                      interBankName: result[0].interBankName,
                      interBankCity: result[0].interBankCity,
                      interBankCountry: result[0].interBankCountry,
                      interBankAccountNumber: result[0].interBankAccountNumber,
                      interBankRoutingNumber: result[0].interBankRoutingNumber,
                      reference: reference,
                    });
                  }
                }  
              );
              break;
              case "Paypal Transfer":
              db.query(
                "SELECT paypalEmail FROM paypalAccounts WHERE userID = ?",
                [sellerID],
                (err, result) => {
                  if (err) {
                    res.send(err);
                  } else {
                    res.send({
                      paypalEmail: result[0].paypalEmail,
                      reference: reference,
                    });
                  }
                }  
              );
              break;
              case "Skrill Transfer":
              db.query(
                "SELECT paypalEmail FROM skrillAccounts WHERE userID = ?",
                [sellerID],
                (err, result) => {
                  if (err) {
                    res.send(err);
                  } else {
                    res.send({
                      skrillEmail: result[0].skrillEmail,
                      reference: reference,
                    });
                  }
                }  
              );
        };  
    }});

   
  


});

//Update functionality for updating the user lisitngs
app.post("/UpdateMyListings", (req, res) => {
  const userID = req.session.user[0].userID;
  const saleID = req.body.saleID;
  const amountForSale = req.body.amountForSale;
  const aboveOrBelow = req.body.aboveOrBelow;
  const percentChange = req.body.percentChange;
  const paymentMethod1 = req.body.paymentMethod1;
  const paymentMethod2 = req.body.paymentMethod2;

  db.query(
    "UPDATE sale SET amountForSale = ?, aboveOrBelow = ?, percentChange =? , paymentMethod1 = ?, paymentMethod2 = ?  Where userID = ? AND saleID =?",
    [
      amountForSale,
      aboveOrBelow,
      percentChange,
      paymentMethod1,
      paymentMethod2,
      userID,
      saleID,
    ],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send({
          message: "Lisiting succefully updated!",
        });
      }
    }
  );
});

app.post("/DeleteMyLisiting", (req, res) => {
  const saleID = req.body.saleID;
  db.query("DELETE FROM sale Where saleID = ?", [saleID], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send({
        message: "Listing succesfully deleted!",
      });
    }
  });
});

//Functionality to get information baout the seller
app.post("/GetSellerInfo", (req, res) => {
  const sellerID = req.body.sellerID;
  let registeredDate = " ";
  let feedbackScore = " ";
  let escrowReleaseTime = " ";

  db.query(
    "SELECT registeredDate FROM users WHERE (userID) = (?)",
    [sellerID],
    (err, result) => {
      registeredDate = result[0].registeredDate;
    }
  );

  db.query(
    "SELECT AVG(feedbackScore) as feedbackScore from feedback WHERE (sellerUserID) = (?)",
    [sellerID],
    (err, results) => {
      feedbackScore = results[0].feedbackScore;
    }
  );

  db.query(
    "SELECT AVG(EscrowReleaseTime) as escrowReleaseTime from feedback WHERE (sellerUserID) = (?)",
    [sellerID],
    (err, resultss) => {
      escrowReleaseTime = resultss[0].escrowReleaseTime;

      res.send({
        sellerID: sellerID,
        registeredDate: registeredDate,
        feedbackScore: feedbackScore,
        escrowReleaseTime: escrowReleaseTime,
      });
    }
  );
});

app.post("/FindUserPaymentMethods", (req, res) => {
  const userID = req.session.user[0].userID;
  
  db.query(
    "SELECT * FROM userPaymentAccounts WHERE (userID) = (?)",
    [userID],
    (err, result) => {
      console.log(result);
      res.send(result);
    }
  );

});

app.post("/GetLiveTradesBuyer", (req, res) => {
  const userID = req.session.user[0].userID;
  db.query(
    "SELECT * FROM LiveTrades WHERE (buyerid) = (?)",
    [userID],
    (err, result) => {
      if (err) {
        res.send(err);
      } else if (result.length === 0 ) {
        res.send({
          message: "No live trades",
        })
      } else {
        res.send(result);
      }
    }
  )
});

app.post("/GetLiveTradesSeller", (req, res) => {
  const userID = req.session.user[0].userID;
  db.query(
    "SELECT * FROM LiveTrades WHERE (sellerid) = (?)",
    [userID],
    (err, result) => {
      if (err) {
        res.send(err);
      } else if (result.length === 0 ) {
        res.send({
          message: "No live trades",
        })
      } else {
        res.send(result);
      }
    }
  )  
});



server.listen(3002, () => {
  console.log("SERVER RUNNING");
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
