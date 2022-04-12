import React, { useState, useEffect } from "react";
import { PageBody, StyledDropdown } from "../../Components/FormInputs";
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
  LoadingState,
  TopBanner,
  ProfileTabs,
} from "../../Components/Profile";

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
  const [selectedTimezone, selectTimezone] = useState("");
  const [selectedCurrency, selectCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userInitials, setUserInitials] = useState("");

  const getUserEmail = () => {
    // get user email
    Axios.get("http://localhost:3001/getUserEmail", {}).then((response) => {
      setUserEmail(response.data);
      setUserInitials(response.data.substring(0, 2));
    });
  };

  const getUserSettings = () => {
    // get user settings from usersettings db
    Axios.get("http://localhost:3001/getUserSettings", {}).then((response) => {
      setUserSettings(response?.data);
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
      timezone: selectedTimezone,
      currency: selectedCurrency,
    }).then((response) => {
      //handle errors
      setIsLoading(false);
      window.location.reload(false);
    });
  };

  useEffect(() => {
    getUserEmail();
    getUserSettings();
    getAccountLevel();
  }, []);

  return (
    <PageBody>
      <div className="container pt-5">
        <ProfileTabs selected="Basic" />
        <ContentTab className="position-relative">
          {userAccountLevel.length === 0 && <LoadingState />}
          <TopBanner className="d-flex p-4">
            <div className="col-12 d-flex">
              <ProfileInitials>{userInitials}</ProfileInitials>
              <div className="d-flex ms-3 flex-column justify-content-center">
                <Paragraph size="20px" className="mb-0">
                  {userEmail}
                </Paragraph>
                <Paragraph size="20px" className="mb-0">
                  {userAccountLevel} Account
                </Paragraph>
              </div>
            </div>
          </TopBanner>
          <div className="d-flex p-4 row">
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
