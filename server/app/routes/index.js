const express = require("express");
const router = express.Router();
const fs = require("fs");

const {
  register,
  login,
  checkLogin,
  logout,
  getUserInfo,
} = require("../controllers/index");

router.post("/register", register);
router.post("/login", login);
//Login functionality
//check logged in state
router.get("/login", checkLogin);
router.post("/logout", logout);
router.post("/getUserInfo", getUserInfo);

module.exports = router;
