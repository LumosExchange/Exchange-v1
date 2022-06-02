const express = require("express");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");

const {
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
  SendEmailVerification
} = require("../controllers/index");

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

router.post("/register", register);
router.post("/login", login);
//Login functionality
//check logged in state
router.get("/login", checkLogin);
router.post("/logout", logout);
router.post("/getUserInfo", getUserInfo);
//check authentication
router.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("Authenticated");
});
//Create sell functionality
router.post("/sell", sell);
//Get users open listings
router.get("/getListings", getListings);
//get Sales for buyers this will eventually take parameters to specify the types of payments from the seller
router.get("/getAllListings", getAllListings);
//get userID name for feedback
router.get("/getUserNameSeller", getUserNameSeller);
router.get("/getUserNameBuyer", getUserNameBuyer);
//get username for navbar after user is logegd in
router.get("/getUserNameNav", getUserNameNav);
//get email for profile page
router.get("/getUserEmail", getUserEmail);
router.get("/getUserSettings", getUserSettings);
//gte user account level for profile page
router.get("/getUserAccountLevel", getUserAccountLevel);
router.get("/getUserID", getUserID);
router.get("/getUserLocation", getUserLocation);
//update user settings
router.post("/updateUserSettings", updateUserSettings);
//creates secret for 2fa app
router.post("/getSecret", getSecret);
//Get 6 digit passcode from user & get base32
router.get("/VerifyGoogle2FASetup", VerifyGoogle2FASetup);
//maybe chnage this to post
router.post("/VonageSMSRequest", VonageSMSRequest);
router.post("/VonageSMSVerify", VonageSMSVerify);
router.post("/SendEmailVerification", SendEmailVerification);

module.exports = router;
