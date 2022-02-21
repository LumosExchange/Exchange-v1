import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import PrimaryButton from "../../Components/Buttons";
import Axios from "axios";
import {
  ContentTab,
  EditableOption,
  TwoFAOption,
  ProfileTabLink,
  Tabs,
} from "../../Components/Profile";
import { useNavigate } from "react-router";
import { FormInput, PageBody, InlineInput } from "../../Components/FormInputs";

const Security = () => {
  const [selectedEmail, selectEmail] = useState("");
  const [selectedPassword, selectPassword] = useState("");
  const [selectedAuthType, selectAuthType] = useState("");
  const [twoFaOptions, setTwoFaOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const getUserEmail = () => {
    // get user email
    Axios.get("http://localhost:3001/getUserEmail", {}).then((response) => {
      if (response.data.length > 0) {
		  setUserEmail(response.data);
	  } else {
		  setIsLoading(true);
	  }
    });
  };

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
	getUserEmail();
  }, []);

  console.log(twoFaOptions, "2fa options");

  return (
    <PageBody>
        <div className="container pt-5">
			<Tabs>
				<ProfileTabLink href="/Profile/Basic">Basic</ProfileTabLink>
				<ProfileTabLink href="/Profile/Security" className="selected">Security</ProfileTabLink>
				<ProfileTabLink href="/Profile/KYC">KYC</ProfileTabLink>
				<ProfileTabLink href="/Profile/PaymentMethods">Payment Methods</ProfileTabLink>
				<ProfileTabLink href="/Profile/AccountUpgrade">
            Account Upgrade
          </ProfileTabLink>
			</Tabs>
			<ContentTab>
				<div className="d-flex p-4 row">
					<div className="col-12 col-lg-6 d-flex flex-column">
						<Heading size="20px" bold>
							Email Settings
						</Heading>
						<div className="d-flex">
							<InlineInput
								value={userEmail}
								className="me-2"
							/>
							<PrimaryButton
								text="Change Email"
								onClick={() => navigate("/changeEmail", { replace: true })}
							/>
						</div>
					</div>
					<div className="col-12 col-lg-4 my-3 my-lg-0">
						<Heading size="20px" bold>
							Password Settings
						</Heading>
						<PrimaryButton
							text="Change Password"
							onClick={() => navigate("/ChangePassword")}
						/>
					</div>
				</div>
				<div className="d-flex p-4 row">
					<div className="col-12">
						<Heading size="20px" bold>
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
        </div>
    </PageBody>
  );
};

export default Security;
