require("dotenv").config();

const bcrypt = require("bcrypt");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const Nexmo = require("nexmo");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
const qrcode = require("qrcode");
const SMTPPool = require("nodemailer/lib/smtp-pool");
const { resolveNaptr } = require("dns");
const { addAbortSignal } = require("stream");
const { send } = require("process");
const multer = require("multer");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const S3 = require("aws-sdk/clients/s3");
const { uploadFile } = require("../../s3");

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

//initiate 2fa speakeasy for google auth
var secret = speakeasy.generateSecret({
  name: "LumosExchange",
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
        "select * from users where email = '" + email + "' limit 1",
        (err, result) => {
          if (err) console.log(err);
          console.log("result", result);
          if (result && result.length) {
            console.log("User Already Exist");
            return res.status(400).send({ error: "User Already Exist" });
          }
          db.query(
            "INSERT INTO users (firstName, lastName, email, password, userName, registeredDate) VALUES (?,?,?,?,?,?)",
            [firstName, lastName, email, hash, userName, date],
            (err, result) => {
              if (err) console.log(err);
            }
          );
          db.query(
            "INSERT INTO userSettings (theme, timezone, currency) VALUES (?,?,?)",
            [theme, timezone, currency],
            (err, result) => {
              if (err) console.log(err);
            }
          );
          db.query(
            "INSERT INTO accountLevel (accountLevel, dateUpgraded) VALUES (?,?)",
            [accountLevel, date],
            (err, result) => {
              if (err) console.log(err);
            }
          );
          db.query(
            "INSERT INTO userAuth (Email, emailVerified, SMS, google, googleSecret, Authy, phoneNumber) VALUES (?,?,?,?,?,?,?)",
            [email, 0, 0, 0, 0, 0, "0"],
            (err, result) => {
              if (err) console.log(err);
            }
          );
          db.query(
            "INSERT INTO userPaymentAccounts (EUBank, UKBank, InterBank, Paypal, Skrill) VALUES (?,?,?,?,?)",
            [0, 0, 0, 0, 0],
            (err, result) => {
              if (err) console.log(err);
            }
          );
          res.send({
            registered: true,
          });
        }
      );
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
  console.log(userName, password);

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

const isUserAuth = async (req, res) => {
  res.send("Authenticated");
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
  const stakeId = req.body.stakeId;
  const sellerAddress = req.body.sellerAddress;

  // Add functionality to store userescrow account (already made the db just need to wire it up)

  var sql =
    "SELECT country AS Country FROM upgradeTiers WHERE (userID) = (?);SELECT city AS Town FROM upgradeTiers WHERE (userID) = (?);SELECT saleID AS SaleID FROM TradeHistory WHERE (sellerID) = (?);SELECT AVG(feedbackScore) as feedbackScore from feedback WHERE (sellerUserID) = (?);";

  db.query(sql, [id, id, id, id], function (error, results) {
    if (error) {
      console.log(error);
    } else {
      console.log(results);
      console.log(results[3][0].feedbackScore);
    }
    console.log("AMOUNT FOR SALEEEEE: ", req.body.amountForSale);

    db.query(
      "INSERT INTO sale (userID, amountForSale, aboveOrBelow, percentChange, userName, Country, Town, paymentMethod1, paymentMethod2, tradeHistory, feedbackScore, stakeId, sellerAddress) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
        stakeId,
        sellerAddress,
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

const VerifyEmail2FA = async (req, res) => {
  const email = req.body.email;
  const userCode = req.body.passcode;

  db.query(
    "SELECT Secret AS Secret FROM TempAuth WHERE (email) = (?)",
    [email],
    (err, result) => {
      if (result[0].Secret.toString() === userCode.toString()) {
        res.send({
          auth: true,
        });
        db.query(
          "DELETE FROM TempAuth WHERE (email) = (?)",
          [email],
          (err, result) => {
            console.log(result);
            db.query(
              "UPDATE userAuth SET emailVerified = ? WHERE Email = ?",
              [1, email],
              (err, result) => {
                console.log(err);
              }
            );
          }
        );
      } else {
        res.send({
          auth: false,
        });
      }
    }
  );
};

const UpgradeSilver = async (req, res) => {
  const file = req.file;

  const user = req.session.user[0].userID;
  const birthDay = req.body.birthDay;
  const birthMonth = req.body.birthMonth;
  const birthYear = req.body.birthYear;

  const date = new Date().toISOString().slice(0, 19).replace("T", "_");

  const fullName =
    req.session.user[0].firstName + " " + req.session.user[0].lastName;

  const result = await uploadFile(file);
  console.log(result);

  var sql =
    "UPDATE upgradeTiers SET birthDay = ?, birthMonth = ?, birthYear = ?  WHERE userID =?; UPDATE accountLevel SET accountLevel=?, dateUpgraded=? WHERE userID =?;Insert INTO TAX SET userID=?, taxDocName=?, dateSubmitted=?;";

  db.query(
    sql,
    [
      birthDay,
      birthMonth,
      birthYear,
      user,
      "Silver",
      date,
      user,
      user,
      result.key,
      date,
    ],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        throw error;
      }
      res.send({
        message: "Account upgraded to Silver",
      });
    }
  );
};

const UpgradeBronze = async (req, res) => {
  const file = req.file;
  const user = req.session.user[0].userID;
  const Name = req.body.name;
  const address = req.body.streetAddress;
  const city = req.body.city;
  const cityState = req.body.cityState;
  const postCode = req.body.postCode;
  const country = req.body.country;

  const date = new Date().toISOString().slice(0, 19).replace("T", "_");

  const result = await uploadFile(file);
  console.log(result);

  //Handle the image and check image type

  //Now update sql upgradeTiers & account level

  var sql =
    "Insert INTO upgradeTiers SET userID=?, legalName=?, address=?, city=?, cityState=?, postCode=?, country=?; UPDATE accountLevel SET accountLevel=?, dateUpgraded=? WHERE userID =?;INSERT INTO KYC set userID =?, documentAddressKYC =?, dateKYC=?;";

  db.query(
    sql,
    [
      user,
      Name,
      address,
      city,
      cityState,
      postCode,
      country,
      "Bronze",
      date,
      user,
      user,
      result.key,
      date,
    ],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        throw error;
      }
    }
  );
  res.send({
    message: "Account upgraded to Bronze",
  });
};

const UpgradeGold = async (req, res) => {
  const file = req.file;
  const user = req.session.user[0].userID;
  const EmployerName = req.body.EmployerName;
  const EmployerAddress = req.body.EmployerAddress;
  const Occupation = req.body.Occupation;
  const Income = req.body.Income;
  const fullName =
    req.session.user[0].firstName + " " + req.session.user[0].lastName;
  const date = new Date().toISOString().slice(0, 19).replace("T", "_");

  const result = await uploadFile(file);
  console.log(result);

  var sql =
    "UPDATE upgradeTiers SET EmployerName = ?, EmployerAddress = ?, Occupation = ?, Income = ?, DateSubmitted = ? WHERE userID = ?;UPDATE accountLevel SET accountLevel = ?, dateUpgraded = ? WHERE userID =?;Insert INTO Employment SET userID=?, employmentDocName=?, dateSubmitted=?;";

  db.query(
    sql,
    [
      EmployerName,
      EmployerAddress,
      Occupation,
      Income,
      date,
      user,
      "Gold",
      date,
      user,
      user,
      result.key,
      date,
    ],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        throw error;
      }
      res.send({
        message: "Account upgraded to Gold",
      });
    }
  );
};

const twoFAEmailVerificationSend = async (req, res) => {
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
      res.send({
        email: req.session.user[0].email,
      });
    }
  );
};

const PassVerification2FA = async (req, res) => {
  const email = req.session.user[0].email;
  const userCode = req.body.passcode;
  const userName = req.session.user[0].userName;
  const userInputPassword = req.body.oldPassword;
  const userPass = req.session.user[0].password;

  var sql = "SELECT Secret AS Secret FROM TempAuth WHERE (email) = (?);";

  db.query(sql, [email, userName], function (err, result, fields) {
    //Check Secret
    if (result[0].Secret.toString() === userCode.toString()) {
      //Check hashed passwords
      bcrypt.compare(userInputPassword, userPass, function (err, result) {
        if (err) {
          //handle error
          res.send({
            error: err,
          });
        }
        if (result) {
          //succesfull and delete temp db secret
          res.send({
            auth: true,
          });
          db.query(
            "DELETE FROM TempAuth WHERE email = ?",
            [email],
            (err, result) => {
              console.log(result);
            }
          );
        } else {
          //Password dont maatch
          res.send({
            auth: false,
            message: "Passwords do not match!",
          });
        }
      });
    } else {
      //Secret dosent match
      res.send({
        auth: false,
        message: "Code does not match!",
      });
    }
  });
};

const updateUserPass = async (req, res) => {
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
        if (err) {
          res.send({
            updated: false,
            message: err,
          });
        }
        res.send({
          updated: true,
          message: "Succesfully updated password.",
        });
      }
    );
  });
};

const getUser2FAOptions = async (req, res) => {
  const user = req.session.user[0].userID;

  db.query(
    "SELECT emailVerified, SMS, google FROM userAuth WHERE (userID) = (?)",
    [user],
    (err, result) => {
      res.send(result);
    }
  );
};

const RegisterUkBank = async (req, res) => {
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
};

const RegisterEUBank = async (req, res) => {
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
};

const RegisterInternationalBank = async (req, res) => {
  const user = req.session.user[0].userID;
  const bankName = req.body.bankName;
  const bankCity = req.body.bankCity;
  const bankCountry = req.body.bankCountry;
  const SWIFTCode = req.body.BIC;
  const payeeName = req.body.payeeName;
  console.log("Payee name: ", payeeName);
  const interBankName = req.body.interBankName;
  const interBankCity = req.body.interBankCity;
  const interBankCountry = req.body.interBankCountry;
  const interBankAccountNumber = req.body.interBankAccountNumber;
  const interBankRoutingNumber = req.body.bankName;

  db.query(
    "INSERT INTO internationalBankAccounts (userID, bankName, bankCity, bankCountry, SWIFTCode, payeeName, interBankName, interBankCity, interBankCountry, interBankAccountNumber, interBankRoutingNumber) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    [
      user,
      bankName,
      bankCity,
      bankCountry,
      SWIFTCode,
      payeeName,
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
};

const RegisterPaypal = async (req, res) => {
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
};

const RegisterSkrill = async (req, res) => {
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
};

const getUkBankDetails = async (req, res) => {
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
};

const getEUBankDetails = async (req, res) => {
  const user = req.session.user[0].userID;
  db.query(
    "SELECT BIC, IBAN, bankName FROM EUBankAccounts WHERE (userID) = (?)",
    [user],
    (err, result) => {
      console.log(err, "error in getEUbankDetails");
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
};

const getInterBankDetails = async (req, res) => {
  const user = req.session.user[0].userID;
  db.query(
    "SELECT bankName, bankCity, bankCountry, SWIFTCode, payeeName, interBankName, interBankCity, interBankCountry, interBankAccountNumber, interBankRoutingNumber FROM internationalBankAccounts WHERE (userID) = (?)",
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
          payeeName: result[0].payeeName,
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
};

const getPaypalDetails = async (req, res) => {
  const user = req.session.user[0].userID;
  db.query(
    "SELECT paypalEmail FROM paypalAccounts WHERE (userID) = (?)",
    [user],
    (err, result) => {
      console.log(err, "error in getPaypalDetails");
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
};

const getSkrillDetails = async (req, res) => {
  const user = req.session.user[0].userID;
  db.query(
    "SELECT skrillEmail FROM skrillAccounts WHERE (userID) = (?)",
    [user],
    (err, result) => {
      console.log(err, "error in getSkrillDetails");
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
};

const getUserPaymentMethods = async (req, res) => {
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
};

const UpdateUkBank = async (req, res) => {
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
};

const UpdateEUBank = async (req, res) => {
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
};

const UpdateInterBank = async (req, res) => {
  const user = req.session.user[0].userID;
  const bankName = req.body.bankName;
  const bankCity = req.body.bankCity;
  const bankCountry = req.body.bankCountry;
  const SWIFTCode = req.body.BIC;
  const payeeName = req.body.payeeName;
  const interBankName = req.body.interBankName;
  const interBankCity = req.body.interBankCity;
  const interBankCountry = req.body.interBankCountry;
  const interBankAccountNumber = req.body.interBankAccountNumber;
  const interBankRoutingNumber = req.body.bankName;

  db.query(
    "UPDATE internationalBankAccounts SET bankName = ?, bankCity = ?, bankCountry = ?, SWIFTCode = ?, payeeName = ?, interBankName = ?, interBankCity = ?, interBankCountry =?, interBankAccountNumber =?, interBankRoutingNumber =?  WHERE userID = ?",
    [
      bankName,
      bankCity,
      bankCountry,
      SWIFTCode,
      payeeName,
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
};

const UpdatePaypal = async (req, res) => {
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
};

const UpdateSkrill = async (req, res) => {
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
};

const DeleteUKBank = async (req, res) => {
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
};

const DeleteEUBank = async (req, res) => {
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
};

const DeleteInterBank = async (req, res) => {
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
};

const DeletePaypalBank = async (req, res) => {
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
};

const DeleteSkrillBank = async (req, res) => {
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
};

const getSellersTopTradeHistory = async (req, res) => {
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
};

const getSellerNoTrades = async (req, res) => {
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
};

const OpenTrade = async (req, res) => {
  let saleID = req.body.saleID;
  let sellerID = req.body.sellerID;
  let buyerID = req.session.user[0].userID;
  var date = new Date().toISOString().slice(0, 19).replace("T", " ");
  let paymentMethod = req.body.paymentMethod;
  let userSolPrice = req.body.userSolPrice;
  let amountOfSol = req.body.amountOfSol;
  let fiatAmount = req.body.fiatAmount;
  let paymentCurrency = req.body.paymentCurrency;
  let message = req.body.message;
  let reference = crypto.randomBytes(5).toString("hex");
  let no = "NO";
  const walletAddress = req.body.walletAddress;
  const stakeId = req.body.stakeId;
  const sellerAddress = req.body.sellerAddress;

  db.query(
    "INSERT INTO LiveTrades (saleID, sellerID, buyerID, Date, paymentMethod, userSolPrice, amountOfSol, fiatAmount, paymentCurrency, Message, Reference, paymentRecieved, escrowReleaseTime, walletAddress, stakeId, sellerAddress) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
      walletAddress,
      stakeId,
      sellerAddress,
    ],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        console.log(result.insertId);
        res.send(result);
      }
    }
  );
};

const UpdateLiveListing = async (req, res) => {
  const sellerID = req.session.user[0].userID;
  const saleID = req.body.saleID;

  var date = new Date().toISOString().slice(0, 19).replace("T", " ");

  db.query(
    "Update liveTrades SET paymentRecieved = ?, escrowReleaseTime = ? , WHERE sellerID = ? && saleID = ?",
    ["YES", date, sellerID, saleID],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};

const GetLiveTradeDetails = async (req, res) => {
  const liveTradeID = req.query.liveTradeID;
  console.log("Live Trade ID : ", liveTradeID);

  db.query(
    "SELECT * FROM LiveTrades WHERE liveTradeID = ?",
    [liveTradeID],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};

const GetLiveTradePaymentInfo = async (req, res) => {
  const sellerID = req.query.sellerID;
  console.log("Seller ID: ", sellerID);
  const paymentMethod = req.query.paymentMethod;
  console.log("Payment Method: ", paymentMethod);

  switch (paymentMethod) {
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
              payeeName: result[0].payeeName,
              interBankName: result[0].interBankName,
              interBankCity: result[0].interBankCity,
              interBankCountry: result[0].interBankCountry,
              interBankAccountNumber: result[0].interBankAccountNumber,
              interBankRoutingNumber: result[0].interBankRoutingNumber,
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
            });
          }
        }
      );
  }
};

const UpdateMyListings = async (req, res) => {
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
};

const DeleteMyListing = async (req, res) => {
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
};

const GetSellerInfo = async (req, res) => {
  const sellerID = req.body.sellerID;
  var sql =
    "SELECT registeredDate FROM users WHERE (userID) = (?);SELECT AVG(feedbackScore) as feedbackScore from feedback WHERE (sellerUserID) = (?);SELECT AVG(EscrowReleaseTime) as escrowReleaseTime from feedback WHERE (sellerUserID) = (?)";

  db.query(
    sql,
    [sellerID, sellerID, sellerID],
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      res.send({
        sellerID: sellerID,
        registeredDate: results[0],
        feedbackScore: results[1],
        escrowReleaseTime: results[2],
      });
    }
  );
};

const FindUserPaymentMethods = async (req, res) => {
  const userID = req.session.user[0].userID;

  db.query(
    "SELECT * FROM userPaymentAccounts WHERE (userID) = (?)",
    [userID],
    (err, result) => {
      console.log(result);
      res.send(result);
    }
  );
};

const GetLiveTradesBuyer = async (req, res) => {
  const userID = req.session.user[0].userID;
  db.query(
    "SELECT * FROM LiveTrades WHERE (buyerid) = (?)",
    [userID],
    (err, result) => {
      if (err) {
        res.send(err);
      } else if (result.length === 0) {
        res.send({
          message: "No live trades",
        });
      } else {
        res.send(result);
      }
    }
  );
};

const GetLiveTradesSeller = async (req, res) => {
  const userID = req.session.user[0].userID;
  db.query(
    "SELECT * FROM LiveTrades WHERE (sellerid) = (?)",
    [userID],
    (err, result) => {
      if (err) {
        res.send(err);
      } else if (result.length === 0) {
        res.send({
          message: "No live trades",
        });
      } else {
        res.send(result);
      }
    }
  );
};

const updateLiveTradePayment = async (req, res) => {
  const liveTadeID = req.body.liveTradeID;
  const userName = req.body.userName;

  const String =
    "Please note " + userName + " has confirmed they have sent the payment";

  db.query(
    "UPDATE LiveTrades SET paymentRecieved = ?, Message = ? WHERE LiveTradeID = ?",
    ["YES", String, liveTadeID],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(" error : ", err);
      } else {
        res.send({
          update: true,
        });
      }
    }
  );
};

const GetTradeFeedbackInfo = async (req, res) => {
  const id = req.query.ID;
  console.log(req.query);
  console.log(req.params);

  console.log("ID for feedback:", id);

  var sql =
    "SELECT registeredDate AS date FROM users WHERE (userID) = (?);SELECT COUNT (*) AS total FROM TradeHistory WHERE (sellerID) = (?) OR (buyerID) = (?);SELECT AVG (feedbackScore) as feedback FROM feedback WHERE (sellerUserID) = (?) OR (buyerUserID) = (?)";

  db.query(sql, [id, id, id, id, id], function (error, results, fields) {
    if (error) {
      throw error;
    }
    const score = (results[2][0].feedback / 3) * 100;
    res.send({
      registeredDate: results[0],
      totalTrades: results[1],
      feedbackScore: score,
    });
  });
};

const CompleteTrade = async (req, res) => {
  const liveTradeID = req.body.liveTradeID;
  const feedbackMessage = req.body.feedbackMessage;
  const feedbackScore = req.body.formattedFeedBack;
  const sellerID = req.body.sellerID;
  const buyerID = req.body.buyerID;
  const saleID = req.body.saleID;
  const solAmount = req.body.solAmount;
  var date = new Date().toISOString().slice(0, 19).replace("T", " ");

  let EscrowTime = " ";

  var sql =
    "UPDATE LiveTrades SET escrowReleaseTime = ? WHERE LiveTradeID = ?;INSERT INTO TradeHistory SELECT * FROM LiveTrades WHERE LiveTradeID = ?;";

  //Update the escrow release time && insert into tradeHistory
  db.query(
    sql,
    [date, liveTradeID, liveTradeID],
    function (error, results, fields) {
      if (error) {
        throw error;
      }
    }
  );

  //Remove sol from listing total

  db.query(
    "SELECT amountForSale FROM sale WHERE saleID =? ",
    [saleID],
    (err, results) => {
      let newTotal = results[0].amountForSale - solAmount;

      db.query(
        "UPDATE sale SET amountForSale =? WHERE saleID =?",
        [newTotal, saleID],
        (err, results) => {
          if (err) {
            throw err;
          }
        }
      );
    }
  );

  //update feedback and calulate escrow release time
  db.query(
    "SELECT Date, escrowReleaseTime, TIMESTAMPDIFF(SECOND, Date, escrowReleaseTime) AS escrowTime FROM LiveTrades WHERE  LiveTradeID = ?",
    [liveTradeID],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        db.query(
          "INSERT INTO feedback (saleID, sellerUserID, EscrowReleaseTime, comment, date, buyerUserID, feedbackScore) VALUES (?,?,?,?,?,?,?)",
          [
            liveTradeID,
            sellerID,
            result[0].escrowTime,
            feedbackMessage,
            date,
            buyerID,
            feedbackScore,
          ],
          (err, resultss) => {
            if (err) {
              console.log(err);
              res.send({
                tradeComplete: false,
                error: err,
              });
            } else {
              res.send({
                tradeComplete: true,
              });
            }
          }
        );
      }
    }
  );

  //delete trade from live lisiting
  db.query(
    "DELETE FROM LiveTrades WHERE LiveTradeID = ?",
    [liveTradeID],
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
      }
    }
  );
};

const AddWallet = async (req, res) => {
  const userID = req.session.user[0].userID;
  const walletID = req.body.walletID;
  const walletAddress = req.body.walletAddress;
  const walletType = req.body.type;

  //check if user has a wallet if not insert else update

  db.query(
    "SELECT * FROM SolAddress WHERE (userID) = (?)",
    [userID],
    (err, result) => {
      if (result.length <= 0) {
        //Insert
        db.query(
          "INSERT INTO SolAddress (userID, sol" +
            walletID +
            ", Type" +
            walletID +
            ") VALUES (?,?,?)",
          [userID, walletAddress, walletType],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              console.log(result);
              res.send({
                message: "Succesfully added wallet",
              });
            }
          }
        );
      } else {
        //Update
        db.query(
          "UPDATE SolAddress SET sol" +
            walletID +
            " =?, Type" +
            walletID +
            "=? WHERE userID =?",
          [walletAddress, walletType, userID],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              console.log(result);
              res.send({
                message: "Wallet address succesfully Added!",
              });
            }
          }
        );
      }
    }
  );
};

const EditWallet = async (req, res) => {
  const userID = req.session.user[0].userID;
  const walletID = req.body.walletID;
  const walletAddress = req.body.walletAddress;

  db.query(
    "UPDATE SolAddress SET sol" +
      walletID +
      " =?, Type" +
      walletID +
      "=? WHERE userID =?",
    [walletAddress, walletType, userID],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send({
          message: "Wallet address succefully updated!",
        });
      }
    }
  );
};

const DeleteWallet = async (req, res) => {
  const userID = req.session.user[0].userID;
  const walletID = req.body.walletID;
  const walletAddress = req.body.walletAddress;

  db.query(
    "UPDATE SolAddress SET sol" +
      walletID +
      " =?, Type" +
      walletID +
      "=? WHERE userID =?",
    [0, 0, userID],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send({
          message: "Wallet succesfully deleted",
        });
      }
    }
  );
};

const GetWallets = async (req, res) => {
  const userID = req.session.user[0].userID;

  db.query(
    "SELECT * FROM SolAddress WHERE (userID) = (?)",
    [userID],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        if (result[0] !== undefined) {
          res.send([
            { walletID: 1, address: result[0].sol1, type: result[0].Type1 },
            {
              walletID: 2,
              address: result[0].sol2,
              type: result[0].Type2,
            },
            {
              walletID: 3,
              address: result[0].sol3,
              type: result[0].Type3,
            },
            {
              walletID: 4,
              address: result[0].sol4,
              type: result[0].Type4,
            },
            {
              walletID: 5,
              address: result[0].sol5,
              type: result[0].Type5,
            },
          ]);
        } else {
          res.send([
            { walletID: 1, address: "", type: "" },
            {
              walletID: 2,
              address: "",
              type: "",
            },
            {
              walletID: 3,
              address: "",
              type: "",
            },
            {
              walletID: 4,
              address: "",
              type: "",
            },
            {
              walletID: 5,
              address: "",
              type: "",
            },
          ]);
        }
      }
    }
  );
};

const FeedbackComments = async (req, res) => {
  const userID = req.body.userID;

  db.query(
    "SELECT feedbackScore, date, comment FROM feedback WHERE (sellerUserID) = (?) OR (buyerUserID) = (?)",
    [userID, userID],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
};

const TradeHistory = async (req, res) => {
  const userID = req.session.user[0].userID;

  db.query(
    "SELECT * FROM TradeHistory WHERE (sellerID) = (?) OR (buyerID) = (?)",
    [userID, userID],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};

const GetFeedbackPage = async (req, res) => {
  const userID = req.body.userID;
  var sql =
    "SELECT userName FROM users WHERE (userID) = (?);SELECT COUNT (*) AS total FROM TradeHistory WHERE (sellerID) = (?) OR (buyerID) = (?);SELECT AVG (feedbackScore) AS feedback FROM feedback WHERE (sellerUserID) = (?) OR (buyerUserID) = (?);SELECT country AS country FROM upgradeTiers WHERE (userID) = (?);SELECT registeredDate AS registeredDate FROM users WHERE (userID) = (?);SELECT emailVerified, SMS FROM userAuth WHERE (userID) = (?)";

  db.query(
    sql,
    [
      userID,
      userID,
      userID,
      userID,
      userID,
      userID,
      userID,
      userID,
      userID,
      userID,
    ],
    function (error, results, fields) {
      if (error) {
        console.log(err);
        throw error;
      }

      res.send({
        userName: results[0],
        totalTrades: results[1],
        feedbackScore: results[2],
        country: results[3],
        registeredDate: results[4],
        verified: results[5],
      });
    }
  );
};

const CheckSaleEligibility = async (req, res) => {
  const userID = req.session.user[0].userID;

  //Get current user account level
  var sql =
    "SELECT accountLevel as accountLevel FROM accountLevel WHERE (userID) = (?);SELECT SUM(amountOfSol) as amountOfSol FROM TradeHistory WHERE (sellerID) = (?);";

  db.query(sql, [userID, userID], function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    console.log("Amount for sale: ", results[1]);
    console.log("Amount for sale: ", results[1][0].amountOfSol);
    if (results[1][0] === null) {
    }

    switch (results[0][0].accountLevel) {
      case "Standard":
        res.send({
          userID: userID,
          accountLevel: "Standard",
          solLimit: 1,
          amountSolSold: results[1][0].amountOfSol || 0,
        });
        break;
      case "Bronze":
        res.send({
          userID: userID,
          accountLevel: "Bronze",
          solLimit: 5,
          amountSolSold: results[1][0].amountOfSol || 0,
        });
        break;
      case "Silver":
        res.send({
          userID: userID,
          accountLevel: "Silver",
          solLimit: 10,
          amountSolSold: results[1][0].amountOfSol || 0,
        });
        break;
      case "Gold":
        res.send({
          userID: userID,
          accountLevel: "Gold",
          solLimit: 25,
          amountSolSold: results[1][0].amountOfSol || 0,
        });
        break;
    }
  });

  //Check the account level and return maximum amount of sol the user can sell
};

module.exports = {
  register,
  login,
  checkLogin,
  logout,
  isUserAuth,
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
  VerifyEmail2FA,
  UpgradeSilver,
  UpgradeBronze,
  UpgradeGold,
  twoFAEmailVerificationSend,
  PassVerification2FA,
  updateUserPass,
  getUser2FAOptions,
  RegisterUkBank,
  RegisterEUBank,
  RegisterInternationalBank,
  RegisterPaypal,
  RegisterSkrill,
  getUkBankDetails,
  getEUBankDetails,
  getInterBankDetails,
  getPaypalDetails,
  getSkrillDetails,
  getUserPaymentMethods,
  UpdateUkBank,
  UpdateEUBank,
  UpdateInterBank,
  UpdatePaypal,
  UpdateSkrill,
  DeleteUKBank,
  DeleteEUBank,
  DeleteInterBank,
  DeletePaypalBank,
  DeleteSkrillBank,
  getSellersTopTradeHistory,
  getSellerNoTrades,
  OpenTrade,
  UpdateLiveListing,
  GetLiveTradeDetails,
  GetLiveTradePaymentInfo,
  UpdateMyListings,
  DeleteMyListing,
  GetSellerInfo,
  FindUserPaymentMethods,
  GetLiveTradesBuyer,
  GetLiveTradesSeller,
  updateLiveTradePayment,
  GetTradeFeedbackInfo,
  CompleteTrade,
  AddWallet,
  EditWallet,
  DeleteWallet,
  GetWallets,
  FeedbackComments,
  TradeHistory,
  GetFeedbackPage,
  CheckSaleEligibility,
};
