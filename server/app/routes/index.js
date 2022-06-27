const express = require("express");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const SMTPPool = require("nodemailer/lib/smtp-pool");
const { resolveNaptr } = require("dns");
const { addAbortSignal } = require("stream");
const { send } = require("process");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const S3 = require("aws-sdk/clients/s3");

const {
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
} = require("../controllers/index");

const upload = multer({ dest: "uploads/" });

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
router.get("/isUserAuth", verifyJWT, isUserAuth);
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
router.post("/VerifyEmail2FA", VerifyEmail2FA);
//UpgradeSilver
router.post("/UpgradeBronze", upload.single("file"), UpgradeBronze);
router.post("/UpgradeSilver", upload.single("file"), UpgradeSilver);
//UpgradeGold
router.post("/UpgradeGold", upload.single("file"), UpgradeGold);
//this email verification will be built for chnaging 2fa options
router.post("/2FAEmailVerificationSend", twoFAEmailVerificationSend);
//this email verification will be built for chnaging 2fa options
router.post("/Email&PassVerification2FA", PassVerification2FA);
//update user password
router.post("/updateUserPass", updateUserPass);
router.post("/getUser2FAOptions", getUser2FAOptions);
//SETTING UP PAYMENT TO BANKS
//register uk bank account
router.post("/RegisterUkBank", RegisterUkBank);
//register EU bank account
router.post("/RegisterEUBank", RegisterEUBank);
//Register International bank account
router.post("/RegisterInternationalBank", RegisterInternationalBank);
//Register paypal
router.post("/RegisterPaypal", RegisterPaypal);
//Register Skrill address
router.post("/RegisterSkrill", RegisterSkrill);
//get User bank details for Profile
router.post("/getUkBankDetails", getUkBankDetails);
//get user EU Bank details for profile
router.post("/getEUBankDetails", getEUBankDetails);
//get international bank details for profile FINISH THIS
router.post("/getInterBankDetails", getInterBankDetails);
router.post("/getPaypalDetails", getPaypalDetails);
//Get Skrill details for profile
router.post("/getSkrillDetails", getSkrillDetails);
//return all user payment methords
router.post("/getUserPaymentMethods", getUserPaymentMethods);
//Update Uk bank
router.post("/UpdateUkBank", UpdateUkBank);
//Update Eu Bank
router.post("/UpdateEUBank", UpdateEUBank);
//Update International Bank
router.post("/UpdateInterBank", UpdateInterBank);
//Update Paypal
router.post("/UpdatePaypal", UpdatePaypal);
//Update Skrill
router.post("/UpdateSkrill", UpdateSkrill);
//delete UK bank
router.post("/DeleteUKBank", DeleteUKBank);
//Delete EUbank
router.post("/DeleteEUBank", DeleteEUBank);
//Delete Inter Bank
router.post("/DeleteInterBank", DeleteInterBank);
//delet paypal
router.post("/DeletePaypalBank", DeletePaypalBank);
//Delete Skrill
router.post("/DeleteSkrillBank", DeleteSkrillBank);
router.get("/getSellersTopTradeHistory", getSellersTopTradeHistory);
router.get("/getSellerNoTrades", getSellerNoTrades);
router.post("/OpenTrade", OpenTrade);
//CLOSE TRADE
router.post("/UpdateLiveListing", UpdateLiveListing);
router.get("/GetLiveTradeDetails", GetLiveTradeDetails);
router.get("/GetLiveTradePaymentInfo", GetLiveTradePaymentInfo);
//Update functionality for updating the user lisitngs
router.post("/UpdateMyListings", UpdateMyListings);
router.post("/DeleteMyListing", DeleteMyListing);
//Functionality to get information about the seller
router.post("/GetSellerInfo", GetSellerInfo);
router.post("/FindUserPaymentMethods", FindUserPaymentMethods);
router.post("/GetLiveTradesBuyer", GetLiveTradesBuyer);
router.post("/GetLiveTradesSeller", GetLiveTradesSeller);
router.post("/updateLiveTradePayment", updateLiveTradePayment);
router.get("/GetTradeFeedbackInfo", GetTradeFeedbackInfo);
router.post("/CompleteTrade", CompleteTrade);
//ADD WALLET
router.post("/AddWallet", AddWallet);
//EDIT WALLET
router.post("/EditWallet", EditWallet);
//DELETE WALLET
router.post("/DeleteWallet", DeleteWallet);
router.post("/GetWallets", GetWallets);
router.post("/FeedbackComments", FeedbackComments);
router.post("/TradeHistory", TradeHistory);
router.post("/GetFeedbackPage", GetFeedbackPage);
router.post("/CheckSaleEligibility", CheckSaleEligibility);

module.exports = router;
