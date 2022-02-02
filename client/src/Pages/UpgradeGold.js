import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { FormInput, PageBody } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import PrimaryButton from "../Components/Buttons";

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
    <PageBody className="d-flex align-items-center justify-content-center py-5 container-fluid">
      <div className="row">
        <div className="col-11 col-md-6 d-flex flex-column m-auto">
          <Heading size="36px" className="mt-5 mb-4 text-center">
            Upgrade to gold
          </Heading>
          <Heading size="24px" className="mb-5 text-center">
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
            <FormInput
              id="Income"
              className="mb-3 w-100"
              type="text"
              placeholder="Income "
              onChange={(e) => {
                setIncomeReg(e.target.value);
              }}
            />
          </form>

          <PrimaryButton
            type="submit"
            className="m-auto"
            onClick={upgradeGold}
            text="Upgrade"
            hasIcon
          />
        </div>
      </div>
    </PageBody>
  );
}
export default UpgradeGold;
