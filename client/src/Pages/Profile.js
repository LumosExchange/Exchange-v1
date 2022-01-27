import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  PageBody,
  StyledDropdown,
  FormInput,
  StyledLabel,
} from "../Components/FormInputs";
import Heading from "../Components/Heading";
import GradientButton from "../Components/GradientButton";
import PrimaryButton from "../Components/Buttons";
import Paragraph from "../Components/Paragraph";
import Axios from "axios";

const TAB_TITLE_BASIC = "basic";
const TAB_TITLE_SECURITY = "security";
const TAB_TITLE_KYC = "kyc";

const ContentTab = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.grey};
    border-radius: 3px;
    border: 2px solid ${theme.colors.yellow};

    .bronze {
      color: ${theme.colors.bronze};
    }
    .silver {
      color: ${theme.colors.silver};
    }
    .gold {
      color: ${theme.colors.gold};
    }
  `
);

const EditableOption = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.white};
    border-radius: 3px;
  `
);

const ProfileInitials = styled.div(
  ({ theme }) => css`
    width: 75px;
    height: 75px;
    border-radius: 50px;
    background: ${theme.colors.yellow};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.black};
    font-size: 30px;
    font-family: "THICCCBOI-BOLD";
  `
);

const ProfileTab = styled.button(
  ({ theme }) => css`
    background: ${theme.colors.white};
    padding: 10px 30px;
    border-radius: 5px 5px 0 0;
    border: 0;
    margin-right: 16px;

    &.active {
      background: ${theme.colors.yellow};
      font-family: "THICCCBOI-BOLD";
    }
  `
);

const AccountTierCard = styled.div(
  ({ theme, tier }) => css`
    background: ${theme.colors[tier]};
    color: ${theme.colors.white};
	cursor: pointer;

    .inner {
      background-color: ${theme.colors.white};
    }

	&.padding {
		padding: 5px;
	}

	&.opaque {
		opacity: 0.3;
		&:hover {
			opacity: 1;
		}
	}
`);

const CheckIcon = styled.i(({ theme }) => css`
	font-size: 40px;
	color: ${theme.colors.lightGrey};
	&.selected {
		color: #48a852;
	}
`);

const AccountTier = ({ tier, selectedTier, limit, title }) => (
  <AccountTierCard tier={tier} className={`d-flex flex-column padding rounded mb-3 ${!selectedTier && 'opaque'}`}>
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
				{selectedTier 
					? <CheckIcon className="material-icons selected">check_circle</CheckIcon>
					: <GradientButton text="Upgrade" padding="5px 10px" />
				}
			</div>
		</div>
	</div>
  </AccountTierCard>
);

const BasicTab = () => {
  const [userSetting, setUserSettings] = useState("");
  const [userAccountLevel, setUserAccountLevel] = useState("");
  const [selectedTheme, selectTheme] = useState("");
  const [selectedTimezone, selectTimezone] = useState("");
  const [selectedCurrency, selectCurrency] = useState("");

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {

	// get user email
    Axios.get("http://localhost:3001/getUserEmail", {}).then((response) => {
      setUserEmail(response.data);
    });

    // get user settings from usersettings db
    Axios.get("http://localhost:3001/getUserSettings", {}).then((response) => {
      setUserSettings(response.data);
      selectTheme(response.data[0].theme);
      selectTimezone(response.data[0].timezone);
      selectCurrency(response.data[0].currency);
    });

    //get account level from db
    Axios.get("http://localhost:3001/getUserAccountLevel", {}).then((response) => {
      setUserAccountLevel(response.data[0].accountLevel);
    });

  }, []);

  //creat functionality to update user settings
  const updateUserSettings = () => {
    Axios.post("http://localhost:3001/updateUserSettings", {
        theme: selectedTheme,
        timezone: selectedTimezone,
        currency: selectedCurrency,
      }).then((response) => {
        //handle errors

      });
  };

  console.log(userAccountLevel, 'account level');


  return (
    <ContentTab>
      <div className="d-flex p-4 row">
        <div className="col-10 d-flex">
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
        <div className="col-2 d-flex bronze">
          <i className="material-icons me-2">emoji_events</i>
          <Paragraph>{userAccountLevel}</Paragraph>
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
              <option>Dark</option>
              <option>Light</option>
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
              <option>UTC+0</option>
              <option>UTC+1</option>
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
              <option>British Pounds (GBP)</option>
              <option>Didgeridollars (AUS)</option>
            </StyledDropdown>
          </EditableOption>
        </div>
      </div>
      <div className="d-flex px-4 row">
        <div className="col-12 col-lg-2 pb-4">
          <PrimaryButton text="Save" className="w-100" onClick={updateUserSettings} />
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
				selectedTier={userAccountLevel === 'Standard'}
			/>
        </div>
        <div className="col-12 col-lg-4">
			<AccountTier
				tier="bronze"
				title="Bronze"
				limit="5"
				selectedTier={userAccountLevel === 'Bronze'}
			/>
        </div>
        <div className="col-12 col-lg-4">
			<AccountTier
				tier="silver"
				title="Silver"
				limit="10"
				selectedTier={userAccountLevel === 'Silver'}
			/>
        </div>
        <div className="col-12 col-lg-4">
			<AccountTier
				tier="gold"
				title="Gold"
				limit="25"
				selectedTier={userAccountLevel === 'Gold'}
			/>
        </div>
        <div className="col-12 col-lg-4">
			<AccountTier
				tier="diamond"
				title="Diamond"
				limit="50"
				selectedTier={userAccountLevel === 'Diamond'}
			/>
        </div>
        <div className="col-12 col-lg-4">
			<AccountTier
				tier="six9Grey"
				title="Team"
				limit="100"
				selectedTier={userAccountLevel === 'Team'}
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

  console.log("email is", selectedEmail);
  console.log("password is", selectedPassword);
  console.log("auth type is", selectedAuthType);

  return (
    <ContentTab>
      <div className="d-flex p-4 row">
        <div className="col-12 col-lg-4">
          <EditableOption className="p-4">
            <Heading color="black" size="20px" bold>
              Update Email
            </Heading>
            <FormInput
              id="email"
              className="mb-3 w-100"
              type="text"
              placeholder="Email"
              value={selectedEmail}
              form="register"
              onChange={(e) => {
                selectEmail(e.target.value);
              }}
            />
          </EditableOption>
        </div>
        <div className="col-12 col-lg-4 my-3 my-lg-0">
          <EditableOption className="p-4">
            <Heading color="black" size="20px" bold>
              Update Password
            </Heading>
            <FormInput
              id="email"
              className="mb-3 w-100"
              type="password"
              placeholder="Password"
              value={selectedPassword}
              form="register"
              onChange={(e) => {
                selectPassword(e.target.value);
              }}
            />
          </EditableOption>
        </div>
      </div>
      <div className="d-flex px-4 row">
        <div className="col-12 col-lg-2 pb-4">
          <PrimaryButton text="Save" className="w-100" />
        </div>
      </div>
    </ContentTab>
  );
};

const KycTab = () => (
  <ContentTab className="text-white">KYC Goes here</ContentTab>
);

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
