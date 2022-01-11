import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, } from 'react-router';



function Login() {
  const [emailLog, setEmailLog] = useState("");

  const [passwordLog, setPasswordLog] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;


  const login = () => {
    Axios.post("http://localhost:3001/login", {
      email: emailLog,
      password: passwordLog,
    }).then((response) => {
      if (!response.data.auth) {
        setLoginStatus(false);
      } else {
        setLoginStatus(true);

        //store JWT token in localstorage
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
        navigate("/Pages/LoggedHome");
     

        
      }
      
    });
  };

  const userAuthenticated = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      header: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };

  //testing logged in
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].email);
        console.log(response);
      }
    });
  }, []);

  return (
    <div>
      <div className="logInForm">
        <h1>Log in</h1>
        <p>
          Lumos Exchange is the most popular non-custodial crypto marketplace
          for Solana Ecosystem.
        </p>

        <label for="Email"></label>
        <input
          type="text"
          placeholder="email"
          name="email"
          id="email"
          onChange={(e) => {
            setEmailLog(e.target.value);
          }}
          required
        />
        <label for="Password"></label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          pattern="(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          onChange={(e) => {
            setPasswordLog(e.target.value);
          }}
          required
        />
        <button onClick={login} type="logIn" form="nameform" value="logIn">
          Log in
        </button>
      </div>

      {loginStatus && <button>Check if authenticated</button>}
    </div>
  );
}

export default Login;
