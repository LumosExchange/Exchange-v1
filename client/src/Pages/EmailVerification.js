import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { PageBody } from "../Components/FormInputs";
import PrimaryButton from "../Components/Buttons";
import { FormInput } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Card from "../Components/Card";
import Axios from "axios";
import { useNavigate } from "react-router";

const EmailVerification = () => {
  const [Twofa, setTwofaCode] = useState("");
  const [userEmail, setUserEmail] = useState([]);
  const navigate = useNavigate();

  let verified = false;
  let result = "";

  const { state } = useLocation();

  async function VerifyEmailAuth(event) {
    event.preventDefault();

    console.log("user passcode", Twofa);
    console.log("email: ", state.email);
    Axios.post("http://localhost:3001/VerifyEmail2FA", {
      email: state.email,
      passcode: Twofa,
    }).then((response) => {
      if (response.data == true) {
        //Show popup with confirmation

        verified = true;
        navigate("/Login");
      } else {
        //show popup with error

        verified = false;
      }
    });
  }

  return (
    <PageBody className="d-flex align-items-center justify-content-center py-5 container-fluid flex-column">
      <Card radius="20px" color="darkerGrey" className="p-5 d-flex flex-column">
        <Heading className="pb-4 text-center">
          Please enter your email 2FA code below
        </Heading>
        <div className="w-100 row">
          <div className="col-12 col-md-8">
            <form>
              <FormInput
                type="text"
                id="Code"
                name="code"
                placeholder="Enter 2FA Code"
                onChange={(e) => {
                  setTwofaCode(e.target.value);
                }}
                className="w-100"
              />
              <div className="col-12 col-md-4 p-0">
                <PrimaryButton
                  text="Submit"
                  type="submit"
                  onClick={VerifyEmailAuth}
                  className="w-100 h-100"
                />
              </div>
            </form>
          </div>
        </div>
      </Card>
    </PageBody>
  );
};

export default EmailVerification;
