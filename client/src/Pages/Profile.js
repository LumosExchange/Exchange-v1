import React, { useState, useEffect } from "react";
import { PageBody, StyledDropdown, FormInput } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import GradientButton from "../Components/GradientButton";
import PrimaryButton from "../Components/Buttons";
import Paragraph from "../Components/Paragraph";
import Axios from "axios";
import {
  AccountTierCard,
  CheckIcon,
  ContentTab,
  ProfileInitials,
  EditableOption,
  LoadingState,
  ProfileTab,
  TwoFAOption,
} from "../Components/Profile";
import { useNavigate } from "react-router";

const TAB_TITLE_BASIC = "basic";
const TAB_TITLE_SECURITY = "security";
const TAB_TITLE_KYC = "kyc";

const AccountTier = ({ tier, selectedTier, limit, title }) => (
  <AccountTierCard
    tier={tier}
    className={`d-flex flex-column padding rounded mb-3 ${
      !selectedTier && "opaque"
    }`}
  >
    <div className="inner rounded p-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column">
          <Heading size="20px" color="black" bold className="capitalize">
            {title}
          </Heading>
          <Paragraph size="20px" color="black" className="mb-0">
            Trade Limit: {limit} SOL
          </Paragraph>
        </div>
        <div className="d-flex align-items-center">
          {selectedTier ? (
            <CheckIcon className="material-icons selected">
              check_circle
            </CheckIcon>
          ) : (
            <GradientButton text="Upgrade" padding="5px 10px" />
          )}
        </div>
      </div>
    </div>
  </AccountTierCard>
);

const BasicTab = () => {
  const [userSetting, setUserSettings] = useState([]);
  const [userAccountLevel, setUserAccountLevel] = useState("");
  const [selectedTheme, selectTheme] = useState("");
  const [selectedTimezone, selectTimezone] = useState("");
  const [selectedCurrency, selectCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const getUserEmail = () => {
    // get user email
    Axios.get("http://localhost:3001/getUserEmail", {}).then((response) => {
      setUserEmail(response.data);
    });
  };

  const getUserSettings = () => {
    // get user settings from usersettings db
    Axios.get("http://localhost:3001/getUserSettings", {}).then((response) => {
      setUserSettings(response?.data);
      selectTheme(response.data[0]?.theme);
      selectTimezone(response.data[0]?.timezone);
      selectCurrency(response.data[0]?.currency);
    });
  };

  const getAccountLevel = () => {
    //get account level from db
    Axios.get("http://localhost:3001/getUserAccountLevel", {}).then(
      (response) => {
        setUserAccountLevel(response.data[0]?.accountLevel);
      }
    );
  };

  //create functionality to update user settings
  const updateUserSettings = () => {
    setIsLoading(true);
    Axios.post("http://localhost:3001/updateUserSettings", {
      theme: selectedTheme,
      timezone: selectedTimezone,
      currency: selectedCurrency,
    }).then((response) => {
      //handle errors
      console.log(response, "response");
      setIsLoading(false);
      window.location.reload(false);
    });
  };

  useEffect(() => {
    getUserEmail();
    getUserSettings();
    getAccountLevel();
  }, []);

  console.log(selectedTheme, "selected theme");

  return (
    <ContentTab className="position-relative">
      {isLoading && <LoadingState />}
      <div className="d-flex p-4 row">
        <div className="col-12 d-flex">
          <ProfileInitials>KC</ProfileInitials>
          <div className="d-flex ms-3 flex-column justify-content-center">
            <Paragraph size="20px" className="mb-0">
              {userEmail}
            </Paragraph>
            <Paragraph size="20px" className="mb-0">
              UTC - London
            </Paragraph>
          </div>
        </div>
      </div>
      <div className="d-flex p-4 row">
        <div className="col-12 col-lg-4">
          <EditableOption className="p-4">
            <Heading color="black" size="20px" bold>
              Theme
            </Heading>
            <StyledDropdown
              className="w-100"
              value={selectedTheme}
              onChange={(e) => selectTheme(e.currentTarget.value)}
            >
              <option value="Dark">Dark</option>
              <option value="Light">Light</option>
            </StyledDropdown>
          </EditableOption>
        </div>
        <div className="col-12 col-lg-4 my-3 my-lg-0">
          <EditableOption className="p-4">
            <Heading color="black" size="20px" bold>
              Timezone
            </Heading>
            <StyledDropdown
              className="w-100"
              value={selectedTimezone}
              onChange={(e) => selectTimezone(e.currentTarget.value)}
            >
              <option value="UTC+0">UTC+0</option>
              <option value="UTC+1">UTC+1</option>
            </StyledDropdown>
          </EditableOption>
        </div>
        <div className="col-12 col-lg-4">
          <EditableOption className="p-4">
            <Heading color="black" size="20px" bold>
              Local Currency
            </Heading>
            <StyledDropdown
              className="w-100"
              value={selectedCurrency}
              onChange={(e) => selectCurrency(e.currentTarget.value)}
            >
              <option value="GBP">British Pounds (GBP)</option>
              <option value="AUS">Australian Dollars (AUS)</option>
            </StyledDropdown>
          </EditableOption>
        </div>
      </div>
      <div className="d-flex px-4 row">
        <div className="col-12 col-lg-2 pb-4">
          <PrimaryButton
            text="Save"
            className="w-100"
            onClick={updateUserSettings}
            disabled={
              userSetting[0]?.theme === selectedTheme &&
              userSetting[0]?.timezone === selectedTimezone &&
              userSetting[0]?.currency === selectedCurrency
            }
          />
        </div>
      </div>
      {/* Account Limit Section */}

      <div className="d-flex px-4 row py-4">
        <div className="col-12">
          <Heading size="18px">Account Limits</Heading>
        </div>
        <div className="col-12 col-lg-4">
          <AccountTier
            tier="six9Grey"
            title="Standard"
            limit="1"
            selectedTier={userAccountLevel === "Standard"}
          />
        </div>
        <div className="col-12 col-lg-4">
          <AccountTier
            tier="bronze"
            title="Bronze"
            limit="5"
            selectedTier={userAccountLevel === "Bronze"}
          />
        </div>
        <div className="col-12 col-lg-4">
          <AccountTier
            tier="silver"
            title="Silver"
            limit="10"
            selectedTier={userAccountLevel === "Silver"}
          />
        </div>
        <div className="col-12 col-lg-4">
          <AccountTier
            tier="gold"
            title="Gold"
            limit="25"
            selectedTier={userAccountLevel === "Gold"}
          />
        </div>
        <div className="col-12 col-lg-4">
          <AccountTier
            tier="diamond"
            title="Diamond"
            limit="50"
            selectedTier={userAccountLevel === "Diamond"}
          />
        </div>
        <div className="col-12 col-lg-4">
          <AccountTier
            tier="six9Grey"
            title="Team"
            limit="100"
            selectedTier={userAccountLevel === "Team"}
          />
        </div>
      </div>
    </ContentTab>
  );
};

const SecurityTab = () => {
  const [selectedEmail, selectEmail] = useState("");
  const [selectedPassword, selectPassword] = useState("");
  const [selectedAuthType, selectAuthType] = useState("");
  const [twoFaOptions, setTwoFaOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getUser2FAOptions = () => {
    // get user settings from usersettings db
    Axios.post("http://localhost:3001/getUser2FAOptions", {}).then(
      (response) => {
        console.log(response, "2fa options response");
        if (response.data.length > 0) {
          setTwoFaOptions(response.data);
        } else {
          setIsLoading(true);
        }
      }
    );
  };

  useEffect(() => {
    getUser2FAOptions();
  }, []);

  console.log(twoFaOptions, "2fa options");

  return (
    <ContentTab>
      <div className="d-flex p-4 row">
        <div className="col-12 col-lg-4">
          <EditableOption className="p-4">
            <Heading color="black" size="20px" bold>
              Update Email
            </Heading>
            <PrimaryButton
              text="Update Email"
              onClick={() => navigate("/changeEmail", { replace: true })}
            />
          </EditableOption>
        </div>
        <div className="col-12 col-lg-4 my-3 my-lg-0">
          <EditableOption className="p-4">
            <Heading color="black" size="20px" bold>
              Update Password
            </Heading>
            <PrimaryButton
              text="Change Password"
              onClick={() => navigate("/ChangePassword")}
            />
          </EditableOption>
        </div>
      </div>
      <div className="d-flex p-4 row">
        <div className="col-12">
          <Heading color="black" size="20px" bold>
            2FA Options
          </Heading>
        </div>
        <div className="col-12 mb-2 mb-lg-0 col-md-6 col-lg-4">
          <TwoFAOption
            option="Email"
            selected={twoFaOptions[0]?.emailVerified === 1}
          />
        </div>
        <div className="col-12 mb-2 mb-lg-0 col-md-6 col-lg-4">
          <TwoFAOption
            option="SMS"
            selected={twoFaOptions[0]?.SMS === 1}
            linkTo="/SMSAuth"
          />
        </div>
        <div className="col-12 mb-2 col-md-6 col-lg-4">
          <TwoFAOption
            option="Google Auth"
            selected={twoFaOptions[0]?.google === 1}
            linkTo="/GoogleAuth"
          />
        </div>
        <div className="col-12 mb-2 mb-lg-0 col-md-6 col-lg-4">
          <TwoFAOption option="Authy" linkTo="/AuthyAuth" />
        </div>
      </div>
    </ContentTab>
  );
};

const birthDayOptions = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const birthMonthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const birthYearOptions = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const countryOptions = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas (the)",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational State of)",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory (the)",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands (the)",
  "Central African Republic (the)",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands (the)",
  "Colombia",
  "Comoros (the)",
  "Congo (the Democratic Republic of the)",
  "Congo (the)",
  "Cook Islands (the)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic (the)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands (the) [Malvinas]",
  "Faroe Islands (the)",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories (the)",
  "Gabon",
  "Gambia (the)",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See (the)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (the Democratic People's Republic of)",
  "Korea (the Republic of)",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic (the)",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands (the)",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova (the Republic of)",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands (the)",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger (the)",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands (the)",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines (the)",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Romania",
  "Russian Federation (the)",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan (the)",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands (the)",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates (the)",
  "United Kingdom of Great Britain and Northern Ireland (the)",
  "United States Minor Outlying Islands (the)",
  "United States of America (the)",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela (Bolivarian Republic of)",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Åland Islands",
];

const KycTab = () => {
  const [legalNameReg, setLegalNameReg] = useState("");
  const [birthDayReg, setBirthDayReg] = useState("");
  const [birthMonthReg, setBirthMonthReg] = useState("");
  const [birthYearReg, setBirthYearReg] = useState("");
  const [displayNameReg, setDisplayNameReg] = useState("");
  const [streetAdressReg, setStreetAdressReg] = useState("");
  const [cityTownReg, setCityTownReg] = useState("");
  const [cityStateReg, setCityStateReg] = useState("");
  const [postCodeReg, setPostCodeReg] = useState("");
  const [countryReg, setCountryReg] = useState("");
  const [documentReg, setDocumentReg] = useState("");

  const userInfo = () => {
    Axios.post("http://localhost:3001/userInfo", {
      LegalName: legalNameReg,
      BirthDay: birthDayReg,
      BirthMonth: birthMonthReg,
      BirthYear: birthYearReg,
      DisplayName: displayNameReg,
      StreetAdress: streetAdressReg,
      CityTown: cityTownReg,
      CityState: cityStateReg,
      PostCode: postCodeReg,
      Country: countryReg,
      Document: documentReg,
    });
  };

  return (
    <ContentTab className="text-white">
      <div className="d-flex p-4 row">
        <div className="col-12 col-md-6 mb-3">
          <EditableOption className="p-4">
            <Heading color="black" size="20px" bold>
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
          </EditableOption>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <EditableOption className="p-4">
            <Heading color="black" size="20px" bold>
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
          </EditableOption>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <EditableOption className="p-4">
            <Heading color="black" size="20px" bold className="mb-3">
              Date of Birth
            </Heading>
            <div className="row">
              <div className="col-4">
                <Heading color="black" size="20px" bold>
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
                <Heading color="black" size="20px" bold>
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
                <Heading color="black" size="20px" bold>
                  Year
                </Heading>
                <StyledDropdown
                  className="w-100"
                  onChange={(e) => setBirthYearReg(e.currentTarget.value)}
                >
                  {birthYearOptions(currentYear, currentYear - 90, -1).map(
                    (option) => (
                      <option value={option}>{option}</option>
                    )
                  )}
                </StyledDropdown>
              </div>
            </div>
          </EditableOption>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <EditableOption className="p-4 h-100">
            <Heading color="black" size="20px" bold>
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
          </EditableOption>
        </div>

        <div className="col-12 col-md-6 mb-3">
          <EditableOption className="p-4">
            <Heading color="black" size="20px" bold>
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
          </EditableOption>
        </div>
        <div className="col-12 col-md-6 mb-3 ">
          <EditableOption className="p-4">
            <Heading color="black" size="20px" bold>
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
          </EditableOption>
        </div>
        <div className="col-12 col-md-6 mb-3 ">
          <EditableOption className="p-4">
            <Heading color="black" size="20px" bold>
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
          </EditableOption>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <EditableOption className="p-4 h-100">
            <Heading color="black" size="20px" bold>
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
          </EditableOption>
        </div>
        <div className="col-12 col-md-6 mb-3 ">
          <b>Upload your document below</b>
          <EditableOption className="p-4">
            <Heading color="black" size="20px" bold>
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
          </EditableOption>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <PrimaryButton onClick={userInfo} className="w-100" text="Save" />
        </div>
      </div>
    </ContentTab>
  );
};

const Profile = () => {
  const [selectedProfileTab, selectProfileTab] = useState(TAB_TITLE_BASIC);

  return (
    <PageBody>
      <div className="container pt-5">
        <div className="row">
          <div className="col-12 d-flex justify-content-start">
            <ProfileTab
              onClick={() => selectProfileTab(TAB_TITLE_BASIC)}
              className={selectedProfileTab === TAB_TITLE_BASIC && "active"}
            >
              Basic Info
            </ProfileTab>
            <ProfileTab
              onClick={() => selectProfileTab(TAB_TITLE_SECURITY)}
              className={selectedProfileTab === TAB_TITLE_SECURITY && "active"}
            >
              Security
            </ProfileTab>
            <ProfileTab
              onClick={() => selectProfileTab(TAB_TITLE_KYC)}
              className={selectedProfileTab === TAB_TITLE_KYC && "active"}
            >
              KYC
            </ProfileTab>
          </div>
          {selectedProfileTab === "basic" && <BasicTab />}
          {selectedProfileTab === "security" && <SecurityTab />}
          {selectedProfileTab === "kyc" && <KycTab />}
        </div>
      </div>
    </PageBody>
  );
};

export default Profile;
