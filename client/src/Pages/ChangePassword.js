import React, {useState, useEffect} from "react";
import Axios from "axios";

function ChangePassword() {
  //send email verification 
  const sendEmailVerification = () => {
    Axios.post("http://localhots:3001/2FAEmailVerificationSend", {

    })
  }

  //check email verification

  //check old password is match for old password

  //if both above are true then update user password 
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
