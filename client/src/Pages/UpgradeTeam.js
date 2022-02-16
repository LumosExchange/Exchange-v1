import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { FormInput, PageBody } from "../Components/FormInputs";
import PrimaryButton from "../Components/Buttons";
import Heading from "../Components/Heading";

function UpgradeTeam() {
  const [registrationCountryReg, setRegistrationCountryReg] = useState("");
  const [registrationNumberReg, setRegistrationNumberReg] = useState("");
  const [companySourceOfIncomeReg, setCompanySourceOfIncomeReg] = useState("");
  const [directorNameReg, setDirectorNameReg] = useState("");
  const [directorAddressReg, setDirectorAddressReg] = useState("");
  const [directorOwnershipReg, setDirectorOwnershipReg] = useState("");
  const [additionalDirectorReg, setAdditionalDirectorReg] = useState("");

  const upgradeTeam = () => {
    Axios.post("http://localhost:3001/upgradeTeam", {
      RegistrationCountry: registrationCountryReg,
      RegistrationNumber: registrationNumberReg,
      CompanySourceOfIncome: companySourceOfIncomeReg,
      DirectorName: directorNameReg,
      DirectorAddress: directorAddressReg,
      DirectorOwnership: directorOwnershipReg,
      AdditionalDirector: additionalDirectorReg,
    });
  };

  return (
    <PageBody className="d-flex align-items-center justify-content-center py-5 container-fluid">
      <div className="row">
        <div className="col-12 d-flex flex-column m-auto">
          <Heading size="36px" className="mt-5 mb-4 text-center">
            Upgrade to Team
          </Heading>
          <Heading size="24px" className="mb-5 text-center">
            Enter your details to upgrade to Team.
          </Heading>
          <form>
            <FormInput
              id="RegistrationCountry"
              className="mb-3 w-100"
              type="RegistrationCountry"
              placeholder="Registration Country "
              onChange={(e) => {
                setRegistrationCountryReg(e.target.value);
              }}
            />

            <FormInput
              id="RegistrationNumber"
              className="mb-3 w-100"
              type="RegistrationNumber"
              placeholder="Registration Number "
              onChange={(e) => {
                setRegistrationNumberReg(e.target.value);
              }}
            />

            <FormInput
              id="CompanySourceOfIncome"
              className="mb-3 w-100"
              type="CompanySourceOfIncome"
              placeholder="Company SourceOf Income"
              onChange={(e) => {
                setCompanySourceOfIncomeReg(e.target.value);
              }}
            />

            <FormInput
              id="DirectorName"
              className="mb-3 w-100"
              type="DirectorName"
              placeholder="Directors Name "
              onChange={(e) => {
                setDirectorNameReg(e.target.value);
              }}
            />

            <FormInput
              id="DirectorAddress"
              className="mb-3 w-100"
              type="DirectorAddress"
              placeholder="Directors Address"
              onChange={(e) => {
                setDirectorAddressReg(e.target.value);
              }}
            />

            <FormInput
              id="DirectorOwnership"
              className="mb-3 w-100"
              type="DirectorOwnership"
              placeholder="Directors Ownership"
              onChange={(e) => {
                setDirectorOwnershipReg(e.target.value);
              }}
            />
            <FormInput
              id="AdditionalDirector"
              className="mb-3 w-100"
              type="AdditionalDirector"
              placeholder="Additional Directors (Optional)"
              onChange={(e) => {
                setAdditionalDirectorReg(e.target.value);
              }}
            />
          </form>

          <PrimaryButton
            type="submit"
            className="m-auto"
            onClick={upgradeTeam}
            hasIcon
            text="Upgrade"
          >
            Register Company
          </PrimaryButton>
        </div>
      </div>
    </PageBody>
  );
}
export default UpgradeTeam;
