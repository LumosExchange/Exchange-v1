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
import {
  countryOptions,
  birthDayOptions,
  birthMonthOptions,
  birthYearOptions,
  currentYear,
} from "../../Constants/Index";
import { InlineInput, StyledDropdown } from "../../Components/FormInputs";

const AccountUpgrade = () => {
  //step 1 upgrade bronze / silver
  const [birthDayyReg, setBirthDayyReg] = useState("");
  const [birthMonthhReg, setBirthMonthhReg] = useState("");
  const [birthYearrReg, setBirthYearrReg] = useState("");
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
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const getAccountTier = () => {
    Axios.get("http://localhost:3001/getUserAccountLevel").then((response) => {
      setAccountTier(response.data[0]?.accountLevel);
    });
  };

  const upgradeSilver = () => {
    Axios.post("http://localhost:3001/upgradeSilver", {
      BirthDayy: birthDayyReg,
      BirthMonthh: birthMonthhReg,
      BirthYearr: birthYearrReg,
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

  //UseEffect here for account tier etc
  useEffect(() => {
    getAccountTier();
  }, []);

  return (
    <PageBody>
      <div className="container pt-5">
        <Tabs>
          <ProfileTabLink href="/Profile/Basic">Basic</ProfileTabLink>
          <ProfileTabLink href="/Profile/Security">Security</ProfileTabLink>
          <ProfileTabLink href="/Profile/KYC">KYC</ProfileTabLink>
          <ProfileTabLink href="/Profile/PaymentMethods">
            Payment Methods
          </ProfileTabLink>
          <ProfileTabLink href="/Profile/AccountUpgrade" className="selected">
            Account Upgrade
          </ProfileTabLink>
        </Tabs>
        <ContentTab className="text-white">
          <div className="d-flex p-4 row">
            <div className="d-flex col-12 col-md-6 mb-3 flex-column">
              {currentStep === 1 && (
                <React.Fragment>
                  <Heading size="20px" bold>
                    Date Of Birth
                  </Heading>

                  <div className="row">
                    <div className="col-4">
                      <Heading size="20px" bold>
                        Day
                      </Heading>
                      <StyledDropdown
                        className="w-100"
                        onChange={(e) => setBirthDayyReg(e.currentTarget.value)}
                      >
                        {birthDayOptions.map((option) => (
                          <option value={option}>{option}</option>
                        ))}
                      </StyledDropdown>
                    </div>
                    <div className="col-4">
                      <Heading size="20px" bold>
                        Month
                      </Heading>
                      <StyledDropdown
                        className="w-100"
                        onChange={(e) =>
                          setBirthMonthhReg(e.currentTarget.value)
                        }
                      >
                        {birthMonthOptions.map((option) => (
                          <option value={option}>{option}</option>
                        ))}
                      </StyledDropdown>
                    </div>
                    <div className="col-4">
                      <Heading size="20px" bold>
                        Year
                      </Heading>
                      <StyledDropdown
                        className="w-100"
                        onChange={(e) =>
                          setBirthYearrReg(e.currentTarget.value)
                        }
                      >
                        {birthYearOptions(
                          currentYear,
                          currentYear - 90,
                          -1
                        ).map((option) => (
                          <option value={option}>{option}</option>
                        ))}
                      </StyledDropdown>
                    </div>
                  </div>

                  <Heading size="20px" bold>
                    Phone
                  </Heading>
                  <FormInput
                    id="Phone"
                    className="mb-3 w-100"
                    type="number"
                    placeholder="Phone"
                    onChange={(e) => {
                      setPhoneReg(e.target.value);
                    }}
                  />
                  <Heading size="20px" bold>
                    Taxes
                  </Heading>
                  <FormInput
                    id="Tax"
                    className="mb-3 w-100"
                    type="file"
                    placeholder="Taxes (Optional)"
                    onChange={(e) => {
                      setTaxReg(e.target.value);
                    }}
                  />

                  <Heading size="20px" bold>
                    Country Of Residence
                  </Heading>
                  <StyledDropdown
                    className="w-100"
                    onChange={(e) =>
                      setCountryOfResidenceReg(e.currentTarget.value)
                    }
                  >
                    {countryOptions.map((option) => (
                      <option value={option}>{option}</option>
                    ))}
                  </StyledDropdown>

                  <PrimaryButton
                    type="submit"
                    className="m-auto"
                    onClick={upgradeSilver}
                    text="Upgrade"
                    hasIcon
                  />

                  <Heading size="20px" bold>
                    {confirmationMessage}
                  </Heading>
                </React.Fragment>
              )}
              {currentStep === 2 && (
                <React.Fragment>
                  <form>
                    <Heading size="20px" bold>
                      Employers Name
                    </Heading>
                    <FormInput
                      id="EmployerName"
                      className="mb-3 w-100"
                      type="text"
                      placeholder="Employer Name "
                      onChange={(e) => {
                        setEmployerNameReg(e.target.value);
                      }}
                    />
                    <Heading size="20px" bold>
                      Employer Address
                    </Heading>
                    <FormInput
                      id="EmployerAddress"
                      className="mb-3 w-100"
                      type="text"
                      placeholder="Employer Address "
                      onChange={(e) => {
                        setEmployerAddressReg(e.target.value);
                      }}
                    />
                    <Heading size="20px" bold>
                      Occupation
                    </Heading>
                    <FormInput
                      id="Occupation"
                      className="mb-3 w-100"
                      type="Occupation"
                      placeholder="Occupation "
                      onChange={(e) => {
                        setOccupationReg(e.target.value);
                      }}
                    />
                    <Heading size="20px" bold>
                      Proof of Employment
                    </Heading>
                    <FormInput
                      id="ProofEmployment"
                      className="mb-3 w-100"
                      type="file"
                      placeholder="Proof Of Employment "
                      onChange={(e) => {
                        setProofEmploymentReg(e.target.value);
                      }}
                    />
                    <Heading size="20px" bold>
                      Income
                    </Heading>
                    <FormInput
                      id="Income"
                      className="mb-3 w-100"
                      type="number"
                      placeholder="Income"
                      onChange={(e) => {
                        setIncomeReg(e.target.value);
                      }}
                    />
                    <Heading size="20px" bold>
                      Additional Income
                    </Heading>
                    <FormInput
                      id="AdditionalIncome"
                      className="mb-3 w-100"
                      type="number"
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
            <div className="col-md-3"> </div>
            <div className="d-flex col-12 col-md-3 mb-3 flex-column">
              <Heading size="20px" bold className="text-center">
                Current Tier
              </Heading>
              <Heading size="20px" bold className="text-center">
                {accountTier}
              </Heading>
            </div>
          </div>
        </ContentTab>
      </div>
    </PageBody>
  );
};

export default AccountUpgrade;
