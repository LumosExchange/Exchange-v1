import react, { useState } from "react";
import "../App.css";

function Account() {
  const [firstName, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  return (
    <div class="form">
      <h1>My account (Tier: New User)</h1>
      <div class="subtitle">Your Account details are</div>
      <div class="input-container ic1">
        <label for="firstName" class="placeholder">
          First name
        </label>
        <input
          id="firstName"
          class="input"
          type="text"
          placeholder=" "
          onChange={(e) => {
            setFirstNameReg(e.target.value);
          }}
        />
        <div class="cut"></div>
      </div>

      <div class="input-container ic2">
        <label for="lastName" class="placeholder">
          Last name
        </label>
        <input
          id="lastName"
          class="input"
          type="text"
          placeholder=" "
          onChange={(e) => {
            setLastNameReg(e.target.value);
          }}
        />
        <div class="cut"></div>
      </div>

      <div class="input-container ic2">
        <label for="email" class="placeholder">
          Email
        </label>
        <input
          id="email"
          class="input"
          type="text"
          placeholder=" "
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
        <div class="cut cut-short"></div>
      </div>

      <div class="input-container ic2">
        <label for="password1" class="placeholder">
          Password
        </label>
        <input
          id="password1"
          class="input"
          type="password"
          placeholder=" "
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <div class="cut cut-short"></div>
      </div>
      <h3>
        If you wish to upgrade to Bronze tier{" "}
        <button>
          <a href="/UpgradeBronze">Click here</a>
        </button>
      </h3>
      <h3>
        If you wish to upgrade to Gold tier{" "}
        <button>
          <a href="/UpgradeGold">Click here</a>
        </button>
      </h3>
    </div>
  );
}

export default Account;
