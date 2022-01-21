import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { useNavigate } from "react-router";
import Heading from "../Components/Heading";
import PrimaryButton from "../Components/Buttons";
import { FormInput, FormCheckbox, StyledLabel, PageBody } from "../Components/FormInputs";
import WarningTriangle from '../Images/icon-park-outline_caution.svg';
import Paragraph from "../Components/Paragraph";
import Buttons from "../Components/Buttons";


const Register = () => {
	const [emailReg, setEmailReg] = useState('');
	const [passwordReg, setPasswordReg] = useState('');

	/* Unused */
	const [nationalityReg, setNationalityReg] = useState('');
	const [firstNameReg, setFirstNameReg] = useState('');
	const [lastNameReg, setLastNameReg] = useState('');

	const [secret, setSecret] = useState([]);

	const navigate = useNavigate();


	const register = () => {
    Axios.all([
      Axios.post("http://localhost:3001/register", {
        firstName: firstNameReg,
        lastName: lastNameReg,
        email: emailReg,
        password: passwordReg,
        nationality: nationalityReg,
      }),
      Axios.post("http://localhost:3001/Send_Email_Verification",{
        email: emailReg
      })
    ])
	.then(Axios.spread((data1, data2) => {
		console.log('data1', data1, 'data2', data2)
		setSecret(data1);
		console.log('2fa is : ', secret );
	}));	
		navigate("/EmailVerification", {
			state: {
				id: 1,
				email: emailReg
			}
	
		});
	}

	


	return (
		<PageBody className="d-flex align-items-center justify-content-center py-5 container-fluid">
			<div className="row">
				<div className="col-11 col-md-6 d-flex flex-column m-auto">
					<Heading size="36px" color="white" className="mt-5 mb-4 text-center">Sign up with an email address</Heading>
					<Heading size="24px" color="white" className="mb-5 text-center">Enter your details to create an account.</Heading>
					<form name="register">
						<FormInput
							id="firstName"
							className="mb-3 w-100"
							type="text"
							placeholder="First Name"
							form="register"
							onChange={(e) => { setFirstNameReg(e.target.value); }}
						/>
						<FormInput
							id="lastName"
							className="mb-3 w-100"
							type="text"
							form="register"
							placeholder="Last Name"
							onChange={(e) => { setLastNameReg(e.target.value); }}
						/>
						<FormInput
							id="email"
							className="mb-3 w-100"
							type="text"
							form="register"
							placeholder="email"
							onChange={(e) => { setEmailReg(e.target.value); }}
						/>
						<FormInput
							id="password"
							className="mb-3 w-100"
							type="password"
							form="register"
							placeholder="password"
							onChange={(e) => { setPasswordReg(e.target.value); }}
						/>
						<FormInput
							id="nationality"
							className="mb-3 w-100"
							type="text"
							form="register"
							placeholder="Nationality"
							onChange={(e) => { setNationalityReg(e.target.value); }}
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
						<PrimaryButton type="submit" className="m-auto" onClick={register} text="Create An Account" hasIcon />
					</form>
				</div>
			</div>
		</PageBody>
	);
}

export default Register;
