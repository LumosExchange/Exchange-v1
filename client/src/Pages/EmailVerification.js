import React, { useState, Alert, useEffect } from "react";
import { useLocation } from "react-router";
import { PageBody } from "../Components/FormInputs";
import PrimaryButton from "../Components/Buttons";
import { FormInput } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Card from "../Components/Card";
import Axios from "axios";
import { useNavigate } from "react-router";
import Paragraph from "../Components/Paragraph";


const EmailVerification = () => {
  const [Twofa, setTwofaCode] = useState("");
  const [userEmail, setUserEmail] = useState([]);
  const navigate = useNavigate();

  let verified = false;
  let result = "";

  const { state } = useLocation();

  async function VerifyEmailAuth(event) {
    event.preventDefault();

    Axios.post("http://localhost:3001/VerifyEmail2FA", {
      email: state.email,
      passcode: Twofa,
    }).then((response) => {
      if (response.data === true) {
        //Show popup with confirmation

        <Alert variant="filled" severity="success">
          Succesfull you will now be redirected to login!
        </Alert>;

        verified = true;
        navigate("/Login");
      } else {
        //show popup with error
        <Alert variant="filled" severity="error">
          Incorrect Code please try again!
        </Alert>;
        verified = false;
      }
    });
  }

  useEffect(() => {
    if (state === null){
      navigate('/Login');
    }
  }, []);

  return (
    <PageBody className="d-flex align-items-center justify-content-center py-5 container-fluid flex-column">
      <Card radius="20px" className="p-5 d-flex flex-column" style={{ maxWidth: '600px' }}>
        <Heading className="pb-4 text-center" bold>
          2FA Code sent to {state.email}
        </Heading>
        <Paragraph size="20px" className="text-center">Please check your email and enter the code below.</Paragraph>
        <form>
          <div className="w-100 row">
            <div className="col-12 p-0 mb-3">
                <FormInput
                  type="text"
                  id="Code"
                  name="code"
                  placeholder="Enter 2FA Code"
                  maxLength="6"
                  onChange={(e) => {
                    setTwofaCode(e.target.value);
                  }}
                  className="w-100"
                />
                </div>
                <div className="col-12 p-0">
                  <PrimaryButton
                    text="Submit"
                    type="submit"
                    onClick={VerifyEmailAuth}
                    className="w-100 h-100"
                  />
                </div>
            </div>
          </form>
      </Card>
    </PageBody>
  );
};

export default EmailVerification;
