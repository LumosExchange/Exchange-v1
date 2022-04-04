import React, { useState, Alert, useEffect } from "react";
import styled, { css } from "styled-components";
import "../App.css";
import Axios from "axios";
import { useNavigate } from "react-router";
import Heading from "../Components/Heading";
import PrimaryButton from "../Components/Buttons";
import { FormInput, FormCheckbox, StyledLabel, PageBody, StyledDropdown } from "../Components/FormInputs";
import WarningTriangle from "../Images/icon-park-outline_caution.svg";
import Paragraph from "../Components/Paragraph";
import Buttons from "../Components/Buttons";
import { Nationalities } from "../Constants/Index";
import { IconHelper } from "./Login";

const WarningIconBase = styled.svg(
	({ theme }) => css`
		min-width: 48px;
		height: 48px;

		path {
			stroke: ${theme.colors.primary_cta};
		}
	`
);

export const Warning = () => (
	<WarningIconBase
		width="48"
		height="48"
		viewBox="0 0 48 48"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="me-3"
	>
		<path d="M24 5L2 43H46L24 5Z" strokeWidth="4" strokeLinejoin="round" />
		<path d="M24 35V36" strokeWidth="4" strokeLinecap="round" />
		<path d="M24 19L24.008 29" strokeWidth="4" strokeLinecap="round" />
	</WarningIconBase>
);

const ValidationMessage = styled(Paragraph)(
	({ theme }) => css`
		&.invalid {
			color: ${theme.colors.invalid};
		}
		&.valid {
			color: ${theme.colors.valid};
		}
	`
);

const InputValidator = ({ value, min, max }) => (
	<div className="d-flex">
		<ValidationMessage
			bold
			size="18px"
			className={`mb-0 ${value.length >= min && value.length <= max ? "valid" : "invalid"}`}
		>
			{value.length} / {max}
		</ValidationMessage>
	</div>
);

const StyledIcon = styled.i(
	({ theme, color }) => css`
		color: ${theme.colors[color]};
	`
);

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [userName, setUserName] = useState("");
	const [passwordNoted, setPasswordNoted] = useState(false);
	const [termsAgreed, setTermsAgreed] = useState(false);
	const [newsLetterAgreed, setNewsLetterAgreed] = useState(false);

	const navigate = useNavigate();

	const register = () => {
		Axios.post("http://localhost:3001/register", {
			firstName,
			lastName,
			email,
			password,
			userName,
		}).then((response) => {
			if (response.data.registered === true) {
				//Send email verification
				Axios.post("http://localhost:3001/SendEmailVerification", {
					email,
					firstName,
					lastName,
				}).then((response) => {
					console.log(response, "response from send email");
					if (response.data.emailSent === true) {
						//Navigate to emailVerification
						navigate("/EmailVerification", {
							state: {
								ID: 1,
								email,
							},
						});
					}
				});
			} else {
				//Problem please try again will recieve and error
				<Alert variant="filled" severity="error">
					Please try again!
				</Alert>;
			}
		});
	};

	return (
		<PageBody className="d-flex align-items-center justify-content-center py-5 container-fluid">
			<div className="row">
				<div className="col-11 col-md-6 d-flex flex-column m-auto">
					<Heading size="36px" className="mt-5 mb-4 text-center">
						Sign up with an email address
					</Heading>
					<Heading size="24px" className="mb-5 text-center">
						Enter your details to create an account.
					</Heading>
					<form name="register" autoComplete="off">
						<StyledLabel htmlFor="firstName" padding="0 0 5px 0" bold fontSize="20px">
							First Name
						</StyledLabel>
						<FormInput
							id="firstName"
							className="mb-3 w-100"
							type="text"
							placeholder="First Name"
							form="register"
							onChange={(e) => {
								setFirstName(e.target.value);
							}}
						/>
						<StyledLabel htmlFor="lastName" padding="0 0 5px 0" bold fontSize="20px">
							Last Name
						</StyledLabel>
						<FormInput
							id="lastName"
							className="mb-3 w-100"
							type="text"
							form="register"
							placeholder="Last Name"
							onChange={(e) => {
								setLastName(e.target.value);
							}}
						/>
						<div className="d-flex justify-content-between align-items-center">
							<StyledLabel htmlFor="userName" padding="0 0 5px 0" bold fontSize="20px">
								Username
							</StyledLabel>
							<InputValidator value={userName} min={4} max={30} />
						</div>
						<FormInput
							id="userName"
							type="text"
							form="register"
							placeholder="User Name"
							autocomplete="off"
							autoComplete="off"
							maxLength={30}
							className={`
								mb-3 w-100
								${
									((userName.length > 0 && userName.length < 4) ||
										userName.includes(" ") ||
										userName.match(/[^A-Za-z 0-9]/g)) &&
									"invalid"
								}
							`}
							onChange={(e) => setUserName(e.target.value)}
						/>
						{userName.length > 0 && userName.length < 4 && (
							<div className="d-flex">
								<StyledIcon className="material-icons me-1" color="invalid">
									cancel
								</StyledIcon>
								<Paragraph size="18px" color="invalid">
									Username too short
								</Paragraph>
							</div>
						)}
						{userName.includes(" ") && (
							<div className="d-flex">
								<StyledIcon className="material-icons me-1" color="invalid">
									cancel
								</StyledIcon>
								<Paragraph size="18px" color="invalid">
									Contains a space
								</Paragraph>
							</div>
						)}
						{userName.match(/[^A-Za-z 0-9]/g) && (
							<div className="d-flex">
								<StyledIcon className="material-icons me-1" color="invalid">
									cancel
								</StyledIcon>
								<Paragraph size="18px" color="invalid">
									Contains a special character
								</Paragraph>
							</div>
						)}
						<StyledLabel htmlFor="email" padding="0 0 5px 0" bold fontSize="20px">
							Email
						</StyledLabel>
						<FormInput
							id="email"
							className="mb-3 w-100"
							type="text"
							form="register"
							placeholder="email"
							autocomplete="off"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
						<StyledLabel htmlFor="password" padding="0 0 5px 0" bold fontSize="20px">
							Password
						</StyledLabel>
						<FormInput
							id="password"
							className="mb-3 w-100"
							type="password"
							form="register"
							placeholder="password"
							autocomplete="off"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<StyledLabel htmlFor="confirmPassword" padding="0 0 5px 0" bold fontSize="20px">
							Confirm Password
						</StyledLabel>
						<FormInput
							id="confirmPassword"
							className={`mb-3 w-100 ${passwordConfirm !== password && 'invalid'}`}
							type="password"
							form="register"
							placeholder="password"
							autocomplete="off"
							onChange={(e) => {
								setPasswordConfirm(e.target.value);
							}}
						/>
						{passwordConfirm !== password && (
							<div className="d-flex">
								<IconHelper color="invalid" className="material-icons me-2">
									error_outline
								</IconHelper>
								<Paragraph color="invalid" size="20px">
									Passwords must match.
								</Paragraph>
							</div>
						)}
						<div className="d-flex align-items-start mb-4 pt-5">
							<Warning alt="Warning" />
							<div className="d-flex flex-column">
								<Paragraph size="18px">Is your password secured?</Paragraph>
								<Paragraph>
									Due to the nature of client-side encryption, Lumos Exchange are unable to recover a
									lost password at now. Please ensure you have your password noted down before
									continue!
								</Paragraph>
							</div>
						</div>
						<div className="d-flex align-items-center mb-4">
							<FormCheckbox
								type="checkbox"
								id="passNoted"
								name="passNoted"
								onChange={(e) => setPasswordNoted(e.target.checked)}
							/>
							<StyledLabel htmlFor="passNoted">I've noted down my password</StyledLabel>
						</div>
						<div className="d-flex align-items-center mb-4">
							<FormCheckbox
								type="checkbox"
								id="termsAgreed"
								name="termsAgreed"
								onChange={(e) => setTermsAgreed(e.target.checked)}
							/>
							<StyledLabel htmlFor="termsAgreed">
								I've read and agree with Lumos Exchange{" "}
								<a href="terms" alt="terms &amp; conditions">
									Service Terms
								</a>{" "}
								and{" "}
								<a href="terms" alt="terms &amp; conditions">
									Terms of Use.
								</a>
							</StyledLabel>
						</div>
						<div className="d-flex align-items-center mb-4">
							<FormCheckbox type="checkbox" id="newsletter" name="newsletter" className="me-4" />
							<StyledLabel htmlFor="newsletter">
								I would like to subscribe to the free newsletter to receive free crypto news digests.
							</StyledLabel>
						</div>
						<PrimaryButton
							type="submit"
							className="m-auto"
							onClick={(event) => {
								event.preventDefault();
								register();
							}}
							text="Create An Account"
							hasIcon
							disabled={
								firstName.length === 0 ||
								lastName.length === 0 ||
								userName.length < 4 ||
								email.length === 0 ||
								password.length === 0 ||
								!passwordNoted ||
								!termsAgreed ||
								(userName.length > 0 && userName.length < 4) ||
								userName.includes(" ") ||
								userName.match(/[^A-Za-z 0-9]/g) ||
								passwordConfirm !== password
							}
						/>
					</form>
				</div>
			</div>
		</PageBody>
	);
};

export default Register;
