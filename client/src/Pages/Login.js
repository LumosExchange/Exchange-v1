import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Axios from "axios";
import { useNavigate } from "react-router";
import { PageBody, FormInput } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import PrimaryButton from "../Components/Buttons";
import ConnectWalletButton from "../Components/ConnectWalletButton";
import PhantomIcon from "../Images/phantom-icon-purple.svg";
import SolflareIcon from "../Images/solflare-icon.svg";
import ExodusIcon from "../Images/exodus-icon.svg";
import Link, { AltLink } from "../Components/Link";

const FormBackground = styled.div(({ theme }) => css`
    background: ${theme.colors.card_bg};
    border-radius: 20px;
    max-width: 550px;
`);

export const IconHelper = styled.i(({ theme, color }) => css`
  color: ${theme.colors[color]};
`);

const Login = () => {
  const [userLog, setUserLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      userName: userLog,
      password: passwordLog,
    }).then((response) => {
      console.log(response, 'response');
      if (!response.data.auth) {
        setLoginStatus(false);
        setLoginError(response.data.message);
      } else {
        setLoginStatus(true);
        //store JWT token in localstorage
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
        navigate("/");
        window.location.reload(false);
      }
    }).catch((err) => {
      console.log(err, 'error from login')
        setLoginError(err.message);
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
        setLoginStatus(true);
        console.log(response);
      }
    });

    if (loginStatus === true){
      console.log('redirect');
      navigate('/');
    }
  }, [loginStatus]);

  return (
    <PageBody className="d-flex align-items-center justify-content-center py-5 container-fluid flex-column">
      <Heading className="pb-4 text-center">Sign in with Lumos account</Heading>
      <FormBackground className="col-12 col-sm-10 col-md-7 col-xl-5 col-xxl-4 p-5">
        <div className="d-flex flex-column m-auto">
          <div className="text-center">
            <form>
              <FormInput
                className="w-100"
                id="email"
                name="email"
                onChange={(e) => {
                  setUserLog(e.target.value);
                }}
                placeholder="username"
                required
                type="text"
                hasIcon
                icon="person"
              />
              <div className="my-3">
                <FormInput
                  className="w-100"
                  hasIcon
                  icon="lock"
                  id="psw"
                  name="psw"
                  onChange={(e) => {
                    setPasswordLog(e.target.value);
                  }}
                  placeholder="password"
                  required
                  type="password"
                />
              </div>
              <PrimaryButton
                text="Log In"
                className="m-auto mt-3 w-100"
                onClick={login}
                type="logIn"
                form="nameform"
                value="logIn"
                hasIcon
              />
              {loginError.length > 0 && (
                <div className="d-flex justify-content-center mt-4">
                    <IconHelper className="material-icons me-2" color="invalid">error_outline</IconHelper>
                    <Paragraph color="invalid" size="20px" className="mb-0">
                      {loginError}, Please try again.
                    </Paragraph>
                  </div>
              )}
            </form>
          </div>
        </div>
      </FormBackground>
      <Paragraph size="18px" className="mt-4">
        Not got an account yet? <AltLink href="/Register">Register here</AltLink>.
      </Paragraph>
    </PageBody>
  );
};

export default Login;
