import React, { useState } from "react";
import "../App.css";
import Axios from "axios";

function RegisterCompany() {
  const [RegistrationCountryReg, setRegistrationCountryReg] = useState("");
  const [RegistrationNumberReg, setRegistrationNumberReg] = useState("");
  const [CompanySourceOfIncomeReg, setCompanySourceOfIncomeReg] = useState("");
  const [DirectorNameReg, setDirectorNameReg] = useState("");
  const [DirectorAddressReg, setDirectorAddressReg] = useState("");
  const [DirectorOwnershipReg, setDirectorOwnershipReg] = useState("");

  const registerCompany = () => {
    Axios.post("http://localhost:3001/registerCompany", {
      RegistrationCountry: RegistrationCountryReg,
      RegistrationNumber: RegistrationNumberReg,
      CompanySourceOfIncome: CompanySourceOfIncomeReg,
      DirectorName: DirectorNameReg,
      DirectorAddress: DirectorAddressReg,
      DirectorOwnership: DirectorOwnershipReg,
    });
  };

  return (
    <div class="form">
      <div class="subtitle">Let's create your company account!</div>
      <div class="input-container ic1">
        <label for="RegistrationCountry" class="placeholder">
          Registration Country
        </label>
        <input
          id="RegistrationCountry"
          class="input"
          type="text"
          placeholder=" "
          onChange={(e) => {
            setRegistrationCountryReg(e.target.value);
          }}
        />
        <div class="cut"></div>
      </div>

      <div class="input-container ic2">
        <label for="RegistrationNumber" class="placeholder">
          Registration Number
        </label>
        <input
          id="RegistrationNumber"
          class="input"
          type="text"
          placeholder=" "
          onChange={(e) => {
            setRegistrationNumberReg(e.target.value);
          }}
        />
        <div class="cut"></div>
      </div>

      <div class="input-container ic2">
        <label for="CompanySourceOfIncome" class="placeholder">
          Registered Address
        </label>
        <input
          id="CompanySourceOfIncome"
          class="input"
          type="text"
          placeholder=" "
          onChange={(e) => {
            setCompanySourceOfIncomeReg(e.target.value);
          }}
        />
        <div class="cut cut-short"></div>
      </div>

      <div class="input-container ic2">
        <label for="CompanySourceOfIncome" class="placeholder">
          Company Source Of Income
        </label>
        <input
          id="CompanySourceOfIncome"
          class="input"
          type="text"
          placeholder=" "
          onChange={(e) => {
            setCompanySourceOfIncomeReg(e.target.value);
          }}
        />
        <div class="cut cut-short"></div>
      </div>

      <div class="input-container ic2">
        <label for="DirectorName" class="placeholder">
          Director Name
        </label>
        <input
          id="DirectorName"
          class="input"
          type="text"
          placeholder=" "
          onChange={(e) => {
            setDirectorNameReg(e.target.value);
          }}
        />
        <div class="cut cut-short"></div>
      </div>

      <div class="input-container ic2">
        <label for="DirectorAddress" class="placeholder">
          Director Address
        </label>
        <input
          id="DirectorAddress"
          class="input"
          type="DirectorAddress"
          placeholder=" "
          onChange={(e) => {
            setDirectorAddressReg(e.target.value);
          }}
        />
        <div class="cut cut-short"></div>
      </div>
      <div class="input-container ic2">
        <label for="DirectorOwnerShip" class="placeholder">
          Director Ownership %
        </label>
        <input
          id="DirectorOwnership"
          class="input"
          type="DirectorOwnership"
          placeholder=" "
          onChange={(e) => {
            setDirectorOwnershipReg(e.target.value);
          }}
        />
        <div class="cut cut-short"></div>
      </div>

      <button type="text" class="submit" onClick={registerCompany}>
        Register Company
      </button>
    </div>
  );
}
export default RegisterCompany;
