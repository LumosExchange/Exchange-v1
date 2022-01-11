import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


function TwoFactorAuth() {
    
const navigate = useNavigate();
const { state } = useLocation();
const qrSource = "";

const [userSecret, setUserSecret] = useState('');
const [base32, setBase32]= useState([]);

useEffect(() => {
    Axios.get("http://localhost:3001/getSecret").then((response) => {
      setUserSecret(response.data);    
    });
  }, []);

  function showGoogleAuthQR() {
    var img = document.getElementById('QRCode');
    img.src = userSecret;
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

    </div>
    )


}

export default TwoFactorAuth;
