import React, { useState, useEffect } from "react";
import Axios from "axios";

function ChangePassword() {
  const [userVerification, setUserVerification] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);

  //send email verification
  const sendEmailVerification = () => {
    Axios.post("http://localhots:3001/2FAEmailVerificationSend", {});
  };

  //check email verification
  const emailVerification = () => {
    Axios.post("http://localhost:3001/VerifyEmail2FA", {
      passcode: userVerification,
    }).then((response) => {
      if (!response.data.auth) {
        setEmailStatus(false);
      } else {
        setEmailStatus(true);
        
      }
    });
  };
   //check old password is match for old password
  const checkOldPass = () => {
    Axios.post("/checkChangePass", {
      oldPassword: oldPassword
    }).then((response) => {
      if (!response.data.auth) {     
        setPasswordStatus(false);
      } else {
        setPasswordStatus(true);
      }
    });

  };

 

  //if both above are true then update user password

  //TODO- pass user input for email verifasction to setUserVerification
  //    = pass old password to setOldPassword

  return (
    <div>
      <h3>Please enter email verification</h3>

      <input type="" id="emailVerification" name="emailVerification"></input>
      <div>
        <h3>Please enter old password</h3>
        <input type="password" id="oldPass" name="oldPass"></input>

        <h3>Please enter new password</h3>
        <input type="password" id="newPass" name="newPass"></input>

        <h3>Please repeat new password </h3>
        <input type="password" id="repeatNewPass" name="repeatNewPass"></input>
        <br></br>

        <button type="submit">Submit</button>
      </div>
    </div>
  );
}

export default ChangePassword;
