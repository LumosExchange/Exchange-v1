import React, { useState } from "react";
import "../App.css";
import Axios from "axios";

function UpgradeGold() {
  const [employerNameReg, setEmployerNameReg] = useState("");
  const [employerAddressReg, setEmployerAddressReg] = useState("");

  const [occupationReg, setOccupationReg] = useState("");
  const [incomeReg, setIncomeReg] = useState("");

  const upgradeGold = () => {
    Axios.post("http://localhost:3001/upgradeGold", {
      EmployerName: employerNameReg,
      EmployerAddress: employerAddressReg,
      Occupation: occupationReg,
      Income: incomeReg,
    });
  };

  return (
    <div class="form">
      <div class="subtitle">
        <h1>Let's upgrade to gold tier!</h1>
      </div>
      <div class="input-container ic1">
        <label for="EmployerName" class="placeholder">
          Employer Name
        </label>
        <input
          id="Employer Name"
          class="input"
          type="text"
          placeholder=" "
          onChange={(e) => {
            setEmployerNameReg(e.target.value);
          }}
        />
        <div class="cut"></div>
      </div>

      <div class="input-container ic2">
        <label for="Employeraddress" class="placeholder">
          Employer Address
        </label>
        <input
          id="Employer address"
          class="input"
          type="text"
          placeholder=" "
          onChange={(e) => {
            setEmployerAddressReg(e.target.value);
          }}
        />
        <div class="cut"></div>
      </div>

      <div class="input-container ic2">
        <label for="Occupation" class="placeholder">
          Occupation
        </label>
        <input
          id="Occupation"
          class="input"
          type="Occupation"
          placeholder=" "
          onChange={(e) => {
            setOccupationReg(e.target.value);
          }}
        />
        <div class="cut cut-short"></div>
      </div>
      <div class="input-container ic2">
        <label for="Income" class="placeholder">
          Estimated Income Range
        </label>
        <input
          id="Income"
          class="input"
          type="Income"
          placeholder=" "
          onChange={(e) => {
            setIncomeReg(e.target.value);
          }}
        />
        <div class="cut cut-short"></div>
      </div>

      <button type="text" class="submit" onClick={upgradeGold}>
        upgrade
      </button>
    </div>
  );
}
export default UpgradeGold;
