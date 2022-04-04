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
import { StyledDropdown, StyledLabel } from "../../Components/FormInputs";
import Paragraph from "../../Components/Paragraph";
import "react-dropzone-uploader/dist/styles.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IconHelper } from "../Login";
import { Nationalities } from "../../Constants/Index";

const StyledAccordion = styled(Accordion)(({ theme }) => css`
	background-color: ${theme.colors.panel_bg} !important;

	&.expanded {
		border: 2px solid ${theme.colors.primary_cta};
		border-radius: 6px;
	}

	i {
		font-size: 30px;
	}
`);

const reloadPage = () => {
	window.location.reload(true);
};

const AccountUpgrade = () => {
	// step 0 upgrade bronze
	const [name, setName] = useState("");
	const [streetAddress, setStreetAddress] = useState("");
	const [city, setCity] = useState("");
	const [cityState, setCityState] = useState("");
	const [postCode, setPostCode] = useState("");
	const [country, setCountry] = useState("");
	const [document, setDocument] = useState("");
	const [nationality, setNationality] = useState("");

	//step 1 upgrade silver
	const [birthDay, setBirthDay] = useState("");
	const [birthMonth, setBirthMonth] = useState("");
	const [birthYear, setBirthYear] = useState("");
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
	const [currentStep, setCurrentStep] = useState(null);
	const [confirmationMessage, setConfirmationMessage] = useState("");
	const [expanded, setExpanded] = useState(null);

	const [file, setFile] = useState("");

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const getAccountTier = () => {
		Axios.get("http://localhost:3001/getUserAccountLevel").then((response) => {
			setAccountTier(response.data[0]?.accountLevel);
		});
	};

	const upgradeBronze = () => {
		const data = new FormData();
		data.append("name", name);
		data.append("file", file);
		data.append("streetAddress", streetAddress);
		data.append("city", city);
		data.append("cityState", cityState);
		data.append("postCode", postCode);
		data.append("country", country);

		console.log(data);
		Axios.post("https://httpbin.org/anything", data)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));

		Axios.post("http://localhost:3001/upgradeBronze", data, {}).then((response) => {
			//handle message retunred from endpoint
			setConfirmationMessage(response.data.message);
			//Go to next step
			setCurrentStep(1);
			reloadPage();
		});
	};

	const upgradeSilver = () => {
		Axios.post("http://localhost:3001/upgradeSilver", {
			birthDay,
			birthMonth,
			birthYear,
			phone,
			tax,
			countryOfResidence,
		}).then((response) => {
			//handle message retunred from endpoint
			setConfirmationMessage(response.data.message);
			//Go to next step
			setCurrentStep(2);
			reloadPage();
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
			reloadPage();
		});
	};

	useEffect(
		function getTier() {
			getAccountTier();
			if (accountTier !== "") {
				setExpanded(accountTier);
				if (accountTier === "Standard") {
					setCurrentStep(0);
				}
				if (accountTier === "Bronze") {
					setCurrentStep(1);
				}
				if (accountTier === "Silver") {
					setCurrentStep(2);
				}
				if (accountTier === "Gold") {
					setCurrentStep(3);
				}
			}
		},
		[accountTier]
	);

	return (
		<PageBody>
			<div className="container pt-5">
				<ProfileTabs selected="AccountUpgrade" />
				<ContentTab className="text-white">
					<div className="d-flex p-4 row">
						<div className="d-flex col-12 col-md-6 mb-3 flex-column">
							{currentStep === 0 && (
								<React.Fragment>
									<form>
										<div className="row">
											<div className="col-12 mb-4">
												<StyledLabel
													htmlFor="legalName"
													padding="0 0 5px 0"
													bold
													fontSize="20px"
												>
													Legal Name
												</StyledLabel>
												<FormInput
													id="legalName"
													name="legalName"
													className="w-100"
													type="text"
													placeholder="Legal Name"
													onChange={(e) => {
														setName(e.target.value);
													}}
												/>
											</div>
											<div className="col-12 mb-4">
												<StyledLabel
													htmlFor="streetaddress"
													padding="0 0 5px 0"
													bold
													fontSize="20px"
												>
													Street Address
												</StyledLabel>
												<FormInput
													id="streetaddress"
													name="streetaddress"
													className="w-100"
													type="text"
													placeholder="Street Address"
													onChange={(e) => {
														setStreetAddress(e.target.value);
													}}
												/>
											</div>
											<div className="col-12 mb-4">
												<StyledLabel
													htmlFor="citytown"
													padding="0 0 5px 0"
													bold
													fontSize="20px"
												>
													City/Town
												</StyledLabel>
												<FormInput
													id="citytown"
													name="citytown"
													className="w-100"
													type="text"
													placeholder="City/Town"
													onChange={(e) => {
														setCity(e.target.value);
													}}
												/>
											</div>
											<div className="col-12 mb-4">
												<StyledLabel
													htmlFor="citystate"
													padding="0 0 5px 0"
													bold
													fontSize="20px"
												>
													State (if applicable)
												</StyledLabel>
												<FormInput
													id="citystate"
													name="citystate"
													className="w-100"
													type="text"
													placeholder="State"
													onChange={(e) => {
														setCityState(e.target.value);
													}}
												/>
											</div>
											<div className="col-12 mb-4">
												<StyledLabel
													htmlFor="postcode"
													padding="0 0 5px 0"
													bold
													fontSize="20px"
												>
													Postcode
												</StyledLabel>
												<FormInput
													id="postcode"
													name="postcode"
													className="w-100"
													type="text"
													placeholder="Postcode"
													onChange={(e) => {
														setPostCode(e.target.value);
													}}
												/>
											</div>
											<div className="col-12 mb-4">
												<StyledLabel htmlFor="country" padding="0 0 5px 0" bold fontSize="20px">
													Country
												</StyledLabel>
												<StyledDropdown
													id="country"
													name="country"
													className="w-100"
													onChange={(e) => setCountry(e.currentTarget.value)}
												>
													{countryOptions.map((option) => (
														<option value={option}>{option}</option>
													))}
												</StyledDropdown>
											</div>
											<div className="col-12 mb-4">
												<StyledLabel
													htmlFor="nationality"
													padding="0 0 5px 0"
													bold
													fontSize="20px"
												>
													Nationality
												</StyledLabel>
												<StyledDropdown
													id="nationality"
													name="nationality"
													className="w-100"
													type="text"
													form="register"
													autocomplete="off"
													placeholder="Nationality"
													onChange={(e) => {
														setNationality(e.target.value);
													}}
												>
													{Nationalities.map((data) => (
														<option value={data}>{data}</option>
													))}
												</StyledDropdown>
											</div>
											<div className="col-12">
												<StyledLabel htmlFor="file" padding="0 0 5px 0" bold fontSize="20px">
													Upload Document
												</StyledLabel>
												<FormInput
													id="file"
													className="mb-3 w-100"
													type="file"
													accept=".jpg"
													name="image"
													placeholder="FILE"
													onChange={(e) => {
														const file = e.target.files[0];
														setFile(file);
														setDocument(e.target.value);
													}}
												/>
											</div>
											<div className="col-12 mb-3 ">
												<PrimaryButton
													type="submit"
													className="w-100 mt-3"
													onClick={(event) => {
														event.preventDefault();
														upgradeBronze();
													}}
													text="Upgrade To Bronze"
													hasIcon
													disabled={
														name.length === 0 ||
														streetAddress.length === 0 ||
														city.length === 0 ||
														postCode.length === 0 ||
														country !== "Please Select" ||
														nationality !== "Please Select"
													}
												/>
											</div>
										</div>
									</form>
								</React.Fragment>
							)}
							{currentStep === 1 && (
								<React.Fragment>
									<form>
										<Heading size="20px" bold>
											Date Of Birth
										</Heading>
										<div className="row mb-3">
											<div className="col-4">
												<StyledLabel
													htmlFor="birthDay"
													padding="0 0 5px 0"
													bold
													fontSize="20px"
												>
													Day
												</StyledLabel>
												<StyledDropdown
													className="w-100"
													id="birthDay"
													name="birthDay"
													onChange={(e) => setBirthDay(e.currentTarget.value)}
												>
													{birthDayOptions.map((option) => (
														<option value={option}>{option}</option>
													))}
												</StyledDropdown>
											</div>
											<div className="col-4">
												<StyledLabel
													htmlFor="birthMonth"
													padding="0 0 5px 0"
													bold
													fontSize="20px"
												>
													Month
												</StyledLabel>
												<StyledDropdown
													className="w-100"
													id="birthMonth"
													name="birthMonth"
													onChange={(e) => setBirthMonth(e.currentTarget.value)}
												>
													{birthMonthOptions.map((option) => (
														<option value={option}>{option}</option>
													))}
												</StyledDropdown>
											</div>
											<div className="col-4">
												<StyledLabel
													htmlFor="birthYear"
													padding="0 0 5px 0"
													bold
													fontSize="20px"
												>
													Year
												</StyledLabel>
												<StyledDropdown
													className="w-100"
													id="birthYear"
													name="birthYear"
													onChange={(e) => setBirthYear(e.currentTarget.value)}
												>
													<option value="---">---</option>
													{birthYearOptions(currentYear, currentYear - 90, -1).map(
														(option) => (
															<option value={option}>{option}</option>
														)
													)}
												</StyledDropdown>
											</div>
										</div>
										<StyledLabel htmlFor="phone" padding="0 0 5px 0" bold fontSize="20px">
											Phone Number
										</StyledLabel>
										<FormInput
											id="phone"
											name="phone"
											className="mb-3 w-100"
											type="number"
											placeholder="Phone"
											onChange={(e) => {
												setPhoneReg(e.target.value);
											}}
										/>
										<StyledLabel htmlFor="taxes" padding="0 0 5px 0" bold fontSize="20px">
											Taxes
										</StyledLabel>
										<FormInput
											id="taxes"
											name="taxes"
											className="mb-3 w-100"
											type="file"
											placeholder="Taxes (Optional)"
											onChange={(e) => {
												setTaxReg(e.target.value);
											}}
										/>
										<PrimaryButton
											type="submit"
											className="w-100 mt-3"
											onClick={(event) => {
												event.preventDefault();
												upgradeSilver();
											}}
											text="Upgrade To Silver"
											disabled={
												birthDay === "---" ||
												birthMonth === "---" ||
												birthYear === "---" ||
												phone.length === 0
											}
											hasIcon
										/>
										<Heading size="20px" bold>
											{confirmationMessage}
										</Heading>
									</form>
								</React.Fragment>
							)}
							{currentStep === 2 && (
								<React.Fragment>
									<form>
										<StyledLabel htmlFor="EmployerName" padding="0 0 5px 0" bold fontSize="20px">
											Employers Name
										</StyledLabel>
										<FormInput
											id="EmployerName"
											className="mb-3 w-100"
											type="text"
											placeholder="Employer Name "
											onChange={(e) => {
												setEmployerNameReg(e.target.value);
											}}
										/>
										<StyledLabel htmlFor="EmployerAddress" padding="0 0 5px 0" bold fontSize="20px">
											Employer Address
										</StyledLabel>
										<FormInput
											id="EmployerAddress"
											className="mb-3 w-100"
											type="text"
											placeholder="Employer Address "
											onChange={(e) => {
												setEmployerAddressReg(e.target.value);
											}}
										/>
										<StyledLabel htmlFor="occupation" padding="0 0 5px 0" bold fontSize="20px">
											Occupation
										</StyledLabel>
										<FormInput
											id="occupation"
											name="occupation"
											className="mb-3 w-100"
											type="Occupation"
											placeholder="Occupation "
											onChange={(e) => {
												setOccupationReg(e.target.value);
											}}
										/>
										<StyledLabel htmlFor="ProofEmployment" padding="0 0 5px 0" bold fontSize="20px">
											Proof of Employment
										</StyledLabel>
										<FormInput
											id="ProofEmployment"
											className="mb-3 w-100"
											type="file"
											placeholder="Proof Of Employment "
											onChange={(e) => {
												setProofEmploymentReg(e.target.value);
											}}
										/>
										<StyledLabel htmlFor="income" padding="0 0 5px 0" bold fontSize="20px">
											Yearly Income
										</StyledLabel>
										<FormInput
											id="income"
											name="income"
											className="mb-3 w-100"
											type="number"
											placeholder="£"
											onChange={(e) => {
												setIncomeReg(e.target.value);
											}}
										/>
										<StyledLabel
											htmlFor="additionalIncome"
											padding="0 0 5px 0"
											bold
											fontSize="20px"
										>
											Additional Income
										</StyledLabel>
										<FormInput
											id="additionalIncome"
											name="additionalIncome"
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
											onClick={(event) => {
												event.preventDefault();
												upgradeGold();
											}}
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
						</div>
						<div
							className={`d-flex ${
								accountTier === "Gold" ? "col-12" : "col-12 col-md-6"
							} mb-3 flex-column justify-content-center`}
						>
							<StyledAccordion
								expanded={expanded === "Standard"}
								onChange={handleChange("Standard")}
								className={accountTier === "Standard" && "expanded"}
							>
								<AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
									<div className="d-flex justify-content-between w-100">
										<Paragraph size="20px" bold className="mb-0">
											Standard User Tier
										</Paragraph>
										{accountTier === "Standard" && (
											<IconHelper color="primary_cta" className="material-icons">
												stars
											</IconHelper>
										)}
									</div>
								</AccordionSummary>
								<AccordionDetails className="d-flex">
									<Paragraph bold className="me-2 mb-0" size="18px">
										Trade Volume:
									</Paragraph>
									<Paragraph className="mb-0" size="18px">
										1 SOL per month (No Requirements)
									</Paragraph>
								</AccordionDetails>
							</StyledAccordion>
							<StyledAccordion
								expanded={expanded === "Bronze"}
								onChange={handleChange("Bronze")}
								className={accountTier === "Bronze" && "expanded"}
							>
								<AccordionSummary aria-controls="panel2bh-content" id="panel2bh-header">
									<div className="d-flex justify-content-between w-100">
										<Paragraph size="20px" bold className="mb-0">
											Bronze Tier
										</Paragraph>
										{accountTier === "Bronze" && (
											<IconHelper color="primary_cta" className="material-icons">
												stars
											</IconHelper>
										)}
									</div>
								</AccordionSummary>
								<AccordionDetails className="d-flex flex-column">
									<div className="d-flex">
										<Paragraph bold className="me-2 mb-0" size="18px">
											Trade Volume:
										</Paragraph>
										<Paragraph className="mb-0" size="18px">
											5 SOL per month (Requires KYC verification)
										</Paragraph>
									</div>
									<div className="d-flex align-items-center mt-3">
										<IconHelper className="material-icons me-2" color="valid">
											check_circle
										</IconHelper>
										<Paragraph className="mb-0">Basic Information Added</Paragraph>
									</div>
								</AccordionDetails>
							</StyledAccordion>
							<StyledAccordion
								expanded={expanded === "Silver"}
								onChange={handleChange("Silver")}
								className={accountTier === "Silver" && "expanded"}
							>
								<AccordionSummary aria-controls="panel3bh-content" id="panel3bh-header">
									<div className="d-flex justify-content-between w-100">
										<Paragraph size="20px" bold className="mb-0">
											Silver Tier
										</Paragraph>
										{accountTier === "Silver" && (
											<IconHelper color="primary_cta" className="material-icons">
												stars
											</IconHelper>
										)}
									</div>
								</AccordionSummary>
								<AccordionDetails className="d-flex flex-column">
									<div className="d-flex">
										<Paragraph bold className="me-2 mb-0" size="18px">
											Trade Volume:
										</Paragraph>
										<Paragraph className="mb-0" size="18px">
											10 SOL per month (Requires Bronze Tier)
										</Paragraph>
									</div>
									<div className="d-flex align-items-center mt-3">
										<IconHelper className="material-icons me-2" color="valid">
											check_circle
										</IconHelper>
										<Paragraph className="mb-0">Personal Information added.</Paragraph>
									</div>
								</AccordionDetails>
							</StyledAccordion>
							<StyledAccordion
								expanded={expanded === "Gold"}
								onChange={handleChange("Gold")}
								className={accountTier === "Gold" && "expanded"}
							>
								<AccordionSummary aria-controls="panel4bh-content" id="panel4bh-header">
									<div className="d-flex justify-content-between w-100">
										<Paragraph size="20px" bold className="mb-0">
											Gold Tier
										</Paragraph>
										{accountTier === "Gold" && (
											<IconHelper color="primary_cta" className="material-icons">
												stars
											</IconHelper>
										)}
									</div>
								</AccordionSummary>
								<AccordionDetails className="d-flex flex-column">
									<div className="d-flex">
										<Paragraph bold className="me-2 mb-0" size="18px">
											Trade Volume:
										</Paragraph>
										<Paragraph className="mb-0" size="18px">
											25 SOL per month (Requires Silver Tier)
										</Paragraph>
									</div>
									<div className="d-flex align-items-center mt-3">
										<IconHelper className="material-icons me-2" color="valid">
											check_circle
										</IconHelper>
										<Paragraph className="mb-0">Employment Information added.</Paragraph>
									</div>
								</AccordionDetails>
							</StyledAccordion>
							<StyledAccordion
								expanded={expanded === "Diamond"}
								onChange={handleChange("Diamond")}
								className={accountTier === "Diamond" && "expanded"}
							>
								<AccordionSummary aria-controls="panel5bh-content" id="panel5bh-header">
									<Paragraph size="20px" bold className="mb-0">
										Diamond Tier
									</Paragraph>
								</AccordionSummary>
								<AccordionDetails className="d-flex">
									<Paragraph bold className="me-2 mb-0" size="18px">
										Trade Volume:
									</Paragraph>
									<Paragraph className="mb-0" size="18px">
										50 SOL per month (Requires Gold Tier for a Year)
									</Paragraph>
								</AccordionDetails>
							</StyledAccordion>
							<StyledAccordion
								expanded={expanded === "Team"}
								onChange={handleChange("Team")}
								className={accountTier === "Team" && "expanded"}
							>
								<AccordionSummary aria-controls="panel6bh-content" id="panel6bh-header">
									<Paragraph size="20px" bold className="mb-0">
										Team Tier
									</Paragraph>
									{accountTier !== "" && accountTier === "Team" && (
										<Paragraph size="20px">Current Tier</Paragraph>
									)}
								</AccordionSummary>
								<AccordionDetails className="d-flex">
									<Paragraph bold className="me-2 mb-0" size="18px">
										Trade Volume:
									</Paragraph>
									<Paragraph className="mb-0" size="18px">
										100 SOL per month (For Lumos Exchange Team Members)
									</Paragraph>
								</AccordionDetails>
							</StyledAccordion>
						</div>
					</div>
				</ContentTab>
			</div>
		</PageBody>
	);
};

export default AccountUpgrade;
