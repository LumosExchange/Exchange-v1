import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import qrcode from "qrcode";
import { FormBody, FormInput } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import PrimaryButton, { InvisibleButton } from "../Components/Buttons";
import Card from "../Components/Card";
import GoogleAuthLogo from '../Images/icon-google.png';
import AuthyLogo from '../Images/icon-authy.png';
import Paragraph from "../Components/Paragraph";
import axios from "axios";

const AuthIcon = styled.div(({ theme }) => css`
	width: 80px;
	height: 80px;
	min-width: 80px;
	border: 2px solid ${theme.colors.white};
	border-radius: 50px;
	
	i {
		font-size: 50px;
		color: ${theme.colors.white};
	}

	:hover {
		border: 2px solid ${theme.colors.yellow};
	}
`);

const QRCode = styled.img`
	width: 200px;
`;

const TwoFactorAuth = () => {
  const navigate = useNavigate();

  const [secret, setSecret] = useState([]);
  const [Twofa, setTwofaCode] = useState("");
  const [verified, setVerifed] = useState("");
  const [toggled, setToggled] = useState(false);

  console.log(secret, 'secret1');

  const img = "";
  //get secret from back end
  useEffect(() => {

	async function getSecret() {
		const response = await axios.post("http://localhost:3001/getSecret");
		console.log(response.data.base32, 'response from getSecret2')
		setSecret(response.data)
	}

	if (secret.length === 0){
		getSecret();
	}
	
  }, []);

  //display img as QR code
  function ShowGoogleAuthQR() {
	setToggled(true);
    var originalImg = document.getElementById("QRCode");

    qrcode.toDataURL(secret.otpauth_url, function (err, data_url) {
      originalImg.src = data_url;
    });
  }

  //pass secret and take 6 digit input from the user
  async function VerifyGoogleAuth(event) {
    event.preventDefault();

    Axios.get("http://localhost:3001/VerifyGoogle2FA", {
      params: {
        secret: secret.base32,
        passcode: Twofa,
      },

      
  //Check response for validation if succesful redirect else repeat
    }).then((response) => {
      setVerifed(response.data);
      console.log("authentication is: " + verified);
    });
  }


  return (
    	<FormBody className="d-flex align-items-center justify-content-center py-5 container-fluid flex-column">
			<Card radius="20px" className="p-5 d-flex flex-column">
				<Heading className="pb-4 text-center">Please select an 2FA method</Heading>
				<div className="w-100 d-flex justify-content-center">
					<div className="col-3 col-xxl-2 text-center">
						<InvisibleButton onClick={ShowGoogleAuthQR}>
							<AuthIcon className="d-flex align-items-center justify-content-center">
								<i className="material-icons">email</i>
							</AuthIcon>
						</InvisibleButton>
					</div>
					<div className="col-3 col-xxl-2 text-center">
						<InvisibleButton onClick={ShowGoogleAuthQR}>
							<AuthIcon className="d-flex align-items-center justify-content-center">
								<i className="material-icons">sms</i>
							</AuthIcon>
						</InvisibleButton>
					</div>
					<div className="col-3 col-xxl-2 text-center">
						<InvisibleButton onClick={ShowGoogleAuthQR}>
							<AuthIcon className="d-flex align-items-center justify-content-center">
								<img src={GoogleAuthLogo} alt="Google Authenticator" />
							</AuthIcon>
						</InvisibleButton>
					</div>
					<div className="col-3 col-xxl-2 text-center">
						<InvisibleButton onClick={ShowGoogleAuthQR}>
							<AuthIcon className="d-flex align-items-center justify-content-center">
								<img src={AuthyLogo} alt="Authy" />
							</AuthIcon>
						</InvisibleButton>
					</div>
				</div>
				<div className={`w-100 justify-content-center py-4 flex-column ${toggled ? 'd-flex' : 'd-none'}`}>
					<div className="col-12 m-auto text-center flex-column">
						<QRCode id="QRCode" alt="QR Code" className="m-auto mb-3" />
						<Paragraph size="18px" className="mb-0">Please enter 6 digit 2FA code below</Paragraph>
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
						<PrimaryButton type="submit" text="Submit" onClick={VerifyGoogleAuth} className="w-100 h-100" />
					</div>
				</div>
			</Card>
    	</FormBody>
  );
}

export default TwoFactorAuth;
