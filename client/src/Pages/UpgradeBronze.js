import React, { useState } from "react";
import "../App.css";
import Axios from "axios";

function UpgradeBronze() {
  const [dateOfBirthReg, setDateOfBirthReg] = useState("");
  const [phoneReg, setPhoneReg] = useState("");

  const [countryOfResidencenReg, setCountryOfResidenceReg] = useState("");
  const [taxReg, setTaxReg] = useState("");

  const upgradeBronze = () => {
    Axios.post("http://localhost:3001/upgradeBronze", {
      DatOfBirth: dateOfBirthReg,
      Phone: phoneReg,
      CountryofResidence: countryOfResidencenReg,
      Tax: taxReg,
    });
  };

  return (
    <div class="form">
      <div class="subtitle">
        <h1>Let's upgrade to bronze tier!</h1>
      </div>
      <div class="input-container ic1">
        <label for="DatOfBirth" class="placeholder">
          Date of birth
        </label>
        <input
          id="Date of Birth"
          class="input"
          type="text"
          placeholder=" "
          onChange={(e) => {
            setDateOfBirthReg(e.target.value);
          }}
        />
        <div class="cut"></div>
      </div>

      <div class="input-container ic2">
        <label for="Phone" class="placeholder">
          Phone number
        </label>
        <input
          id="Phone"
          class="input"
          type="text"
          placeholder=" "
          onChange={(e) => {
            setPhoneReg(e.target.value);
          }}
        />
        <div class="cut"></div>
      </div>

      <div class="input-container ic2">
        <label for="CountryofResidence" class="placeholder">
          Country of Residence
        </label>
        <input
          id="CountryofResidence"
          class="input"
          type="CountryofResidence"
          placeholder=" "
          onChange={(e) => {
            setCountryOfResidenceReg(e.target.value);
          }}
        />
        <div class="cut cut-short"></div>
      </div>
      <div class="input-container ic2">
        <label for="Tax" class="placeholder">
          Additional Tax Obligations(Optional)
        </label>
        <input
          id="Tax"
          class="input"
          type="Tax"
          placeholder=" "
          onChange={(e) => {
            setTaxReg(e.target.value);
          }}
        />
        <div class="cut cut-short"></div>
      </div>

      <button type="text" class="submit" onClick={upgradeBronze}>
        upgrade
      </button>
    </div>
  );
}
export default UpgradeBronze;
