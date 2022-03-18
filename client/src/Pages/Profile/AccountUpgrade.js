import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import styled, { css } from "styled-components";
import { FormInput, PageBody } from "../../Components/FormInputs";
import PrimaryButton from "../../Components/Buttons";
import Heading from "../../Components/Heading";
import { ContentTab, ProfileTabs } from "../../Components/Profile";
import {
  countryOptions,
  birthDayOptions,
  birthMonthOptions,
  birthYearOptions,
  currentYear,
} from "../../Constants/Index";
import { InlineInput, StyledDropdown } from "../../Components/FormInputs";
import { useNavigate } from "react-router";
import Paragraph from "../../Components/Paragraph";
import { useDropzone } from "react-dropzone";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


const StyledAccordion = styled(Accordion)(({ theme }) => css`
	background-color: ${theme.colors.panel_bg} !important;

	&.expanded {
		border: 2px solid ${theme.colors.primary_cta};
		border-radius: 6px;
	}
`);

const AccountUpgrade = () => {
  //step 1 upgrade bronze / silver
  const [birthDayReg, setBirthDayReg] = useState("");
  const [birthMonthReg, setBirthMonthReg] = useState("");
  const [birthYearReg, setBirthYearReg] = useState("");
  const [phone, setPhoneReg] = useState("");
  const [tax, setTaxReg] = useState("");
  const [countryOfResidence, setCountryOfResidenceReg] = useState("");

  //step 3 upgrade gold
  const [employerName, setEmployerNameReg] = useState("");
  const [employerAddress, setEmployerAddressReg] = useState("");
  const [occupation, setOccupationReg] = useState("");
  const [proofEmployment, setProofEmploymentReg] = useState("");
  const [income, setIncomeReg] = useState("");
  const [additionalIncome, setAdditionalIncomeReg] = useState("");

  //Create function to get current tier
  const [accountTier, setAccountTier] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [expanded, setExpanded] = useState(null);


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getAccountTier = () => {
    Axios.get("http://localhost:3001/getUserAccountLevel").then((response) => {
      setAccountTier(response.data[0]?.accountLevel);
    });
  };

  const upgradeSilver = () => {
    Axios.post("http://localhost:3001/upgradeSilver", {
      BirthDayy: birthDayReg,
      BirthMonthh: birthMonthReg,
      BirthYearr: birthYearReg,
      Phone: phone,
      Tax: tax,
      CountryOfResidence: countryOfResidence,
    }).then((response) => {
      //handle message retunred from endpoint
      setConfirmationMessage(response.data.message);

      //Go to next step
      setCurrentStep(2);
    });
  };

  const upgradeGold = () => {
    Axios.post("http://localhost:3001/upgradeGold", {
      EmployerName: employerName,
      EmployerAddress: employerAddress,
      Occupation: occupation,
      Income: income,
    }).then((response) => {
      setConfirmationMessage(response.data.message);
      setCurrentStep(3);
    });
  };

  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file, xhr}, status) => {
    if (status === 'done'){
        let response = JSON.parse(xhr.response);
        console.log(response, 'response from httpbin');
        console.log(response.files.file);
    }
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  useEffect(function getTier() {
	getAccountTier();
    if (accountTier !== '') {
      setExpanded(accountTier)
    }
  }, [accountTier]);

  return (
		<PageBody>
			<div className="container pt-5">
				<ProfileTabs selected="AccountUpgrade" />
				<ContentTab className="text-white">
					<div className="d-flex p-4 row">
						<div className="d-flex col-12 col-md-6 mb-3 flex-column">
							{currentStep === 1 && (
								<React.Fragment>
									<Heading size="20px" bold>
										Date Of Birth
									</Heading>

									<div className="row mb-3">
										<div className="col-4">
											<Heading size="20px" bold>
												Day
											</Heading>
											<StyledDropdown
												className="w-100"
												onChange={(e) => setBirthDayReg(e.currentTarget.value)}
											>
												{birthDayOptions.map((option) => (
													<option value={option}>{option}</option>
												))}
											</StyledDropdown>
										</div>
										<div className="col-4">
											<Heading size="20px" bold>
												Month
											</Heading>
											<StyledDropdown
												className="w-100"
												onChange={(e) => setBirthMonthReg(e.currentTarget.value)}
											>
												{birthMonthOptions.map((option) => (
													<option value={option}>{option}</option>
												))}
											</StyledDropdown>
										</div>
										<div className="col-4">
											<Heading size="20px" bold>
												Year
											</Heading>
											<StyledDropdown
												className="w-100"
												onChange={(e) => setBirthYearReg(e.currentTarget.value)}
											>
												<option value="---">---</option>
												{birthYearOptions(currentYear, currentYear - 90, -1).map((option) => (
													<option value={option}>{option}</option>
												))}
											</StyledDropdown>
										</div>
									</div>
									<Dropzone
										getUploadParams={getUploadParams}
										onChangeStatus={handleChangeStatus}
										onSubmit={handleSubmit}
										accept="image/*,audio/*,video/*"
									/>
									<Heading size="20px" bold>
										Phone
									</Heading>
									<FormInput
										id="Phone"
										className="mb-3 w-100"
										type="number"
										placeholder="Phone"
										onChange={(e) => {
											setPhoneReg(e.target.value);
										}}
									/>
									<Heading size="20px" bold>
										Taxes
									</Heading>
									<FormInput
										id="Tax"
										className="mb-3 w-100"
										type="file"
										placeholder="Taxes (Optional)"
										onChange={(e) => {
											setTaxReg(e.target.value);
										}}
									/>

									<Heading size="20px" bold>
										Country Of Residence
									</Heading>
									<StyledDropdown
										className="w-100"
										onChange={(e) => setCountryOfResidenceReg(e.currentTarget.value)}
									>
										{countryOptions.map((option) => (
											<option value={option}>{option}</option>
										))}
									</StyledDropdown>

									<PrimaryButton
										type="submit"
										className="w-100 mt-3"
										onClick={upgradeSilver}
										text="Upgrade To Silver"
										disabled={
											birthDayReg === "---" ||
											birthMonthReg === "---" ||
											birthYearReg === "---" ||
											countryOfResidence === "Please Select" ||
											phone.length === 0
										}
										hasIcon
									/>

									<Heading size="20px" bold>
										{confirmationMessage}
									</Heading>
								</React.Fragment>
							)}
							{currentStep === 2 && (
								<React.Fragment>
									<form>
										<Heading size="20px" bold>
											Employers Name
										</Heading>
										<FormInput
											id="EmployerName"
											className="mb-3 w-100"
											type="text"
											placeholder="Employer Name "
											onChange={(e) => {
												setEmployerNameReg(e.target.value);
											}}
										/>
										<Heading size="20px" bold>
											Employer Address
										</Heading>
										<FormInput
											id="EmployerAddress"
											className="mb-3 w-100"
											type="text"
											placeholder="Employer Address "
											onChange={(e) => {
												setEmployerAddressReg(e.target.value);
											}}
										/>
										<Heading size="20px" bold>
											Occupation
										</Heading>
										<FormInput
											id="Occupation"
											className="mb-3 w-100"
											type="Occupation"
											placeholder="Occupation "
											onChange={(e) => {
												setOccupationReg(e.target.value);
											}}
										/>
										<Heading size="20px" bold>
											Proof of Employment
										</Heading>
										<FormInput
											id="ProofEmployment"
											className="mb-3 w-100"
											type="file"
											placeholder="Proof Of Employment "
											onChange={(e) => {
												setProofEmploymentReg(e.target.value);
											}}
										/>
										<Heading size="20px" bold>
											Income
										</Heading>
										<FormInput
											id="Income"
											className="mb-3 w-100"
											type="number"
											placeholder="Income"
											onChange={(e) => {
												setIncomeReg(e.target.value);
											}}
										/>
										<Heading size="20px" bold>
											Additional Income
										</Heading>
										<FormInput
											id="AdditionalIncome"
											className="mb-3 w-100"
											type="number"
											placeholder="Additional Income(Optional) "
											onChange={(e) => {
												setAdditionalIncomeReg(e.target.value);
											}}
										/>

										<PrimaryButton
											type="submit"
											className="w-100 mt-2"
											onClick={upgradeGold}
											text="Upgrade To Gold"
											hasIcon
											disabled={
												employerName.length === 0 ||
												employerAddress.length === 0 ||
												occupation.length === 0 ||
												income.length === 0
											}
										/>
									</form>
								</React.Fragment>
							)}
							{currentStep === 3 && <Paragraph>Thanks for completing this fam</Paragraph>}
						</div>
						<div className="d-flex col-12 col-md-6 mb-3 flex-column justify-content-center">
							<StyledAccordion expanded={expanded === "New"} onChange={handleChange("New")} className={accountTier === "New" && 'expanded'}>
								<AccordionSummary
									aria-controls="panel1bh-content"
									id="panel1bh-header"
								>
									<Paragraph size="20px" bold className="mb-0">New User Tier</Paragraph>
								</AccordionSummary>
								<AccordionDetails className="d-flex">
									<Paragraph bold className="me-2 mb-0" size="18px">
										Trade Volume: 
									</Paragraph>
									<Paragraph className="mb-0" size="18px">
										1 SOL per month
									</Paragraph>
								</AccordionDetails>
							</StyledAccordion>
							<StyledAccordion expanded={expanded === "Bronze"} onChange={handleChange("Bronze")} className={accountTier === "Bronze" && 'expanded'}>
								<AccordionSummary
									aria-controls="panel2bh-content"
									id="panel2bh-header"
								>
									<Paragraph size="20px" bold className="mb-0">Bronze Tier</Paragraph>
								</AccordionSummary>
								<AccordionDetails className="d-flex">
									<Paragraph bold className="me-2 mb-0" size="18px">
										Trade Volume: 
									</Paragraph>
									<Paragraph className="mb-0" size="18px">
										5 SOL per month
									</Paragraph>
								</AccordionDetails>
							</StyledAccordion>
							<StyledAccordion expanded={expanded === "Silver"} onChange={handleChange("Silver")} className={accountTier === "Silver" && 'expanded'}>
								<AccordionSummary
									aria-controls="panel3bh-content"
									id="panel3bh-header"
								>
									<Paragraph size="20px" bold className="mb-0">Silver Tier</Paragraph>
								</AccordionSummary>
								<AccordionDetails className="d-flex">
									<Paragraph bold className="me-2 mb-0" size="18px">
										Trade Volume: 
									</Paragraph>
									<Paragraph className="mb-0" size="18px">
										10 SOL per month
									</Paragraph>
								</AccordionDetails>
							</StyledAccordion>
							<StyledAccordion expanded={expanded === "Gold"} onChange={handleChange("Gold")} className={accountTier === "Gold" && 'expanded'}>
								<AccordionSummary
									aria-controls="panel4bh-content"
									id="panel4bh-header"
								>
									<Paragraph size="20px" bold className="mb-0">Gold Tier</Paragraph>
									{accountTier !== "" && accountTier === "Gold" && (
										<Paragraph size="20px" className="ms-2 mb-0" color="primary_cta">(Current Tier)</Paragraph>
									)}
								</AccordionSummary>
								<AccordionDetails className="d-flex">
									<Paragraph bold className="me-2 mb-0" size="18px">
										Trade Volume: 
									</Paragraph>
									<Paragraph className="mb-0" size="18px">
										25 SOL per month
									</Paragraph>
								</AccordionDetails>
							</StyledAccordion>
							<StyledAccordion expanded={expanded === "Diamond"} onChange={handleChange("Diamond")} className={accountTier === "Diamond" && 'expanded'}>
								<AccordionSummary
									aria-controls="panel5bh-content"
									id="panel5bh-header"
								>
									<Paragraph size="20px" bold className="mb-0">Diamond Tier</Paragraph>
								</AccordionSummary>
								<AccordionDetails className="d-flex">
									<Paragraph bold className="me-2 mb-0" size="18px">
										Trade Volume: 
									</Paragraph>
									<Paragraph className="mb-0" size="18px">
										50 SOL per month
									</Paragraph>
								</AccordionDetails>
							</StyledAccordion>
							<StyledAccordion expanded={expanded === "Team"} onChange={handleChange("Team")} className={accountTier === "Team" && 'expanded'}>
								<AccordionSummary
									aria-controls="panel6bh-content"
									id="panel6bh-header"
								>
									<Paragraph size="20px" bold className="mb-0">Team Tier</Paragraph>
									{accountTier !== "" && accountTier === "Team" && (
										<Paragraph size="20px">Current Tier</Paragraph>
									)}
								</AccordionSummary>
								<AccordionDetails className="d-flex">
									<Paragraph bold className="me-2 mb-0" size="18px">
										Trade Volume: 
									</Paragraph>
									<Paragraph className="mb-0" size="18px">
										100 SOL per month
									</Paragraph>
								</AccordionDetails>
							</StyledAccordion>
							{accountTier}
						</div>
					</div>
				</ContentTab>
			</div>
		</PageBody>
  );
};

export default AccountUpgrade;
