import React, { useState, useEffect } from "react";

import Axios from "axios";
import { FormInput, PageBody } from "../../Components/FormInputs";
import PrimaryButton from "../../Components/Buttons";
import Heading from "../../Components/Heading";
import {
  ContentTab,
  EditableOption,
  TwoFAOption,
  ProfileTabLink,
  Tabs,
} from "../../Components/Profile";

const AccountUpgrade = () => {
  //step 1 upgrade bronze / silver
  const [dateOfBirth, setDateOfBirthReg] = useState("");
  const [phone, setPhoneReg] = useState("");
  const [tax, setTaxReg] = useState("");
  const [countryOfResidence, setCountryOfResidenceReg] = useState("");

  //step 3 upgrade gold
  const [employerName, setEmployerNameReg] = useState("");
  const [employerAddress, setEmployerAddressReg] = useState("");
  const [occupation, setOccupationReg] = useState("");
  const [proofEmployment, setProofEmploymentReg] = useState("");
  const [income, setIncomeReg] = useState("");
  const [additionalIncome, setAdditionalIncomeReg] = useState("");

  //Create function to get current tier
  const [accountTier, setAccountTier] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const getAccountTier = () => {
    Axios.get("http://localhost:3001/getUserAccountLevel").then((response) => {
      setAccountTier(response.data[0]?.accountLevel);
    });
  };

  const upgradeSilver = () => {
    Axios.post("http://localhost:3001/upgradeSilver", {
      DateOfBirth: dateOfBirth,
      Phone: phone,
      Tax: tax,
      CountryOfResidence: countryOfResidence,
    }).then((response) => {
      //handle message retunred from endpoint
      setConfirmationMessage(response.data.message);

      //Go to next step
      setCurrentStep(2);
    });
  };

  const upgradeGold = () => {
    Axios.post("http://localhost:3001/upgradeGold", {
        EmployerName: employerName,
        EmployerAddress: employerAddress,
        Occupation: occupation,
        ProofEmployment: proofEmployment,
        AdditionalIncome: additionalIncome,
        Income: income,
      });
  };
  //TODO: Display current account tier
  //     - pass inputs to useState Variables
  //     - implement steps

  //UseEffect here for account tier etc
  useEffect(() => {
    getAccountTier();
  }, []);

  return (
    <PageBody>
      <div className="container pt-5">
        <Tabs>
          <ProfileTabLink href="/Profile/Basic">Basic</ProfileTabLink>
          <ProfileTabLink href="/Profile/Security" className="selected">
            Security
          </ProfileTabLink>
          <ProfileTabLink href="/Profile/KYC">KYC</ProfileTabLink>
          <ProfileTabLink href="/Profile/PaymentMethods">
            Payment Methods
          </ProfileTabLink>
          <ProfileTabLink href="/Profile/AccountUpgrade">
            Account Upgrade
          </ProfileTabLink>
        </Tabs>
        <ContentTab>
          <div className="d-flex p-4 row">
            <div className="col-12 col-md-6 mb-3">
              <Heading size="20px" bold>
                Current Tier
              </Heading>
              <Heading size="20px" bold>
                {accountTier}
              </Heading>

              {currentStep === 1 && (
                <React.Fragment>
                  <form>
                    <Heading size="20px" bold>
                      Date Of Birth
                    </Heading>
                    <FormInput
                      id="DateOfBirth"
                      className="mb-3 w-100"
                      type="DateOfBirth"
                      placeholder="Date of Birth "
                      onChange={(e) => {
                        setDateOfBirthReg(e.target.value);
                      }}
                    />

                    <FormInput
                      id="Phone"
                      className="mb-3 w-100"
                      type="Phone"
                      placeholder="Phone"
                      onChange={(e) => {
                        setPhoneReg(e.target.value);
                      }}
                    />

                    <FormInput
                      id="Tax"
                      className="mb-3 w-100"
                      type="Tax"
                      placeholder="Tax (Optional)"
                      onChange={(e) => {
                        setTaxReg(e.target.value);
                      }}
                    />

                    <FormInput
                      id="CountryOfResidence"
                      className="mb-3 w-100"
                      type="Tax"
                      placeholder="Country Of Residence"
                      onChange={(e) => {
                        setCountryOfResidenceReg(e.target.value);
                      }}
                    />
                    <PrimaryButton
                      type="submit"
                      className="m-auto"
                      onClick={upgradeSilver}
                      text="Upgrade"
                      hasIcon
                    />
                  </form>
                  <Heading size="20px" bold>
                {confirmationMessage}
              </Heading>
                </React.Fragment>
              )}
              {currentStep === 2 && (
                <React.Fragment>
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
                      id="ProofEmployment"
                      className="mb-3 w-100"
                      type="ProofEmployment"
                      placeholder="Proof Of Employment "
                      onChange={(e) => {
                        setProofEmploymentReg(e.target.value);
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
                    <FormInput
                      id="AdditionalIncome"
                      className="mb-3 w-100"
                      type="AdditionalIncome"
                      placeholder="Additional Income(Optional) "
                      onChange={(e) => {
                        setAdditionalIncomeReg(e.target.value);
                      }}
                    />

                    <PrimaryButton
                      type="submit"
                      className="m-auto"
                      onClick={upgradeGold}
                      text="Upgrade"
                      hasIcon
                    />
                  </form>
                </React.Fragment>
              )}
            </div>
          </div>
        </ContentTab>
      </div>
    </PageBody>
  );
};

export default AccountUpgrade;
