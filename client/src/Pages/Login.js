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
import { AppUrl, AppUrlNoPort } from "../App";
import {
  FormCheckbox,
  StyledLabel,
  StyledDropdown,
} from "../Components/FormInputs";
import EmailVerification from "./EmailVerification";

const FormBackground = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.card_bg};
    border-radius: 20px;
    max-width: 550px;
  `
);

export const IconHelper = styled.i(
  ({ theme, color }) => css`
    color: ${theme.colors[color]};
  `
);
const ValidationMessage = styled(Paragraph)(
  ({ theme }) => css`
    &.invalid {
      color: ${theme.colors.invalid};
    }
    &.valid {
      color: ${theme.colors.valid};
    }
  `
);

const InputValidator = ({ value, min, max }) => (
  <div className="d-flex">
    <ValidationMessage
      bold
      size="18px"
      className={`mb-0 ${
        value.length >= min && value.length <= max ? "valid" : "invalid"
      }`}
    >
      {value.length} / {max}
    </ValidationMessage>
  </div>
);

const StyledIcon = styled.i(
  ({ theme, color }) => css`
    color: ${theme.colors[color]};
  `
);

const Login = () => {
  const [userLog, setUserLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post(`${AppUrl}/login`, {
      userName: userLog,
      password: passwordLog,
    })
      .then((response) => {
        if (!response.data.auth) {
          setLoginStatus(false);
          setLoginError(response.data.message);
        } else {
          setLoginStatus(true);
          //store JWT token in localstorage
          localStorage.setItem("token", response.data.token);
          navigate("/");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        setLoginError(err.message);
      });
  };

  //testing logged in
  useEffect(() => {
    Axios.get(`${AppUrl}/login`, {
      header: {
        origin: `${AppUrlNoPort}`,
      },
    }).then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(true);
      }
    });
  }, [loginStatus]);

  return (
    <PageBody className="d-flex align-items-center justify-content-center py-5 container-fluid flex-column">
      <Heading className="pb-4 text-center">Sign in with Lumos account</Heading>
      <FormBackground className="col-12 col-sm-10 col-md-7 col-xl-5 col-xxl-4 p-5">
        <div className="d-flex flex-column m-auto">
          <div className="text-center">
            <form>
              <div className="d-flex justify-content-between align-items-center">
                <StyledLabel
                  htmlFor="email"
                  padding="0 0 5px 0"
                  bold
                  fontSize="20px"
                >
                  Username
                </StyledLabel>
                <InputValidator value={userLog} min={4} max={30} />
              </div>
              <FormInput
                id="userLog"
                placeholder="Username"
                required
                type="text"
                minLength={4}
                maxLength={30}
                autocomplete="off"
                autoComplete="off"
                hasIcon
                icon="person"
                className={`
								mb-3 w-100
								${
                  ((userLog.length > 0 && userLog.length < 4) ||
                    userLog.includes(" ") ||
                    userLog.match(/[^A-Za-z 0-9]/g)) &&
                  "invalid"
                }
							`}
                onChange={(e) => {
                  setUserLog(e.target.value);
                }}
              />
              {userLog.length > 0 && userLog.length < 4 && (
                <div className="d-flex">
                  <StyledIcon className="material-icons me-1" color="invalid">
                    error_outline
                  </StyledIcon>
                  <Paragraph size="18px" color="invalid">
                    Username is too short
                  </Paragraph>
                </div>
              )}{" "}
              <div className="d-flex justify-content-between align-items-center">
                <StyledLabel
                  htmlFor="userName"
                  padding="0 0 5px 0"
                  bold
                  fontSize="20px"
                >
                  Password
                </StyledLabel>
                <InputValidator value={passwordLog} min={8} max={30} />
              </div>
              <div className="my-3">
                <FormInput
                  className={`
                  mb-3 w-100
                  ${
                    ((passwordLog.length > 0 && passwordLog.length < 7) ||
                      passwordLog.includes(" ")) &&
                    "invalid"
                  }
                `}
                  hasIcon
                  icon="lock"
                  id="psw"
                  name="psw"
                  maxLength={20}
                  onChange={(e) => {
                    setPasswordLog(e.target.value);
                  }}
                  placeholder="Password"
                  required
                  type="password"
                />
                {passwordLog.length > 0 && passwordLog.length < 8 && (
                  <div className="d-flex">
                    <StyledIcon className="material-icons me-1" color="invalid">
                      error_outline
                    </StyledIcon>
                    <Paragraph size="18px" color="invalid">
                      Password is too short (Minimum 8 Charachters)
                    </Paragraph>
                  </div>
                )}
              </div>
              <PrimaryButton
                text="Log In"
                className="m-auto mt-3 w-100"
                onClick={login}
                type="submit"
                form="loginForm"
                hasIcon
                /*disabled={userLog.length < 4 || passsswordLog.length < 8}*/
              />
              {loginError && loginError.length > 0 && (
                <div className="d-flex justify-content-center mt-4">
                  <IconHelper className="material-icons me-2" color="invalid">
                    error_outline
                  </IconHelper>
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
        Not got an account yet?{" "}
        <AltLink href="/Register">Register here</AltLink>.
      </Paragraph>
    </PageBody>
  );
};

export default Login;
