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
  ProfileTabs,
  LoadingState,
} from "../../Components/Profile";
import { useNavigate } from "react-router";
import { FormInput, PageBody, InlineInput } from "../../Components/FormInputs";
import { AppUrl } from "../../App";

const Security = () => {
  const [selectedEmail, selectEmail] = useState("");
  const [selectedPassword, selectPassword] = useState("");
  const [selectedAuthType, selectAuthType] = useState("");
  const [twoFaOptions, setTwoFaOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const getUserEmail = () => {
    // get user email
    Axios.get(`${AppUrl}/getUserEmail`, {}).then((response) => {
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
    Axios.post(`${AppUrl}/getUser2FAOptions`, {}).then(
      (response) => {
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

  return (
    <PageBody>
      <div className="container pt-5">
        <ProfileTabs selected="Security" />
        <ContentTab className="position-relative">
          {twoFaOptions.length === 0 && <LoadingState />}
          <div className="d-flex p-4 row">
            <div className="col-12 col-lg-6 flex-column d-none">
              <Heading size="20px" bold>
                Email Settings
              </Heading>
              <div className="d-flex">
                <InlineInput value={userEmail} className="me-2" />
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
