import React, {useState} from "react";
import "../App.css";
import Axios from "axios";
import { useNavigate } from 'react-router';
import Heading from "../Components/Heading";
import styled, { css } from "styled-components";
import PrimaryButton from "../Components/Button";
import { FormInput, FormCheckbox, StyledLabel, FormBody } from "../Components/FormInputs";
import WarningTriangle from '../Images/icon-park-outline_caution.svg';
import Paragraph from "../Components/Paragraph";

const Register = () => {
	const [emailReg, setEmailReg] = useState('');
	const [passwordReg, setPasswordReg] = useState('');
	const [usernameReg, setUsenameReg] = useState('');

	/* Unused */
	const [nationalityReg, setNationalityReg] = useState('');
	const [firstNameReg, setFirstNameReg] = useState('');
	const [lastNameReg, setLastNameReg] = useState('');

	const navigate = useNavigate();

	const register = () => {
		Axios.post("http://localhost:3001/register", {
			firstName: firstNameReg,
			lastName: lastNameReg,
			email: emailReg,
			password: passwordReg,
			nationality: nationalityReg,
			userName: usernameReg,
		})
		navigate("/TwoFa");
	}

	return (
		<FormBody className="d-flex align-items-center justify-content-center py-5 container-fluid">
			<div className="row">
				<div className="col-11 col-md-6 d-flex flex-column m-auto">
					<Heading size="36px" color="white" className="mt-5 mb-4 text-center">Sign up with an email address</Heading>
					<Heading size="24px" color="white" className="mb-5 text-center">Enter your details to create an account.</Heading>
					<FormInput
						id="firstName"
						className="mb-3"
						type="text"
						placeholder="username"
						onChange={(e) => { setUsenameReg(e.target.value); }}
					/>
					<FormInput
						id="email"
						className="mb-3"
						type="text"
						placeholder="email"
						onChange={(e) => { setEmailReg(e.target.value); }}
					/>
					<FormInput
						id="password"
						className="mb-3"
						type="password"
						placeholder="password"
						onChange={(e) => { setPasswordReg(e.target.value); }}
					/>
					<div className="d-flex align-items-start mb-4 pt-2">
						<img src={WarningTriangle} alt="Warning" className="me-3 pt-1" />
						<div className="d-flex flex-column">
							<Paragraph size="18px" color="yellow">Is your password secured?</Paragraph>
							<Paragraph>Due to the nature of client-side encryption, Lumos Exchange are unable to recover a lost password at now. Please ensure you have your password noted down before continue!</Paragraph>
						</div>
					</div>
					<div className="d-flex align-items-center mb-4">
						<FormCheckbox type="checkbox" id="passNoted" name="passNoted" />
						<StyledLabel htmlFor="passNoted" color="yellow">I've noted down my password</StyledLabel>
					</div>
					<div className="d-flex align-items-center mb-4">
						<FormCheckbox type="checkbox" id="termsAgreed" name="termsAgreed" />
						<StyledLabel htmlFor="termsAgreed" color="white">
							I've read and agree with Lumos Exchange <a href="terms" alt="terms &amp; conditions">Service Terms</a> and <a href="terms" alt="terms &amp; conditions">Terms of Use.</a>
						</StyledLabel>
					</div>
					<div className="d-flex align-items-center mb-4">
						<FormCheckbox type="checkbox" id="newsletter" name="newsletter" className="me-4" />
						<StyledLabel htmlFor="newsletter" color="white">
							I would like to subscribe to the free newsletter to receive free crypto news digests.
						</StyledLabel>
					</div>
					<PrimaryButton type="text" className="m-auto" onClick={register} text="Create An Account" hasIcon />
				</div>
			</div>
		</FormBody>
	);
}
export default Register;

















