import React, {useState} from "react";
import "../App.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

const [firstNameReg, setFirstNameReg] = useState('');
const [lastNameReg, setLastNameReg] = useState('');
const [emailReg, setEmailReg] = useState('');
const [passwordReg, setPasswordReg] = useState('');
const [nationalityReg, setNationalityReg] = useState('');

const navigate = useNavigate();

const register = () => {
    Axios.post("http://localhost:3001/register", {
        firstName: firstNameReg,
        lastName: lastNameReg,
        email: emailReg,
        password: passwordReg,
        nationality: nationalityReg
    })

}

//Pass details for 2fa

function handleClick() {
  navigate("/TwoFactorAuth", {
    state: {
      id: 1,
      email: emailReg,
      firstName: firstNameReg,
      lastName: lastNameReg
    },
  });
}


  return (
    <div class="form">

      <div class="subtitle">Let's create your account!</div>
      <div class="input-container ic1">
      <label for="firstName" class="placeholder">
          First name
        </label>
        <input id="firstName" class="input" type="text" placeholder=" " onChange={(e) => {
            setFirstNameReg(e.target.value);
        }} />
        <div class="cut"></div>
      </div>


      <div class="input-container ic2">
      <label for="lastName" class="placeholder">
          Last name
        </label>
        <input id="lastName" class="input" type="text" placeholder=" " onChange={(e) => {
            setLastNameReg(e.target.value);
        }} />
        <div class="cut"></div>
      </div>


      <div class="input-container ic2">
      <label for="email" class="placeholder">
          Email
        </label>
        <input id="email" class="input" type="text" placeholder=" "onChange={(e) => {
            setEmailReg(e.target.value);
        }} />
        <div class="cut cut-short"></div>

      </div>

      <div class="input-container ic2">
      <label for="password1" class="placeholder">
          Password
        </label>
        <input id="password1" class="input" type="password" placeholder=" " onChange={(e) => {
            setPasswordReg(e.target.value);
        }} />
        <div class="cut cut-short"></div>

      </div>

      <div class="input-container ic2">
      <label for="password2" class="placeholder">
          Repeat Password
        </label>
        <input id="password2" class="input" type="password" placeholder=" " />
        <div class="cut cut-short"></div>

      </div>

      <div class="input-container ic2">
      <label for="nationality" class="placeholder">
          Nationality
        </label>
        <input id="nationality" class="input" type="nationality" placeholder=" " onChange={(e) => {
            setNationalityReg(e.target.value);
        }} />
        <div class="cut cut-short"></div>

      </div>

      <button type="text" class="submit" onClick={register, handleClick}>
        Register
      </button>
    </div>
  );
}
export default Register;

















