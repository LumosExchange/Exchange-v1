import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import PrimaryButton from "../../Components/Buttons";
import Axios from "axios";
import {
  ContentTab,
  ProfileTabs,
} from "../../Components/Profile";
import {
  FormInput,
  PageBody,
  StyledDropdown,
} from "../../Components/FormInputs";
import {
  countryOptions,
  birthDayOptions,
  birthMonthOptions,
  birthYearOptions,
  currentYear,
} from "../../Constants/Index";

const KnowYourCustomer = () => {
  const [legalNameReg, setLegalNameReg] = useState("");
  const [birthDayReg, setBirthDayReg] = useState("");
  const [birthMonthReg, setBirthMonthReg] = useState("");
  const [birthYeareg, setbirthYeareg] = useState("");
  const [displayNameReg, setDisplayNameReg] = useState("");
  const [streetAdressReg, setStreetAdressReg] = useState("");
  const [cityTownReg, setCityTownReg] = useState("");
  const [cityStateReg, setCityStateReg] = useState("");
  const [postCodeReg, setPostCodeReg] = useState("");
  const [countryReg, setCountryReg] = useState("");
  const [documentReg, setDocumentReg] = useState("");

  const getUserInfo = () => {
    Axios.get("http://localhost:3001/getUserInfo").then((response) => {
      console.log(response);
    });
  }

  const userInfo = () => {
    Axios.post("http://localhost:3001/userInfo", {
      LegalName: legalNameReg,
      BirthDay: birthDayReg,
      BirthMonth: birthMonthReg,
      BirthYear: birthYeareg,
      DisplayName: displayNameReg,
      StreetAdress: streetAdressReg,
      CityTown: cityTownReg,
      CityState: cityStateReg,
      PostCode: postCodeReg,
      Country: countryReg,
      Document: documentReg,
    });
  };

  useEffect(() => {}, []);

  return (
    <PageBody>
      <div className="container pt-5">
        <ProfileTabs selected="KYC" />
        <ContentTab className="text-white">
          <div className="d-flex p-4 row">
            <div className="col-12 col-md-6 mb-3">
              <Heading size="20px" bold>
                Display Name
              </Heading>
              <FormInput
                id="DisplayName"
                className="mb-3 w-100"
                type="text"
                placeholder="Display Name"
                onChange={(e) => {
                  setDisplayNameReg(e.target.value);
                }}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <Heading size="20px" bold>
                Legal Name
              </Heading>
              <FormInput
                id="legalName"
                className="mb-3 w-100"
                type="text"
                placeholder="Legal Name"
                onChange={(e) => {
                  setLegalNameReg(e.target.value);
                }}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <div className="row">
                <div className="col-4">
                  <Heading size="20px" bold>
                    Day
                  </Heading>
                  <StyledDropdown
                    className="w-100"
                    onChange={(e) => setBirthDayReg(e.currentTarget.value)}
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
                    onChange={(e) => setBirthMonthReg(e.currentTarget.value)}
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
                    onChange={(e) => setbirthYeareg(e.currentTarget.value)}
                  >
                    {birthYearOptions(currentYear, currentYear - 90, -1).map(
                      (option) => (
                        <option value={option}>{option}</option>
                      )
                    )}
                  </StyledDropdown>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mb-3">
              <Heading size="20px" bold>
                Street Address
              </Heading>
              <FormInput
                id="streetaddress"
                className="mb-3 w-100"
                type="text"
                placeholder="Street Address"
                onChange={(e) => {
                  setStreetAdressReg(e.target.value);
                }}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <Heading size="20px" bold>
                City/Town
              </Heading>
              <FormInput
                id="citytown"
                className="mb-3 w-100"
                type="text"
                placeholder="City/Town"
                onChange={(e) => {
                  setCityTownReg(e.target.value);
                }}
              />
            </div>
            <div className="col-12 col-md-6 mb-3 ">
              <Heading size="20px" bold>
                State (if applicable)
              </Heading>
              <FormInput
                id="citystate"
                className="mb-3 w-100"
                type="text"
                placeholder="State"
                onChange={(e) => {
                  setCityStateReg(e.target.value);
                }}
              />
            </div>
            <div className="col-12 col-md-6 mb-3 ">
              <Heading size="20px" bold>
                Postcode
              </Heading>
              <FormInput
                id="postcode"
                className="mb-3 w-100"
                type="text"
                placeholder="Postcode"
                onChange={(e) => {
                  setPostCodeReg(e.target.value);
                }}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <Heading size="20px" bold>
                Country
              </Heading>
              <StyledDropdown
                className="w-100"
                onChange={(e) => setCountryReg(e.currentTarget.value)}
              >
                {countryOptions.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </StyledDropdown>
            </div>
            <div className="col-12 col-md-6 mb-3 ">
              <Heading size="20px" bold>
                Upload Document
              </Heading>
              <FormInput
                id="document"
                className="mb-3 w-100"
                type="file"
                placeholder="Postcode"
                onChange={(e) => {
                  setDocumentReg(e.target.value);
                }}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <PrimaryButton
                onClick={userInfo}
                className="w-auto mt-5"
                text="Save"
              />
            </div>
          </div>
        </ContentTab>
      </div>
    </PageBody>
  );
};

export default KnowYourCustomer;
