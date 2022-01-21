import React, { useState } from "react";
import { PageBody } from "../Components/FormInputs";
import PrimaryButton from "../Components/Buttons";
import { FormInput } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Card from "../Components/Card";
import Axios from "axios";

const EmailVerification = () => {
  const { state } = useLocation();

  const [Twofa, setTwofaCode] = useState("");
  const [verified, setVerifed] = useState("");
  const [userEmail, setUserEmail] = useState([]);

  async function VerifyEmailAuth(event) {
    event.preventDefault();
    useEffect(() => {
      Axios.get("http://localhost:3001/VerifyEmail2FA", {
        params: {
          email: state.email,
          passcode: TwoFa,
        },
      }).then((response) => {
        setUserEmail(response.data);
      });
    }, []);
  }

  return (
    <PageBody className="d-flex align-items-center justify-content-center py-5 container-fluid flex-column">
      <Card radius="20px" color="darkerGrey" className="p-5 d-flex flex-column">
        <Heading className="pb-4 text-center">
          Please enter your email 2FA code below
        </Heading>
        <div className="w-100 row">
          <div className="col-12 col-md-8">
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
          </div>
          <div className="col-12 col-md-4 p-0">
            <PrimaryButton
              type="submit"
              text="Submit"
              onClick={VerifyEmailAuth}
              className="w-100 h-100"
            />
          </div>
        </div>
      </Card>
    </PageBody>
  );
};

export default EmailVerification;
