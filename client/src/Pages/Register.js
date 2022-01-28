import { useRef, useState, useEffect } from "react";
import Axios from "axios";
import Heading from "../Components/Heading";
import PrimaryButton from "../Components/Buttons";
import {
  FormInput,
  FormCheckbox,
  StyledLabel,
  PageBody,
} from "../Components/FormInputs";
import WarningTriangle from "../Images/icon-park-outline_caution.svg";
import Paragraph from "../Components/Paragraph";
import { useNavigate } from "react-router";
import styled, { css } from "styled-components";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const ValidationIcon = styled.i(({ theme, valid }) => css`
	color: ${valid ? theme.colors.valid : theme.colors.invalid};
`);

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  /* Unused */
  const [nationalityReg, setNationalityReg] = useState("");
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [userNameReg, setUserNameReg] = useState("");

  const [secret, setSecret] = useState([]);

  const navigate = useNavigate();
  const register = () => {
    Axios.all([
      Axios.post("http://localhost:3001/register", {
        firstName: firstNameReg,
        lastName: lastNameReg,
        email: emailReg,
        password: passwordReg,
        nationality: nationalityReg,
        userName: userNameReg,
      }),
      Axios.post("http://localhost:3001/SendEmailVerification", {
        email: emailReg,
        firstName: firstNameReg,
        lastName: lastNameReg,
      }),
    ]).then(
      Axios.spread((data1, data2) => {
        console.log("data1", data1, "data2", data2);
        setSecret(data1);
        console.log("2fa is : ", secret);
      })
    );
    navigate("/EmailVerification", {
      state: {
        id: 1,
        email: emailReg,
      },
    });
  };

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await Axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <PageBody className="d-flex align-items-center justify-content-center py-5 container-fluid">
      	<div className="row">
			<div className="col-11 col-md-6 d-flex flex-column m-auto">
				<Heading size="36px" color="white" className="mt-5 mb-4 text-center">
					Register with an email address
				</Heading>
				<Heading size="24px" color="white" className="mb-5 text-center">
					Enter your details to create an account.
				</Heading>
				<Paragraph
					ref={errRef}
					className={errMsg ? "errmsg" : "d-none"}
					aria-live="assertive"
				>
					{errMsg}
				</Paragraph>
				<form onSubmit={handleSubmit}>
					{/* Forename */}
					<StyledLabel
						htmlFor="firstName"
						fontSize="20px"
						padding="0 0 10px 0"
						bold
					>
						Forename
					</StyledLabel>
					<FormInput
						id="firstName"
						className="mb-3 w-100"
						type="text"
						placeholder="Forename"
						form="register"
						onChange={(e) => {setFirstNameReg(e.target.value);}}
					/>

					{/* Surname */}
					<StyledLabel
						htmlFor="lastName"
						fontSize="20px"
						padding="0 0 10px 0"
						bold
					>
						Surname
					</StyledLabel>
					<FormInput
						id="lastName"
						className="mb-3 w-100"
						type="text"
						form="register"
						placeholder="Surname"
						onChange={(e) => {setLastNameReg(e.target.value);}}
					/>

					{/* Email */}
					<StyledLabel
						htmlFor="email"
						fontSize="20px"
						padding="0 0 10px 0"
						bold
					>
						Email
					</StyledLabel>
					<FormInput
						id="email"
						className="mb-3 w-100"
						type="text"
						form="register"
						placeholder="Email"
						onChange={(e) => {setEmailReg(e.target.value);}}
					/>
					
					{/* Nationality */}
					<StyledLabel
						htmlFor="nationality"
						fontSize="20px"
						padding="0 0 10px 0"
						bold
					>
						Nationality
					</StyledLabel>
					<FormInput
						id="nationality"
						className="mb-3 w-100"
						type="text"
						form="register"
						placeholder="Nationality"
						onChange={(e) => {setNationalityReg(e.target.value);}}
					/>

					{/* Username */}
					<div className="d-flex">
						<StyledLabel
							htmlFor="nationality"
							fontSize="20px"
							padding="0 0 10px 0"
							bold
						>
							Username
						</StyledLabel>
						<ValidationIcon className="material-icons ms-2" valid={validName}>
							{validName ? 'check_circle' : 'cancel'}
						</ValidationIcon>
					</div>
					<FormInput
						type="text"
						id="username"
						className="mb-3 w-100"
						placeholder={"Username"}
						ref={userRef}
						autoComplete="off"
						onChange={(e) => setUser(e.target.value)}
						value={user}
						required
						aria-invalid={validName ? "false" : "true"}
						aria-describedby="uidnote"
						onFocus={() => setUserFocus(true)}
						onBlur={() => setUserFocus(false)}
					/>
					<div
						id="uidnote"
						className={userFocus && user && !validName ? "d-flex row" : "d-none"}
					>
						<div className="col-12 d-flex">
							<i className="material-icons me-2 text-white">info</i>
							<Paragraph bold>4 to 24 characters.</Paragraph>
						</div>
						<div className="col-12">
							<Paragraph>
								Must begin with a letter. Letters, numbers, underscores and hyphens allowed.
							</Paragraph>
						</div>
					</div>
						
						<div className="d-flex">
							<StyledLabel
								htmlFor="password"
								fontSize="20px"
								padding="0 0 10px 0"
								bold
							>
								Password
							</StyledLabel>
							<ValidationIcon className="material-icons ms-2" valid={validPwd}>
								{validPwd ? 'check_circle' : 'cancel'}
							</ValidationIcon>
						</div>
						<FormInput
							type="password"
							id="password"
							className="mb-3 w-100"
							placeholder={"Password"}
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
							aria-invalid={validPwd ? "false" : "true"}
							aria-describedby="pwdnote"
							onFocus={() => setPwdFocus(true)}
							onBlur={() => setPwdFocus(false)}
						/>
						<div
							id="pwdnote"
							className={
							pwdFocus && !validPwd ? "d-flex row" : "d-none"
							}
						>
							<div className="col-12 d-flex">
								<i className="material-icons me-2 text-white">info</i>
								<Paragraph bold>8 to 24 characters.</Paragraph>
							</div>
							<div className="col-12">
								<Paragraph>
									Must include uppercase and lowercase letters, a number and a
									special character.
								</Paragraph>
							</div>
							<div className="col-12">
								<Paragraph>
									Allowed special characters:{" "}
									<span aria-label="exclamation mark">!</span>{" "}
									<span aria-label="at symbol">@</span>{" "}
									<span aria-label="hashtag">#</span>{" "}
									<span aria-label="dollar sign">$</span>{" "}
									<span aria-label="percent">%</span>
								</Paragraph>
							</div>
						</div>
						<div className="d-flex">
							<StyledLabel
								htmlFor="confirm_pwd"
								fontSize="20px"
								padding="0 0 10px 0"
								bold
							>
								Confirm Password
							</StyledLabel>
							<ValidationIcon className="material-icons ms-2" valid={validMatch && matchPwd}>
								{validMatch && matchPwd  ? 'check_circle' : 'cancel'}
							</ValidationIcon>
						</div>
						<FormInput
							type="password"
							id="confirm_pwd"
							className="mb-3 w-100"
							placeholder={"Confirm Password"}
							onChange={(e) => setMatchPwd(e.target.value)}
							value={matchPwd}
							required
							aria-invalid={validMatch ? "false" : "true"}
							aria-describedby="confirmnote"
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}
						/>
						<div
							id="confirmnote"
							className={matchFocus && !validMatch ? "d-flex" : "d-none"}
						>
							<i className="material-icons me-2 text-white">info</i>
							<Paragraph>Must match the first password input field.</Paragraph>
						</div>
						<div className="d-flex align-items-start mb-4 pt-2">
							<img src={WarningTriangle} alt="Warning" className="me-3 pt-1" />
							<div className="d-flex flex-column">
								<Paragraph size="18px" color="yellow">
								Is your password secured?
								</Paragraph>
								<Paragraph>
								Due to the nature of client-side encryption, Lumos Exchange
								are unable to recover a lost password at now. Please ensure
								you have your password noted down before continue!
								</Paragraph>
							</div>
						</div>
						<div className="d-flex align-items-center mb-4">
							<FormCheckbox type="checkbox" id="passNoted" name="passNoted" />
							<StyledLabel htmlFor="passNoted" color="yellow">
								I've noted down my password
							</StyledLabel>
						</div>
						<div className="d-flex align-items-center mb-4">
							<FormCheckbox
								type="checkbox"
								id="termsAgreed"
								name="termsAgreed"
							/>
							<StyledLabel htmlFor="termsAgreed" color="white">
								I've read and agree with Lumos Exchange{" "}
								<a href="terms" alt="terms &amp; conditions">
								Service Terms
								</a>{" "}
								and{" "}
								<a href="terms" alt="terms &amp; conditions">
								Terms of Use.
								</a>
							</StyledLabel>
						</div>
						<div className="d-flex align-items-center mb-4">
							<FormCheckbox
								type="checkbox"
								id="newsletter"
								name="newsletter"
								className="me-4"
							/>
							<StyledLabel htmlFor="newsletter" color="white">
								I would like to subscribe to the free newsletter to receive free
								crypto news digests.
							</StyledLabel>
						</div>
						<PrimaryButton
							type="submit"
							className="m-auto"
							text="Create An Account"
							onClick={register}
							hasIcon
							disabled={!validName || !validPwd || !validMatch ? true : false }
						/>
						</form>
					</div>
      		</div>
    </PageBody>
  );
};

export default Register;
