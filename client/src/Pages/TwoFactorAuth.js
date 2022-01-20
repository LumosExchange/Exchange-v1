import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate} from "react-router-dom";
import qrcode from "qrcode";
<<<<<<< Updated upstream
=======
import { PageBody, FormInput } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import PrimaryButton, { InvisibleButton } from "../Components/Buttons";
import Card from "../Components/Card";
import GoogleAuthLogo from '../Images/icon-google.png';
import AuthyLogo from '../Images/icon-authy.png';
import Paragraph from "../Components/Paragraph";
import axios from "axios";
>>>>>>> Stashed changes

function TwoFactorAuth() {
  const navigate = useNavigate();

  const [secret, setSecret] = useState([]);
  const [Twofa, setTwofaCode] = useState("");
  const [verified, setVerifed] = useState("");

  const img = "";
  //get secret from back end
  useEffect(() => {
<<<<<<< Updated upstream
    Axios.post("http://localhost:3001/getSecret").then((response) => {
      setSecret(response.data);
      console.log("response front end: " + secret.base32);
    });
=======

	async function getSecret() {
		const response = await axios.post("http://localhost:3001/getSecret");
		console.log(response.data.base32, 'response from getSecret2')
		setSecret(response.data)
	}

	if (secret.length === 0){
		getSecret();
	}

>>>>>>> Stashed changes
  }, []);

  //display img as QR code
  function ShowGoogleAuthQR() {
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
<<<<<<< Updated upstream
    <div>
      <h1>Please select 2FA methord</h1>
      <button onClick={ShowGoogleAuthQR}>Google Auth</button>
      <br></br>
      <button>Email 2FA</button>
      <br></br>
      <button>SMS 2FA</button>
      <br></br>
      <img id="QRCode"></img>

      <h2>Please enter 6 digit 2fa code:</h2>
      <input
        type="text"
        id="Code"
        name="code"
        onChange={(e) => {
          setTwofaCode(e.target.value);
        }}
      ></input>
      <button type="submit" onClick={VerifyGoogleAuth}>
        Submit
      </button>
    </div>
  );
=======
    	<PageBody className="d-flex align-items-center justify-content-center py-5 container-fluid flex-column">
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
    	</PageBody>
  	);
>>>>>>> Stashed changes
}

export default TwoFactorAuth;
