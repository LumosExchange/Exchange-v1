import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import qrcode from "qrcode";
import styled, { css } from "styled-components";
import { PageBody } from "../../Components/FormInputs";
import { FormInput, StyledLabel } from "../../Components/FormInputs";
import PrimaryButton from "../../Components/Buttons";
import Card from "../../Components/Card";
import Heading from "../../Components/Heading";
import Paragraph from "../../Components/Paragraph";
import GoogleAuthLogo from "../../Images/icon-google.png";

const CodeSentMessage = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.valid};
    color: ${theme.colors.text_primary};
    border: 2px solid ${theme.colors.valid};
    padding: 10px;
    border-radius: 10px;

    i {
      font-size: 70px;
      padding-bottom: 10px;
    }
  `
);

const AuthIcon = styled.div(
  ({ theme }) => css`
    border: 2px solid ${theme.colors.text_primary};
    border-radius: 50px;
    padding: 10px;
    i {
      font-size: 50px;
      color: ${theme.colors.text_primary};
    }

    img {
      width: 50px;
      height: 50px;
    }

    &:hover {
      border: 2px solid ${theme.colors.primary_cta};
    }
  `
);

const QRCode = styled.img`
  width: 100%;
  max-width: 200px;
`;

function GoogleAuth() {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userEmailVerification, setUserEmailVerification] = useState("");
  const [userPass, setUserPass] = useState("");
  const [secret, setSecret] = useState([]);
  const [Twofa, setTwofaCode] = useState("");
  const [verified, setVerifed] = useState(false);
  const [toggled, setToggled] = useState(false);

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

  //generate secret
  useEffect(() => {
    async function getSecret() {
      const response = await Axios.post("http://localhost:3001/getSecret");
      console.log(response.data.base32, "response from getSecret2");
      setSecret(response.data);
    }

    if (secret.length === 0) {
      getSecret();
    }
  }, [secret]);

  //display qr
  function ShowGoogleAuthQR() {
    var originalImg = document.getElementById("QRCode");
    setToggled(true);

    qrcode.toDataURL(secret.otpauth_url, function (err, data_url) {
      originalImg.src = data_url;
    });
  }

  async function checkRequirements(event) {

    event.preventDefault();
    //Check email verification, password verification
    if (emailVerified === true && passwordVerified === true) {
      //check google auth code
      console.log("we get here");
      Axios.get("http://localhost:3001/VerifyGoogle2FA", {
        params: {
          passcode: Twofa,
        },
        
        //Check response for validation if no response
      }).then((response) => {
        console.log('Result', response.data);
        setVerifed(response.data);
        if (verified === true) {
          console.log("result: ", verified);
          //redirect user and display some success message
        } else {
          //display error message incorrect 2FA code
          console.log(response.err);
        }
      });
    } else {
    }
  };

  useEffect(() => {
    getUserEmail(userEmail);
  }, [userEmail]);

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
              <Paragraph bold size="20px" className="mb-0">
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
                  onClick={(event) => {
                    event.preventDefault();
                    emailVerification();
                    passwordVerification();
                    ShowGoogleAuthQR();
                  }}
                  className="w-100 h-100 mt-3"
                  disabled={!isCodeSent}
                />
              </div>

              <div
                className={`w-100 justify-content-center py-4 flex-column ${
                  toggled ? "d-flex" : "d-none"
                }`}
              >
                <div className="col-12 m-auto text-center flex-column">
                  <QRCode id="QRCode" alt="QR Code" className="m-auto mb-3" />
                  <Paragraph size="18px" className="mb-0">
                    Please enter 6 digit 2FA code below
                  </Paragraph>
                </div>
              </div>
              <div className="w-100 row mt-4">
                <div className="col-12 col-md-8">
                  <FormInput
                    type="text"
                    id="Code"
                    name="code"
                    placeholder="Enter 2FA Code"
                    onChange={(e) => {
                      setTwofaCode(e.target.value);
                    }}
                    className="w-100"
                  />
                </div>
                <div className="col-12 col-md-4 p-0">
                  <PrimaryButton
                    type="submit"
                    text="Submit"
                    onClick={checkRequirements}
                    className="w-100 h-100"
                  />
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </PageBody>
  );
}

export default GoogleAuth;
