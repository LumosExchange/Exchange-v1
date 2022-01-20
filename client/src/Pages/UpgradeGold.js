import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
<<<<<<< Updated upstream
=======
import { FormInput, PageBody } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import { useNavigate } from "react-router";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
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
=======
    <PageBody className="d-flex align-items-center justify-content-center py-5 container-fluid">
      <div className="row">
        <div className="col-11 col-md-6 d-flex flex-column m-auto">
          <Heading size="36px" color="white" className="mt-5 mb-4 text-center">
            Upgrade to gold
          </Heading>
          <Heading size="24px" color="white" className="mb-5 text-center">
            Enter your details to upgrade to gold.
          </Heading>

          <form>
            <FormInput
              id="EmployerName"
              className="mb-3 w-100"
              type="text"
              placeholder="Employer Name "
              onChange={(e) => {
                setEmployerNameReg(e.target.value);
              }}
            />

            <FormInput
              id="EmployerAddress"
              className="mb-3 w-100"
              type="text"
              placeholder="Employer Address "
              onChange={(e) => {
                setEmployerAddressReg(e.target.value);
              }}
            />

            <FormInput
              id="Occupation"
              className="mb-3 w-100"
              type="Occupation"
              placeholder="Occupation "
              onChange={(e) => {
                setOccupationReg(e.target.value);
              }}
            />
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
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
=======
    </PageBody>
>>>>>>> Stashed changes
  );
}
export default UpgradeGold;
