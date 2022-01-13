import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


function TwoFactorAuth() {
    
const navigate = useNavigate();


const [userSecret, setUserSecret] = useState('');
const [base32, setBase32]= useState([]);



useEffect(() => {
    Axios.get("http://localhost:3001/getSecret").then((response) => {
      setUserSecret(response.data); 
      setBase32(response.secret);

    });
  }, []);

  function showGoogleAuthQR() {
    var img = document.getElementById('QRCode');
    img.src = userSecret;
    
  }

  function Verify2fa() {
    //pass base 32 and 6 digit code through and verify 
 //   useEffect(() => {
    //  Axios.get("http://localhost:3001/VerifyGoogle2FA", {
 //       params: {
   //       base32: base32,
     //     passcode:
  //      },
  //    }).then((response) => {
        
  //    });
  //  }, []);


  }

    return (
    <div>
        <h1>Please select 2FA methord</h1>
        <button onClick={showGoogleAuthQR}>
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
            <h2>Please enter 6 digit 2fa code:</h2>
            <input type="text" id="Code" name="code"></input>
            <button onclick={Verify2fa}>
              Submit
            </button>
            

    </div>
    )


}

export default TwoFactorAuth;
