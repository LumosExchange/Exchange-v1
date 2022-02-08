import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import PrimaryButton from "../../Components/Buttons";
import Axios from "axios";
import {
  ContentTab,
  EditableOption,
  TwoFAOption,
  ProfileTabLink,
  Tabs,
} from "../../Components/Profile";
import { useNavigate } from "react-router";
import { FormInput, PageBody, InlineInput, StyledDropdown } from "../../Components/FormInputs";
import { countryOptions, birthDayOptions, birthMonthOptions, birthYearOptions, currentYear  } from "../../Constants/Index";

const KnowYourCustomer = () => {
	const [legalName, setLegalName] = useState("");
	const [birthDay, setBirthDay] = useState(0);
	const [birthMonth, setBirthMonth] = useState("");
	const [birthYear, setBirthYear] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [streetAdress, setStreetAdress] = useState("");
	const [cityTown, setCityTown] = useState("");
	const [cityState, setCityState] = useState("");
	const [postCode, setPostCode] = useState("");
	const [country, setCountry] = useState("");
	const [document, setDocument] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();


	useEffect(() => {
	}, []);

  	return (
		<PageBody>
			<div className="container pt-5">
				<Tabs>
					<ProfileTabLink href="/Profile/Basic">Basic</ProfileTabLink>
					<ProfileTabLink href="/Profile/Security">Security</ProfileTabLink>
					<ProfileTabLink href="/Profile/KYC" className="selected">KYC</ProfileTabLink>
				</Tabs>
				<ContentTab className="text-white">
					<div className="d-flex p-4 row">
						<div className="col-12 col-md-6 mb-3">
							<Heading size="20px" bold>
								Display Name
							</Heading>
							<FormInput
								id="displayname"
								className="mb-3 w-100"
								type="text"
								placeholder="Display Name"
								value={displayName}
								onChange={(e) => {
									setDisplayName(e.target.value);
								}}
							/>
						</div>
						<div className="col-12 col-md-6 mb-3">
							<Heading size="20px" bold>
								Legal Name
							</Heading>
							<FormInput
								id="forename"
								className="mb-3 w-100"
								type="text"
								placeholder="Legal Name"
								value={legalName}
								onChange={(e) => {
									setLegalName(e.target.value);
								}}
							/>
						</div>
						<div className="col-12 col-md-6 mb-3">
							<div className="row">
								<div className="col-4">
									<Heading size="20px" bold>
										Birth Day
									</Heading>
									<StyledDropdown
										className="w-100"
										value={birthDay}
										onChange={(e) => setBirthDay(e.currentTarget.value)}
									>
									{birthDayOptions.map((option) => (
										<option value={option}>{option}</option>
									))}
									</StyledDropdown>
								</div>
								<div className="col-4">
									<Heading size="20px" bold>
										Brith Month
									</Heading>
									<StyledDropdown
										className="w-100"
										value={birthMonth}
										onChange={(e) => setBirthMonth(e.currentTarget.value)}
									>
									{birthMonthOptions.map((option) => (
										<option value={option}>{option}</option>
									))}
									</StyledDropdown>
								</div>
								<div className="col-4">
									<Heading size="20px" bold>
										Birth Year
									</Heading>
									<StyledDropdown
										className="w-100"
										value={birthYear}
										onChange={(e) => setBirthYear(e.currentTarget.value)}
									>
									{birthYearOptions(currentYear, currentYear - 90, -1).map(
										(option) => (
										<option value={option}>{option}</option>
										)
									)}
									</StyledDropdown>
								</div>
						</div>
					</div>
					<div className="col-12 col-md-6 mb-3">
						<Heading size="20px" bold>
							Street Address
						</Heading>
						<FormInput
							id="streetaddress"
							className="mb-3 w-100"
							type="text"
							placeholder="Street Address"
							value={streetAdress}
							onChange={(e) => {
								setStreetAdress(e.target.value);
							}}
						/>
					</div>
					<div className="col-12 col-md-6 mb-3">
						<Heading size="20px" bold>
							City/Town
						</Heading>
						<FormInput
							id="citytown"
							className="mb-3 w-100"
							type="text"
							placeholder="City/Town"
							value={cityTown}
							onChange={(e) => {
								setCityTown(e.target.value);
							}}
						/>
					</div>
					<div className="col-12 col-md-6 mb-3 ">
						<Heading size="20px" bold>
							State (if applicable)
						</Heading>
						<FormInput
							id="citystate"
							className="mb-3 w-100"
							type="text"
							placeholder="State"
							value={cityState}
							onChange={(e) => {
								setCityState(e.target.value);
							}}
						/>
					</div>
					<div className="col-12 col-md-6 mb-3 ">
						<Heading size="20px" bold>
							Postcode
						</Heading>
						<FormInput
							id="postcode"
							className="mb-3 w-100"
							type="text"
							placeholder="Postcode"
							value={postCode}
							onChange={(e) => {
								setPostCode(e.target.value);
							}}
						/>
					</div>
					<div className="col-12 col-md-6 mb-3">
						<Heading size="20px" bold>
							Country
						</Heading>
						<StyledDropdown
							className="w-100"
							value={country}
							onChange={(e) => setCountry(e.currentTarget.value)}
						>
						{countryOptions.map((option) => (
							<option value={option}>{option}</option>
						))}
						</StyledDropdown>
					</div>
					<div className="col-12 col-md-6 mb-3 ">
						<Heading size="20px" bold>
							Upload Document
						</Heading>
						<FormInput
							id="document"
							className="mb-3 w-100"
							type="file"
							placeholder="Postcode"
							value={document}
							onChange={(e) => {
								setDocument(e.target.value);
							}}
						/>
					</div>
					<div className="col-12 col-md-6 mb-3">
						<PrimaryButton onClick={null} text="Save" />
					</div>
				</div>
		</ContentTab>
	</div>
</PageBody>
  );
};

export default KnowYourCustomer;
