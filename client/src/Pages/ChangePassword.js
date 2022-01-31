import React, { useState, useEffect } from "react";
import Axios from "axios";
import { PageBody } from "../Components/FormInputs";
import { FormInput, StyledLabel } from "../Components/FormInputs";
import PrimaryButton from "../Components/Buttons";
import Card from "../Components/Card";
import Heading from "../Components/Heading";
import { useLocation } from "react-router";

function ChangePassword() {
  const [userVerification, setUserVerification] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPass, setCheckNewPass] = useState("");
  
  let updateCompleted = false;

  let emailVerified = false;
  let passwordVerified = false;
  const { state } = useLocation();

  //send email verification
  const sendVerification = () => {
    Axios.post("http://localhost:3001/2FAEmailVerificationSend", {});
  };

  //check email verification
  const emailVerification = () => {
    Axios.post("http://localhost:3001/EmailVerification2FA", {
      passcode: userVerification,
    }).then((response) => {
      if (!response.data.auth) {
        console.log("Auth1: ", response.data.auth);
        emailVerified = false;
      } else {
        console.log("Auth2: ", response.data.auth);
        emailVerified = true;
      }
      console.log("email verification : ", emailVerified);
    });
  };

  //check old password is match for old password
  const checkOldPass = () => {
    Axios.post("http://localhost:3001/checkChangePass", {
      oldPassword: oldPassword,
    }).then((response) => {
      if (!response.data.auth) {
        passwordVerified = false;
      } else {
        passwordVerified = true;
      }
      console.log("password verification : ", passwordVerified);
    });
  };

  //if both above are true then update user password
  const checkRequirements = () => {
    //check both passwords are equal
    if (
      newPassword == checkNewPass ||
      (emailVerified == true && passwordVerified == true)
    ) {
      console.log("we get here");
      Axios.post("http://localhost:3001/updateUserPass", {
        password: newPassword,
      }).then((response) => {
        //handle response here
        if(!response.data.updated) {
          updateCompleted = false;
        } else {
          updateCompleted = true;
        }
      });
    } else {
    }
  };

  // TODO - pass user input for email verifasction to setUserVerification
  //      - pass old password to setOldPassword
  //      - pass new password to setNewPass
  //      - pass new password repeat to setCheckNewPass
  //      - pass repsonse to updateCompleted 

  return (
    <PageBody className="d-flex align-items-center justify-content-center py-5 flex-column">
      <div className="container col-12 col-md-8 col-xl-5 col-xxl-4">
        <Card
          radius="20px"
          color="darkerGrey"
          className="p-5 d-flex flex-column"
        >
          <Heading className="pb-4 text-center">Change Password</Heading>
          <StyledLabel
            htmlFor="emailVerification"
            fontSize="20px"
            padding="0"
            bold
          >
            Please note you will be required to complete email verification and
            know your current password before you will be allowed to change the
            password on the account.
          </StyledLabel>
          <PrimaryButton
            text="Get Code"
            className="m-auto mt-3"
            onClick={sendVerification}
            type="check"
            value="check"
          />

          <div className="w-100">
            <form>
              <StyledLabel
                htmlFor="emailVerification"
                fontSize="20px"
                padding="0"
                bold
              >
                Enter email verification code
              </StyledLabel>
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
              <StyledLabel htmlFor="oldPass" fontSize="20px" padding="0" bold>
                Enter old password
              </StyledLabel>
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
              <StyledLabel htmlFor="newPass" fontSize="20px" padding="0" bold>
                Enter new password
              </StyledLabel>
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
              <StyledLabel
                htmlFor="repeatNewPass"
                fontSize="20px"
                padding="0"
                bold
              >
                Repeat new password
              </StyledLabel>
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
                  text="check"
                  type="check"
                  //FIX THIS TOMORROW
                  onClick={(event) => {
                    event.preventDefault();
                    emailVerification();
                    checkOldPass();
                    checkRequirements();
                  }}
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
