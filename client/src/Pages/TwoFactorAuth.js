import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import qrcode from "qrcode";


function TwoFactorAuth() {
  
  const navigate = useNavigate();

  const [secret, setSecret] = useState([]);
  const [Twofa, setTwofaCode]= useState('');
  const [verified , setVerifed]= useState([]);
  
  
const img = '';
  //get secret from back end
  useEffect(() => {
    Axios.get("http://localhost:3001/getSecret").then((response) => {
      setSecret(response.data);
      

      console.log("here is the secret " + secret.base32);


    });
  }, []);

 //display img as QR code
  function ShowGoogleAuthQR() {

    var originalImg = document.getElementById('QRCode');

    qrcode.toDataURL(secret.otpauth_url, function(err, data_url){
      originalImg.src = data_url;
        
      })
   
  }

  async function VerifyGoogleAuth() {

    useEffect(() => {
      Axios.get("http://localhost:3001/VerifyGoogle2FA", {
        params: {
          secret: secret.base32,
          passcode: Twofa
        }
      }).then((response) => {
         setVerifed(response.data);
         console.log("authentication is: " + verified);
  
       
      });
    }, []);
  }

  //pass secret and take 6 digit input from the user 

 

  //if returns true succeful else try again 



    return (
    <div>
        <h1>Please select 2FA methord</h1>
        <button onClick={ShowGoogleAuthQR}>
            Google Auth
        </button>
            <br></br>
            <button>
                Email 2FA
            </button>
            <br></br>
            <button>
                SMS 2FA
            </button>
            <br></br>
            <img id="QRCode"></img>
            <form onSubmit={VerifyGoogleAuth}>
            <h2>Please enter 6 digit 2fa code:</h2>
            <input type="text" id="Code" name="code" onChange={(e) => { setTwofaCode(e.target.value); }}></input>
            <button type="submit">
              Submit
            </button>
            </form>
            

    </div>
    )
   


}


export default TwoFactorAuth;
