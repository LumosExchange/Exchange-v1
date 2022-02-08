
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

function SMSAuth() {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [userPass, setUserPass] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userEmailVerification, setUserEmailVerification] = useState('');
  const [requestId, setRequestId] = useState('');
  const [userSMSCode, setUserSMSCode] = useState('');
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);



  //send email
  const getUserEmail = () => {
    // get user email
    Axios.get("http://localhost:3001/getUserEmail", {}).then((response) => {
      setUserEmail(response.data);
    });
  };

  const sendVerification = () => {
    Axios.post("http://localhost:3001/2FAEmailVerificationSend", {});
    setIsCodeSent(true);
	setCurrentStep(2);
  };

  //get email verification code and password and check if both true
  //Check email verification
  const emailVerification = () => {
    Axios.post("http://localhost:3001/EmailVerification2FA", {
      passcode: userEmailVerification,
    }).then((response) => {
      if (response.data.auth === true) {
        setEmailVerified(true);
      } else {
        setEmailVerified(false);
      }
    });
  };

  //check password verification
  const passwordVerification = () => {
    Axios.post("http://localhost:3001/checkChangePass", {
      oldPassword: userPass,
    }).then((response) => {
      if (response.data.auth === true) {
        setPasswordVerified(true);
      } else {
        setPasswordVerified(false);
      }

    });
  };

  //send user phonenumber to vonage api request
  const SendSMS = () => {
    Axios.post("http://localhost:3001/VonageSMSRequest", {
      number: phoneNumber,
    }).then((response) => {
      //Handle the requestId as needed on the verify function
      console.log('request id: ', response.data.requestId);
      setRequestId(response.data.requestId);
    });
  };
 
  //verify the sms auth 
  const verify = () => {
    //pass through code and request ID for the end point
    Axios.post("http://localhost:3001/VonageSMSVerify", {
      //send code and request ID
      userCode: userSMSCode,
      requestId: requestId
    }).then((response) => {
      //Handle the requestId as needed on the verify function
      console.log('response: ', response);
    })
  }

  useEffect(() => {
    getUserEmail(userEmail);
  }, [userEmail]);

  console.log("user email is:", userEmail);

  return (
    <PageBody className="d-flex align-items-center justify-content-center py-5 flex-column">
      <div className="container col-12 col-md-8 col-xl-5 col-xxl-4">
        <Card
          radius="20px"
          className="p-5 d-flex flex-column"
        >
          <Heading className="pb-4 text-center" bold>
            Add SMS Auth
          </Heading>
          {currentStep === 1 && (
			<React.Fragment>
				<StyledLabel
					htmlFor="emailVerification"
					fontSize="20px"
					padding="0"
					bold
				>
					Please note you will be required to complete email verification and
					know your current password before you will be allowed to add SMS
					auth to your account.
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
					placeholder="Enter 2FA code"
					onChange={(e) => {
						setUserEmailVerification(e.target.value);
					}}
					className="w-100 mb-3"
				/>
				<StyledLabel htmlFor="oldPass" fontSize="20px" padding="0" bold>
					Enter password
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
                <PrimaryButton
                  text="Check"
                  type="check"
                  onClick={(event) => {
                    event.preventDefault();
                    emailVerification();
                    passwordVerification();
					setCurrentStep(3);
                  }}
                  className="w-100 h-100 mt-3"
                  disabled={!isCodeSent}
                />
				</React.Fragment>
				)}
              <div className="w-100 row mt-4">
			  {currentStep === 3 && (
				  <React.Fragment>
					<div className="col-12">
					<StyledLabel htmlFor="phoneNumber" fontSize="20px" padding="0" bold>
						Enter Your Phone Number
					</StyledLabel>
						<FormInput
							type="text"
							id="phoneNumber"
							name="phoneNumber"
							placeholder="Enter Phone Number"
							onChange={(e) => {
								setPhoneNumber(e.target.value);
							}}
							className="w-100 mb-3"
						/>
					</div>
					<div className="col-12">
						<PrimaryButton
							type="Send"
							text="Get Code"
							onClick={(event) => {
								event.preventDefault();
								SendSMS();
								setCurrentStep(4);
							}}
							className="w-100 h-100"
							disabled={phoneNumber.length < 1}
						/>
					</div>
				</React.Fragment>
			  )}
			  {currentStep === 4 && (
			  	<React.Fragment>
					<div className="col-12 col-md-8">
					<FormInput
						type="text"
						id="userNumber"
						name="userNumber"
						placeholder="Enter SMS verification code"
						onChange={(e) => {
							setUserSMSCode(e.target.value);
						}}
						className="w-100"
					/>
					</div>
					<div className="col-12 col-md-4 p-0">
					<PrimaryButton
						type="Verify"
						text="Verify"
						onClick={(event) => {
						event.preventDefault();
							verify();
							setCurrentStep(5);
						}}
						className="w-100 h-100"
					/>
					</div>
				</React.Fragment>
				)}
                {currentStep === 5 && (
                  <CodeSentMessage className="d-flex mb-4 align-items-center flex-column">
                    <i className="material-icons me-2">check_circle</i>
                    <Paragraph bold size="20px" className="mb-0">
                      	SMS Auth Successfully added
                    </Paragraph>
                  </CodeSentMessage>
                )}
			</div>
            </form>
          </div>
        </Card>
      </div>
    </PageBody>
  );
}

export default SMSAuth;
