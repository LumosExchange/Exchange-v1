import React from "react";

function ChangePassword() {
    return (
    <div>
        <h3>Please enter old password</h3>
        <input
        type="password"
        id="oldPass"
        name="oldPass"
      ></input>

<h3>Please enter new password</h3>
        <input
        type="password"
        id="newPass"
        name="newPass"
      ></input>

<h3>Please enter new password again</h3>
        <input
        type="password"
        id="repeatNewPass"
        name="repeatNewPass"
      ></input>
      <br>
      </br>

<button type="submit">
        Submit
      </button>




    </div>);


}

export default ChangePassword;
