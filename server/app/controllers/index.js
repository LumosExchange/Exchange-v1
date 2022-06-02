const bcrypt = require("bcrypt");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const Nexmo = require("nexmo");

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

//create nexmo request
const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
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

const sell = async (req, res) => {
  const amountForSale = req.body.amountForSale;
  const aboveOrBelow = req.body.aboveOrBelow;
  const change = req.body.change;
  const userName = req.session.user[0].userName;
  const id = req.session.user[0].userID;
  const payment1 = req.body.payment1;
  const payment2 = req.body.payment2;

  var sql =
    "SELECT country AS Country FROM upgradeTiers WHERE (userID) = (?);SELECT city AS Town FROM upgradeTiers WHERE (userID) = (?);SELECT saleID AS SaleID FROM TradeHistory WHERE (sellerID) = (?);SELECT AVG(feedbackScore) as feedbackScore from feedback WHERE (sellerUserID) = (?);";

  db.query(sql, [id, id, id, id], function (error, results) {
    if (error) {
      console.log(error);
    } else {
      console.log(results);
      console.log(results[3][0].feedbackScore);
    }

    db.query(
      "INSERT INTO sale (userID, amountForSale, aboveOrBelow, percentChange, userName, Country, Town, paymentMethod1, paymentMethod2, tradeHistory, feedbackScore) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
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
        results[3][0].feedbackScore || 0,
      ],
      (err, resultt) => {
        if (err) {
          res.send({
            error: err,
            saleListing: false,
          });
        } else {
          res.send({
            saleListing: true,
          });
        }
        console.log(err);
      }
    );
  });
};

const getListings = async (req, res) => {
  const id = req.session.user[0].userID;

  db.query("SELECT * FROM sale WHERE (userID) = (?)", [id], (err, result) => {
    res.send(result);
    console.log(err);
  });
};

const getAllListings = async (req, res) => {
  db.query("SELECT * FROM sale", (err, result) => {
    res.send(result);
    console.log(err);
  });
};

const getUserNameSeller = async (req, res) => {
  let params = req.query.sellerID;
  db.query(
    "SELECT userName FROM users WHERE (userID) = (?)",
    [params],
    (err, result) => {
      res.send(result);
    }
  );
};

const getUserNameBuyer = async (req, res) => {
  let params = req.query.buyerID;
  db.query(
    "SELECT userName FROM users WHERE (userID) = (?)",
    [params],
    (err, result) => {
      res.send(result);
    }
  );
};

const getUserNameNav = async (req, res) => {
  const name = req.session.user[0].userName;
  res.send(name);
};

const getUserEmail = async (req, res) => {
  const email = req.session.user[0].email;
  res.send(email);
};

const getUserSettings = async (req, res) => {
  const user = req.session.user[0].userID;

  db.query(
    "SELECT * FROM userSettings WHERE (userID) = (?)",
    [user],
    (err, result) => {
      res.send(result);
    }
  );
};

const getUserAccountLevel = async (req, res) => {
  const user = req.session.user[0].userID;

  db.query(
    "SELECT accountLevel FROM accountLevel WHERE (userID) = (?)",
    [user],
    (err, result) => {
      res.send(result);
    }
  );
};

const getUserID = async (req, res) => {
  console.log(req.session);
  //   const id = req.session.user[0].userID;
  //   res.send(id);
  const id = req.session.user[0].userID;
  res.send(id.toString()); //id -> id.toString()
};

const getUserLocation = async (req, res) => {
  const id = req.session.user[0].userID;

  db.query(
    "SELECT country FROM upgradeTiers WHERE (userID) = (?)",
    [id],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send({
        location: result[0].country,
      });
    }
  );
};

const updateUserSettings = async (req, res) => {
  const timezone = req.body.timezone;
  const currency = req.body.currency;
  const user = req.session.user[0].userID;

  console.log(timezone, "selected timezone");
  console.log(currency, "selected currency");
  console.log(user, "selected user");

  db.query(
    "UPDATE userSettings SET currency = ?, timezone = ? WHERE userID = ?",
    [currency, timezone, user],
    (err, result) => {
      res.send(result);
      console.log(err);
    }
  );
};

const getSecret = async (req, res) => {
  var secret = speakeasy.generateSecret({
    name: "Lumos Exchange",
  });

  res.send(secret);
};

const VerifyGoogle2FASetup = async (req, res) => {
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
    "UPDATE userAuth SET googleSecret = ?, google = ?  WHERE userID = ?",
    [secret, 1, user],
    (err, result) => {
      console.log(err);
    }
  );
  res.send(verified);
};

const VonageSMSRequest = async (req, res) => {
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
      if (result.status > 0) {
        //if error let the user know
        res.send({
          status: result.status,
          errorMessage: result.error_text,
        });
        console.log("error: ", err);
      } else {
        console.log("---- result", result);
        //send back request ID as need for the verify step
        res.send({
          status: result.status,
          requestId: result.request_id,
        });
      }
    }
  );
};

const VonageSMSVerify = async (req, res) => {
  //user needs to send request id and code for authetication
  const user = req.session.user[0].userID;

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
        if (result.status == "0") {
          //Store user phone number in db
          db.query(
            "UPDATE userAuth SET phoneNumber = ?, SMS = ? WHERE userID = ?",
            [req.body.number, 1, user],
            (err, result) => {
              console.log(err);
              console.log("Phone number added to db");
            }
          );
          res.send({ result: result.status, message: "SMS Verified! " });
        } else {
          res.send({ result: result.status, message: result.error_text });
        }
      }
    }
  );
};

const SendEmailVerification = async (req, res) => {
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
    [req.body.email, text],
    (err, result) => {
      res.send({
        emailSent: true,
      });
    }
  );
};

module.exports = {
  register,
  login,
  checkLogin,
  logout,
  getUserInfo,
  sell,
  getListings,
  getAllListings,
  getUserNameSeller,
  getUserNameBuyer,
  getUserNameNav,
  getUserEmail,
  getUserSettings,
  getUserAccountLevel,
  getUserID,
  getUserLocation,
  updateUserSettings,
  getSecret,
  VerifyGoogle2FASetup,
  VonageSMSRequest,
  VonageSMSVerify,
  SendEmailVerification,
};
