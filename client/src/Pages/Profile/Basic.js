import React, { useState, useEffect } from "react";
import {
  PageBody,
  StyledDropdown,
  FormInput,
} from "../../Components/FormInputs";
import Heading from "../../Components/Heading";
import GradientButton from "../../Components/GradientButton";
import PrimaryButton from "../../Components/Buttons";
import Paragraph from "../../Components/Paragraph";
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
  TopBanner,
  ProfileTabLink,
  Tabs,
} from "../../Components/Profile";
import { useNavigate } from "react-router";

const TAB_TITLE_BASIC = "basic";
const TAB_TITLE_SECURITY = "security";
const TAB_TITLE_KYC = "kyc";
const TAB_TITLE_UPGRADEINFO = "Upgrade Info";

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

const Basic = () => {
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
    <PageBody>
      <div className="container pt-5">
        <Tabs>
          <ProfileTabLink href="/Profile/Basic" className="selected">
            Basic
          </ProfileTabLink>
          <ProfileTabLink href="/Profile/Security">Security</ProfileTabLink>
          <ProfileTabLink href="/Profile/KYC">KYC</ProfileTabLink>
          <ProfileTabLink href="/Profile/PaymentMethods">
            Payment Methods
          </ProfileTabLink>
          <ProfileTabLink href="/Profile/accountUpgrade">
            Upgrade Tier
          </ProfileTabLink>
          <ProfileTabLink href="/Profile/UpgradeInfo">
            Upgrade information
          </ProfileTabLink>
        </Tabs>
        <ContentTab className="position-relative">
          {isLoading && <LoadingState />}
          <TopBanner className="d-flex p-4">
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
          </TopBanner>
          <div className="d-flex p-4 row">
            <div className="col-12 col-lg-4">
              <Heading size="20px" bold>
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
            </div>
            <div className="col-12 col-lg-4 my-3 my-lg-0">
              <Heading size="20px" bold>
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
            </div>
            <div className="col-12 col-lg-4">
              <Heading size="20px" bold>
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
        </ContentTab>
      </div>
    </PageBody>
  );
};

export default Basic;
