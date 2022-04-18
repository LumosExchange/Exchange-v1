import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled, { css, keyframes } from "styled-components";
import { PageBody } from "../Components/FormInputs";
import { FormInput, StyledLabel } from "../Components/FormInputs";
import PrimaryButton from "../Components/Buttons";
import Card from "../Components/Card";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import VerifyBG from '../Images/verifybg.svg';
import ErrorBG from '../Images/errorbg.svg';
import { IconHelper } from "./Login";
import { useNavigate } from "react-router";
import { AppUrl } from "../App";

const GrabAttention = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.050); }
  100% { transform: scale(1); }
`;

export const CodeSentMessage = styled.div(({ theme, error }) => css`
	background: url(${error ? ErrorBG : VerifyBG});
	background-size: contain;
	color: ${theme.colors.actual_white};
	border: 2px solid transparent;
	padding: 10px;
	border-radius: 10px;
	animation: ${GrabAttention} 0.5s 1 linear;

	i {
		font-size: 70px;
		padding-bottom: 10px;
	};

	p { color: inherit };
`);

function ChangePassword() {
  const [userVerification, setUserVerification] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPass, setCheckNewPass] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [errors, setErrors] = useState("");
  const [verified, setVerified] = useState("");



  //send email 
  const sendVerification = () => {
	Axios.post(`${AppUrl}/2FAEmailVerificationSend`, {}).then((response) => {
		if (response.data.email) {
			setUserEmail(response.data.email);
			setIsCodeSent(true);
			setCurrentStep(2);
		} else {
			setIsCodeSent(false);
			setErrors(response.data.message);
		}
	});
  };

  //check email & pass verification
  const emailVerification = () => {
    Axios.post(`${AppUrl}/Email&PassVerification2FA`, {
      passcode: userVerification,
	  oldPassword: oldPassword,
    }).then((response) => {
      if (response.data.auth === true) {
		setVerified(true);
		setCurrentStep(3);
		setErrors("");
      } else {
		setVerified(false);
		setErrors(response.data.message);
      }
    });
  };



  //if both above are true then update user password
  const checkRequirements = () => {
      Axios.post(`${AppUrl}/updateUserPass`, {
        password: newPassword,
      }).then((response) => {
        //handle response here
        if(response.data.updated === true) {
          setCurrentStep(4);
        } else {
			setErrors(response.data.message);
        }
      });  
  };

  const navigate = useNavigate();


  return (
    <PageBody className="d-flex align-items-center justify-content-center py-5 flex-column">
      <div className="container col-12 col-md-8 col-xl-5 col-xxl-4">
        <Card
          radius="20px"
          className="p-5 d-flex flex-column"
        >
          <Heading className="pb-3 text-center" bold>Change Password</Heading>
          <Paragraph
            htmlFor="emailVerification"
            size="20px"
            padding="0"
			className={isCodeSent ? 'd-none' : 'd-block mb-3'}
          >
            Please note you will be required to complete email verification and
            know your current password before you will be allowed to change the
            password on the account.
          </Paragraph>
          {!isCodeSent && (
            <PrimaryButton
                text="Get Code"
                className="m-auto mt-3"
                onClick={sendVerification}
                type="check"
                value="check"
            />
          )}
          <div className="w-100">
            <form>
				{currentStep === 2 && (
					<React.Fragment>
						<CodeSentMessage className="d-flex my-4 align-items-center flex-column">
							<i className="material-icons me-2">mark_email_read</i>
							<Paragraph bold size="20px" className="mb-0">Code Sent to {userEmail}.</Paragraph>
						</CodeSentMessage>
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
							setUserVerification(e.target.value);
							}}
							className="w-100 mb-3"
						/>
						<StyledLabel htmlFor="oldPass" fontSize="20px" padding="0" bold>
							Enter old password
						</StyledLabel>
						<FormInput
							type="password"
							id="oldPass"
							name="oldPass"
							placeholder="Enter old password"
							onChange={(e) => {
							setOldPassword(e.target.value);
							}}
							className="w-100 mb-3"
						/>
						<div className="col-12 p-0">
							<PrimaryButton
								text="Verifiy Code"
								type="check"
								onClick={(event) => {
									event.preventDefault();
									emailVerification();
								}}
								className="w-100 h-100 mt-3"
							/>
						</div>
					</React.Fragment>
				)}
			  	{currentStep === 3 && (
				  <React.Fragment>
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
								text="Change Password"
								type="check"
								onClick={(event) => {
									event.preventDefault();
									checkRequirements();
								}}
								className="w-100 h-100 mt-3"
								disabled={ !isCodeSent }
							/>
						</div>
					</React.Fragment>
				)}
				{currentStep === 4 && (
					<React.Fragment>
						<CodeSentMessage className="d-flex mb-4 align-items-center flex-column">
							<i className="material-icons me-2">check_circle</i>
							<Paragraph bold size="20px" className="mb-0">
								Password changed successfully!
							</Paragraph>
						</CodeSentMessage>
						<PrimaryButton
							type="text"
							text="OK"
							onClick={(event) => {
								event.preventDefault();
								navigate('/Profile/Security')
							}}
							className="w-100 h-100 mt-3"
						/>
					</React.Fragment>
				)}
				{errors && (
					<div className="d-flex mt-4">
						<IconHelper color="invalid" className="material-icons me-2">error_outline</IconHelper>
						<Paragraph color="invalid" size="20px" className="mb-0">
							{errors}
						</Paragraph>
					</div>
				)}
            </form>
          </div>
        </Card>
      </div>
    </PageBody>
  );
}

export default ChangePassword;
