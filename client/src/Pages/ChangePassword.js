import React, { useState, useEffect } from "react";
import Axios from "axios";
import { PageBody } from "../Components/FormInputs";
import { FormInput } from "../Components/FormInputs";
import PrimaryButton from "../Components/Buttons";
import Card from "../Components/Card";
import Heading from "../Components/Heading";

function ChangePassword() {
  const [userVerification, setUserVerification] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPass, setCheckNewPass] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);

  //send email verification
  const sendEmailVerification = () => {
    Axios.post("http://localhots:3001/2FAEmailVerificationSend", {});
  };

  //check email verification
  const emailVerification = () => {
    Axios.post("http://localhost:3001/VerifyEmail2FA", {
      passcode: userVerification,
    }).then((response) => {
      if (!response.data.auth) {
        setEmailStatus(false);
      } else {
        setEmailStatus(true);
      }
    });
  };
   //check old password is match for old password
  const checkOldPass = () => {
    Axios.post("/checkChangePass", {
      oldPassword: oldPassword
    }).then((response) => {
      if (!response.data.auth) {     
        setPasswordStatus(false);
      } else {
        setPasswordStatus(true);
      }
    });
  };

  //if both above are true then update user password
  const checkRequirements = () => {
    //check both passwords are equal
    if (newPassword === checkNewPass) {
      //then check email verification and old passverification
      if (emailStatus === true && passwordStatus === true) {
        Axios.post("/updateUserPass", {
          password: newPassword
        }).then((response) => {
          //handle response here if we pass one 
        })
      }

    }else {

    };

  };



  // TODO - pass user input for email verifasction to setUserVerification
  //      - pass old password to setOldPassword
  //      - pass new password to setNewPass
  //      - pass new password repeat to setCheckNewPass

  return (
    <PageBody className="d-flex align-items-center justify-content-center py-5 flex-column">
      <div className="container col-12 col-md-8 col-xl-5 col-xxl-4">
        <Card radius="20px" color="darkerGrey" className="p-5 d-flex flex-column">
          <Heading className="pb-4 text-center">
            Reset Password
          </Heading>
          <div className="w-100">
            <form>
                <FormInput
                  type="text"
                  id="emailVerification"
                  name="emailVerification"
                  placeholder="Enter current email"
                  onChange={(e) => {
                    setUserVerification(e.target.value);
                  }}
                  className="w-100 mb-3"
                />
                <FormInput
                  type="text"
                  id="oldPass"
                  name="oldPass"
                  placeholder="Enter old password"
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                  className="w-100 mb-3"
                />
                <FormInput
                  type="text"
                  id="newPass"
                  name="newPass"
                  placeholder="Enter new password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  className="w-100 mb-3"
                />
                <FormInput
                  type="text"
                  id="repeatNewPass"
                  name="repeatNewPass"
                  placeholder="Repeat new password"
                  onChange={(e) => {
                    setCheckNewPass(e.target.value);
                  }}
                  className="w-100 mb-3"
                />
                <div className="col-12 p-0">
                  <PrimaryButton
                    text="Submit"
                    type="submit"
                    className="w-100 h-100"
                  />
                </div>
              </form>
            </div>
        </Card>
      </div>
  </PageBody>
  );
}

export default ChangePassword;
