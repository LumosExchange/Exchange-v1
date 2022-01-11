import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Axios from "axios";
import { useNavigate, } from 'react-router';
import { FormBody, FormInput } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import PrimaryButton from "../Components/Button";

const FormBackground = styled.div(({ theme, color, size }) => css`
	background: ${theme.colors.darkerGrey};
	border-radius: 20px;
`);


const Login = () => {
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
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].email);
        console.log(response);
      }
    });
  }, []);

  return (
		<FormBody className="d-flex align-items-center justify-content-center py-5 container-fluid flex-column">
			<Heading className="pb-4">Sign in with Lumos account</Heading>
				<FormBackground className="col-12 col-md-6 col-xl-5 col-xxl-4 p-5">
					<div className="d-flex flex-column m-auto">
						<div className="text-center">
							<FormInput
								className="w-100"
								id="email"
								name="email"
								onChange={(e) => { setEmailLog(e.target.value); }}
								placeholder="username or email"
								required
								type="text"
								hasIcon
								icon="lock"
							/>
							<div className="my-3">
								<FormInput
									className="w-100"
									hasIcon
									icon="person"
									id="password"
									name="password"
									onChange={(e) => { setPasswordLog(e.target.value); }}
									pattern="(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,}"
									placeholder="password"
									required
									type="password"
								/>
							</div>
							<PrimaryButton
								text="Log In"
								className="m-auto mt-3"
								onClick={login}
								type="logIn"
								form="nameform"
								value="logIn"
								hasIcon
							/>
						</div>
						{loginStatus && <button>Check if authenticated</button>}
					</div>
				</FormBackground>
    	</FormBody>
  );
}

export default Login;
