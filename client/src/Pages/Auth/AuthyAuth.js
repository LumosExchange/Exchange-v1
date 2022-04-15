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
import AuthyLogo from "../../Images/icon-authy-logo.svg";

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

const QRCode = styled.img`
	width: 100%;
	max-width: 200px;
`;

const AuthyAuth = () => {
	const [isCodeSent, setIsCodeSent] = useState(false);
	const [userEmail, setUserEmail] = useState("");
	const [userEmailVerification, setUserEmailVerification] = useState("");
	const [userPass, setUserPass] = useState("");
	const [emailVerified, setEmailVerified] = useState(false);
	const [passwordVerified, setPasswordVerified] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);
	const [secret, setSecret] = useState([]);
	const [verified, setVerifed] = useState(false);
	const [Twofa, setTwofaCode] = useState("");

    //Get User Email
	const getUserEmail = () => {
		Axios.get("http://3.8.159.233:3001/getUserEmail", {}).then((response) => {
		  setUserEmail(response.data);
		});
	  };

	//send email verification
	const sendVerification = () => {
		Axios.post("http://3.8.159.233:3001/2FAEmailVerificationSend", {});
		setIsCodeSent(true);
		setCurrentStep(2);
	};

	//Check email verification
	const emailVerification = () => {
		Axios.post("http://3.8.159.233:3001/EmailVerification2FA", {
		passcode: userEmailVerification,
		}).then((response) => {
		console.log("response email", response.data.auth);
		if (response.data.auth === true) {
			setEmailVerified(true);
		} else {
			setEmailVerified(false);
		}
		});
	};

	//check password verification
	const passwordVerification = () => {
		Axios.post("http://3.8.159.233:3001/checkChangePass", {
		oldPassword: userPass,
		}).then((response) => {
		console.log("response pass", response.data.auth);
		if (response.data.auth === true) {
			setPasswordVerified(true);
		} else {
			setPasswordVerified(false);
		}
		});
	};

	//display qr
	const ShowGoogleAuthQR = () => {
	const originalImg = document.getElementById("QRCode");
	console.log(originalImg, "is original image found?");

		qrcode.toDataURL(secret.otpauth_url, function (err, data_url) {
			originalImg.src = data_url;
		});
	};

	const checkRequirements = () => {
		//Check email verification, password verification
	
		console.log(
		  "email verified: ",
		  emailVerified,
		  "passwordVerified: ",
		  passwordVerified
		);
		if (emailVerified === true && passwordVerified === true) {
		  //check google auth code
	
		  Axios.get("http://3.8.159.233:3001/VerifyGoogle2FASetup", {
			params: {
			  passcode: Twofa,
			  secret: secret.base32
			},
	
			//Check response for validation if no response
		  }).then((response) => {
			if (response.data === true) {
			  setVerifed(true);
			  setCurrentStep(4);
			} else {
			  console.log("Result", response.data);
			  setVerifed(false);
	
			  //handle anything else here
			}
		  });
		} else {
		}
	};

  //generate secret
  useEffect(() => {
	getUserEmail();
    async function getSecret() {
      const response = await Axios.post("http://3.8.159.233:3001/getSecret");
      console.log(response.data.base32, "response from getSecret2");
      setSecret(response.data);
    }

    if (secret.length === 0) {
      getSecret();
    }
  }, [secret]);

  	console.log("user email is:", userEmail);

	return (
		<PageBody className="d-flex align-items-center justify-content-center py-5 flex-column">
		<div className="container col-12 col-md-8 col-xl-5 col-xxl-4">
			<Card radius="20px" className="p-5 d-flex flex-column">
			<Heading className="pb-4 text-center" bold>
				Add Authy
			</Heading>
			{currentStep === 1 && (
				<React.Fragment>
				<StyledLabel
					htmlFor="emailVerification"
					fontSize="20px"
					padding="0"
					bold
				>
					Please note you will be required to complete email verification
					and know your current password before you will be allowed to add
					google auth to your account.
				</StyledLabel>
				<PrimaryButton
					text="Get Code"
					className="m-auto my-3"
					onClick={sendVerification}
					type="check"
					value="check"
				/>
				</React.Fragment>
			)}
			<div className="w-100">
				<form>
				{currentStep === 2 && (
					<React.Fragment>
					<CodeSentMessage className="d-flex mb-4 align-items-center flex-column">
						<i className="material-icons me-2">mark_email_read</i>
						<Paragraph bold size="20px" className="mb-0">
						Code Sent to {userEmail}.
						</Paragraph>
					</CodeSentMessage>
					<StyledLabel
						htmlFor="smsVerification"
						fontSize="20px"
						padding="0"
						bold
					>
						Enter Email Verification Code
					</StyledLabel>
					<FormInput
						type="text"
						id="emailVerification"
						name="emailVerification"
						placeholder="Enter 2FA Code"
						onChange={(e) => {
						setUserEmailVerification(e.target.value);
						}}
						className="w-100 mb-3"
					/>
					<StyledLabel
						htmlFor="oldPass"
						fontSize="20px"
						padding="0"
						bold
					>
						Enter your password
					</StyledLabel>
					<FormInput
						type="password"
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
						className="w-100 h-100 mt-3"
						disabled={!isCodeSent}
						onClick={(event) => {
							event.preventDefault();
							emailVerification();
							passwordVerification();
							ShowGoogleAuthQR();
							setCurrentStep(3);
						}}
						/>
					</div>
					</React.Fragment>
				)}
              <React.Fragment>
                <div
                  className={`w-100 justify-content-center flex-column ${
                    currentStep === 3 ? "d-block" : "d-none"
                  }`}
                >
                  <div className="col-12 m-auto text-center flex-column">
                    <QRCode
                      id="QRCode"
                      src=""
                      alt="QR Code"
                      className="m-auto mb-3"
                    />
                    {currentStep === 3 && (
                      <Paragraph size="18px" className="mb-0">
                        Please scan the QR code with Authy, once
                        added it will provide a 6 digit 2FA code to enter below.
                      </Paragraph>
                    )}
                  </div>
                </div>
                {currentStep === 3 && (
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
                        onClick={(event) => {
                          event.preventDefault();
                          checkRequirements();
                        }}
                        className="w-100 h-100"
                      />
                    </div>
                  </div>
                )}
                {currentStep === 4 && (
                  <CodeSentMessage className="d-flex mb-4 align-items-center flex-column">
                    <i className="material-icons me-2">check_circle</i>
                    <Paragraph bold size="20px" className="mb-0">
                      Google Auth Successfully added
                    </Paragraph>
                  </CodeSentMessage>
                )}
              </React.Fragment>
				</form>
			</div>
			</Card>
		</div>
		</PageBody>
	);
}

export default AuthyAuth;
