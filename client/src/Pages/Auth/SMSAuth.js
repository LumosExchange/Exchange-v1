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
import { IconHelper } from "../Login";

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
	const [phoneNumber, setPhoneNumber] = useState("");
	const [userEmailVerification, setUserEmailVerification] = useState("");
	const [requestId, setRequestId] = useState("");
	const [userSMSCode, setUserSMSCode] = useState("");
	const [passwordVerified, setPasswordVerified] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);
	const [errors, setErrors] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [verified, setVerified] = useState("");

	//send email
	const sendVerification = () => {
		Axios.post("http://3.8.159.233:3001/2FAEmailVerificationSend", {}).then((response) => {
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

	//Check email && password verification
	const emailVerification = () => {
		Axios.post("http://3.8.159.233:3001/Email&PassVerification2FA", {
			passcode: userEmailVerification,
			oldPassword: userPass,
		}).then((response) => {
			if (response.data.auth === true) {
				setVerified(true);
				setCurrentStep(3);
			} else {
				setVerified(false);
				setErrors(response.data.message);
			}
		});
	};

	//send user phonenumber to vonage api request
	const SendSMS = () => {
		Axios.post("http://3.8.159.233:3001/VonageSMSRequest", {
			number: phoneNumber,
		}).then((response) => {
			console.log(response, 'response from sms send');
			if (response.data.status === "0"){
				setRequestId(response.data.requestId);
				console.log("request id: ", response.data.requestId);
				setCurrentStep(4);
			} else {
				setErrors(response.data.errorMessage);
			}
		});
	};

	//verify the sms auth
	const VerifyUser = (event) => {
		event.preventDefault();
		console.log('verify started');
		//pass through code and request ID for the end point
		Axios.post("http://3.8.159.233:3001/VonageSMSVerify", {
			//send code and request ID
			userCode: userSMSCode,
			requestId: requestId,
			number: phoneNumber,
		}).then((response) => {
			//Handle the requestId as needed on the verify function
			console.log("response: ", response);
			if (response.data.result === "0") {
				setCurrentStep(5);
				setSuccessMessage(response.data.message);
			} else {
				setErrors(response.data.message);
			}
		});
	};

	const navigate = useNavigate();

	return (
		<PageBody className="d-flex align-items-center justify-content-center py-5 flex-column">
			<div className="container col-12 col-md-8 col-xl-5 col-xxl-4">
				<Card radius="20px" className="p-5 d-flex flex-column">
					<Heading className="pb-4 text-center" bold>
						Add SMS Auth
					</Heading>
					{currentStep === 1 && (
						<React.Fragment>
							<StyledLabel htmlFor="emailVerification" fontSize="20px" padding="0" bold>
								Please note you will be required to complete email verification and know your current
								password before you will be allowed to add SMS auth to your account.
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
									<StyledLabel htmlFor="emailVerification" fontSize="20px" padding="0" bold>
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
									<StyledLabel htmlFor="pass" fontSize="20px" padding="0" bold>
										Enter password
									</StyledLabel>
									<FormInput
										type="password"
										id="pass"
										name="pass"
										placeholder="Enter current password"
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
										}}
										className="w-100 h-100 mt-3"
										disabled={
											userEmailVerification.length > 6 ||
											userEmailVerification.length < 5 ||
											userPass.length === 0
										}
									/>
									{errors && (
										<div className="col-12 mt-3 p-0">
											<div className="d-flex">
												<IconHelper className="material-icons me-2 mt-1" color="invalid">error_outline</IconHelper>
												<Paragraph color="invalid" size="20px" className="mb-0">{errors}</Paragraph>
											</div>
										</div>
									)}
								</React.Fragment>
							)}
							<div className="row">
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
												}}
												className="w-100 h-100"
												disabled={phoneNumber.length < 1}
											/>
										</div>
										{errors && (
											<div className="col-12 mt-3 p-0">
												<div className="d-flex">
													<IconHelper className="material-icons me-2 mt-1" color="invalid">error_outline</IconHelper>
													<Paragraph color="invalid" size="20px">{errors}</Paragraph>
												</div>
											</div>
										)}
									</React.Fragment>
								)}
								{currentStep === 4 && (
									<React.Fragment>
										<div className="col-12 p-0">
											<StyledLabel htmlFor="userNumber" fontSize="20px" padding="0" bold>
												Enter Verification Code
											</StyledLabel>
											<FormInput
												type="text"
												id="userNumber"
												name="userNumber"
												placeholder="Enter SMS verification code"
												maxLength="6"
												onChange={(e) => {
													e.preventDefault();
													setUserSMSCode(e.target.value);
												}}
												className="w-100"
											/>
										</div>
										<div className="col-12 p-0 mt-3">
											<PrimaryButton
												type="Verify"
												text="Verify"
												onClick={VerifyUser}
												className="w-100"
												disabled={userSMSCode.length !== 6}
											/>
										</div>
										{errors && (
											<div className="col-12 mt-3 p-0">
												<div className="d-flex">
													<IconHelper className="material-icons me-2" color="invalid">error_outline</IconHelper>
													<Paragraph color="invalid" size="20px" className="mb-0">{errors}</Paragraph>
												</div>
											</div>
										)}
									</React.Fragment>
								)}
								{currentStep === 5 && (
									<React.Fragment>
										<CodeSentMessage className="d-flex mb-4 align-items-center flex-column">
											<i className="material-icons me-2">check_circle</i>
											<Paragraph bold size="20px" className="mb-0">
												SMS Auth Successfully added
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
							</div>
						</form>
					</div>
				</Card>
			</div>
		</PageBody>
	);
}

export default SMSAuth;
