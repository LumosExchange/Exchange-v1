import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { FormInput, PageBody } from "../Components/FormInputs";
import PrimaryButton from "../Components/Buttons";
import Heading from "../Components/Heading";

function UpgradeSilver() {
  const [countryOfResidencenReg, setCountryOfResidenceReg] = useState("");
  const [taxReg, setTaxReg] = useState("");

  const upgradeSilver = () => {
    Axios.post("http://localhost:3001/upgradeSilver", {
      CountryOfResidence: countryOfResidencenReg,
      Tax: taxReg,
    });
  };

  return (
    <PageBody className="d-flex align-items-center justify-content-center py-5 container-fluid">
      <div className="row">
        <div className="col-11 col-md-6 d-flex flex-column m-auto">
          <Heading size="36px" className="mt-5 mb-4 text-center">
            Upgrade to Bronze
          </Heading>
          <Heading size="24px" className="mb-5 text-center">
            Enter your details to upgrade to Silver.
          </Heading>

          <form>
            <FormInput
              id="CountryOfResidence"
              className="mb-3 w-300"
              type="CountryOfResidence"
              placeholder="Country of Residence "
              onChange={(e) => {
                setCountryOfResidenceReg(e.target.value);
              }}
            />
            <FormInput
              id="Tax"
              className="mb-3 w-300"
              type="Tax"
              placeholder="Tax (Optional) "
              onChange={(e) => {
                setTaxReg(e.target.value);
              }}
            />
          </form>

          <PrimaryButton
            type="submit"
            className="m-auto"
            onClick={upgradeSilver}
            text="Upgrade"
            hasIcon
          />
        </div>
      </div>
    </PageBody>
  );
}
export default UpgradeSilver;
