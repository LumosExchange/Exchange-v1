import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import qrcode from "qrcode";
import styled, { css } from "styled-components";
import { PageBody } from "../Components/FormInputs";
import { FormInput, StyledLabel } from "../Components/FormInputs";
import PrimaryButton from "../Components/Buttons";
import Card from "../Components/Card";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";

const CodeSentMessage = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.valid};
    color: ${theme.colors.white};
    border: 2px solid ${theme.colors.valid};
    padding: 10px;
    border-radius: 10px;

    i {
      font-size: 70px;
      padding-bottom: 10px;
    }
  `
);

function GoogleAuth() {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userEmailVerification, setUserEmailVerification] = useState("");
  const [userPass, setUserPass] = useState("");
  const [secret, setSecret] = useState([]);

  let emailVerified = false;
  let passwordVerified = false;

  //Get User Email
  const getUserEmail = () => {
    Axios.get("http://localhost:3001/getUserEmail", {}).then((response) => {
      setUserEmail(response.data);
    });
  };

  //send email verification
  const sendVerification = () => {
    Axios.post("http://localhost:3001/2FAEmailVerificationSend", {});
    setIsCodeSent(true);
  };

  //Check email verification 
  const emailVerification = () => {
    Axios.post("http://localhost:3001/EmailVerification2FA", {
      passcode: userEmailVerification,
    }).then((response) => {
      if (!response.data.auth) {

        emailVerified = false;
      } else {
        emailVerified = true;
      }
      console.log("email verification : ", emailVerified);
    });
  };
  //check password verification
  const passwordVerification = () => {
    Axios.post("http://localhost:3001/checkChangePass", {
      oldPassword: userPass,
    }).then((response) => {
      if (!response.data.auth) {
        passwordVerified = false;
      } else {
        passwordVerified = true;
      }
      console.log("password verification : ", passwordVerified);
    });
  };

  //generate secret & save secret in db


  //display qr

  //check google auth code

  useEffect(() => {
    getUserEmail(userEmail);
  }, [userEmail]);

  console.log("user email is:", userEmail);

  return (
    <PageBody className="d-flex align-items-center justify-content-center py-5 flex-column">
      <div className="container col-12 col-md-8 col-xl-5 col-xxl-4">
        <Card
          radius="20px"
          color="darkerGrey"
          className="p-5 d-flex flex-column"
        >
          <Heading className="pb-4 text-center" bold>
            Add Google Auth
          </Heading>
          <StyledLabel
            htmlFor="emailVerification"
            fontSize="20px"
            padding="0"
            bold
            className={isCodeSent ? "d-none" : "d-block"}
          >
            Please note you will be required to complete email verification and
            know your current password before you will be allowed to add google
            auth to your account.
          </StyledLabel>
          {!isCodeSent ? (
            <PrimaryButton
              text="Get Code"
              className="m-auto my-3"
              onClick={sendVerification}
              type="check"
              value="check"
            />
          ) : (
            <CodeSentMessage className="d-flex my-4 align-items-center flex-column">
              <i className="material-icons me-2">mark_email_read</i>
              <Paragraph color="white" bold size="20px" className="mb-0">
                Code Sent to {userEmail}.
              </Paragraph>
            </CodeSentMessage>
          )}
          <div className={`w-100 ${isCodeSent ? "d-block" : "d-none"}`}>
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
                  setUserEmailVerification(e.target.value);
                }}
                className="w-100 mb-3"
              />
              <StyledLabel htmlFor="oldPass" fontSize="20px" padding="0" bold>
                Enter old password
              </StyledLabel>
              <FormInput
                type="text"
                id="Pass"
                name="Pass"
                placeholder="Enter password"
                onChange={(e) => {
                  setUserPass(e.target.value);
                }}
                className="w-100 mb-3"
              />
              <div className="col-12 p-0">
                <PrimaryButton
                  text="Check"
                  type="check"
                  //FIX THIS TOMORROW
                  //  onClick={}
                  className="w-100 h-100 mt-3"
                  disabled={!isCodeSent}
                />
              </div>
            </form>
          </div>
        </Card>
      </div>
    </PageBody>
  );
}

export default GoogleAuth;
