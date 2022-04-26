import React, { useState, useEffect } from "react";
import styled, { css } from 'styled-components';
import Axios from "axios";
import { InvisibleDropdown, PageBody, StyledDropdown } from "../Components/FormInputs";
import Card from "../Components/Card";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import GradientButton from "../Components/GradientButton";
import PrimaryButton, { InvisibleButton } from "../Components/Buttons";
import { FormInput, StyledLabel } from "../Components/FormInputs";
import { useNavigate } from "react-router-dom";
import TradeCard from "../Components/TradeCard";
import { LoadingState } from "../Components/Profile";
import { AppUrl } from "../App";
import { IconHelper } from "./Login";

import { filterData, SearchType } from 'filter-data';

const CRYPTO_KIN = 'KIN';
const CRYPTO_SOL = 'SOL';
const CRYPTO_LRA = 'LRA';
const CRYPTO_COPE = 'COPE';

const ToggleButton = styled.button(({ theme }) => css`
	background: ${theme.colors.btn};
	padding: 10px 0;
	border: 2px solid ${theme.colors.primary_cta};
	color: ${theme.colors.text_primary};
	font-size: 18px;

	&.left { border-radius: 10px 0 0px 10px };
	&.right { border-radius: 0 10px 10px 0 };

	&.selected {
		background: ${theme.colors.primary_cta};
		font-family: 'THICCCBOI-BOLD';
		color: ${theme.colors.base_bg};
	}
`);

const QuadButton = styled.button(({ theme }) => css`
	background: ${theme.colors.btn};
	padding: 10px 0;
	border: 0;
	border-radius: 10px;
	color: ${theme.colors.text_primary};
	svg { fill: ${theme.colors.text_primary}; }
	font-size: 18px;

	&.selected {
		background: ${theme.colors.primary_cta};
		font-family: 'THICCCBOI-BOLD';
		color: ${theme.colors.base_bg};
	}

	:disabled {
		opacity: 70%;
		cursor: not-allowed;
	}
`);

const ClearFilterButton = styled(InvisibleButton)(({ theme }) => css`
    color: ${theme.colors.primary_cta};
	font-size: 19px;
    &:hover {
        color: ${theme.colors.text_primary};
    }
`);

export const convertAssetToSvg = (asset) => {
    if (asset === 'SOL'){ return (
		<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4.22037 14.5422C4.3576 14.4007 4.54201 14.321 4.735 14.321H22.597C22.9229 14.321 23.0859 14.728 22.8543 14.9625L19.3248 18.6032C19.1875 18.7447 19.0031 18.8244 18.8101 18.8244H0.952462C0.62653 18.8244 0.463563 18.4174 0.695147 18.1829L4.22037 14.5422Z" fill="currentColor" />
			<path d="M4.22037 0.952509C4.3576 0.81095 4.54201 0.731323 4.735 0.731323H22.597C22.9229 0.731323 23.0859 1.1383 22.8543 1.37276L19.3248 5.00905C19.1875 5.15061 19.0031 5.23024 18.8101 5.23024H0.952462C0.62653 5.23024 0.463563 4.82326 0.695147 4.5888L4.22037 0.952509Z" fill="currentColor" />
			<path d="M19.3248 7.70312C19.1875 7.56156 19.0031 7.48193 18.8101 7.48193H0.952462C0.62653 7.48193 0.463563 7.88891 0.695147 8.12337L4.22465 11.7597C4.36189 11.9012 4.5463 11.9808 4.73928 11.9808H22.6012C22.9272 11.9808 23.0901 11.5739 22.8586 11.3394L19.3248 7.70312Z" fill="currentColor" />
		</svg>
	)}
    if (asset === 'LRA'){ return (
		<svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
			<title>icon-airdrop-asset-lumos</title>
			<g id="icon-airdrop-asset-lumos" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
				<g id="Group" transform="translate(0.000000, 3.000000)" fill="currentColor">
					<path d="M20.4615385,0 L28,8.10526316 L14,22 L0,8.10526316 L7.53846154,0 L20.4615385,0 Z M16.3333333,0 L7,9.33333333 L11.6666667,9.33333333 L11.6666667,9.33333333 L11.6666667,14 L11.6666667,14 L11.8993536,13.767313 C11.9338258,13.7328409 11.9721282,13.6945385 12.0142608,13.6524059 L12.1521494,13.5145173 C12.3513218,13.3153449 12.611778,13.0548887 12.933518,12.7331487 L13.6085975,12.0580691 C13.7579768,11.9086899 13.9159741,11.7506925 14.0825895,11.5840772 L14.9874833,10.6791833 C15.4432817,10.223385 15.9460005,9.72066619 16.4956397,9.17102698 L17.2281728,8.4384939 C17.3967033,8.26996341 17.569064,8.09760268 17.745255,7.92141172 L18.2853186,7.38134811 C18.46917,7.19749667 18.6568517,7.00981499 18.8483636,6.81830307 L21,4.66666667 L16.3333333,4.66666667 L16.3333333,0 Z" id="Combined-Shape"></path>
				</g>
			</g>
		</svg>
	)}
    if (asset === 'KIN'){ return (
		<svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
			<title>icon-airdrop-asset-kin</title>
			<g id="icon-airdrop-asset-kin" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
				<g id="Kin-(KIN)" transform="translate(3.000000, 3.000000)" fill="currentColor">
					<path d="M14.9107237,10.9320288 L14.9107237,11.0679712 C14.9107237,13.0051493 16.5377707,14.5911432 18.5250924,14.5911432 L20.5124142,14.5911432 C21.3375594,14.5911432 22,15.2368692 22,16.0411946 L22,21.9886715 L15.7939778,21.9886715 C14.9688325,21.9886715 14.306392,21.3429454 14.306392,20.53862 L14.306392,18.1029866 C14.306392,16.1658084 12.679345,14.5798146 10.6920232,14.5798146 L10.5525621,14.5798146 C8.56524036,14.5798146 6.93819334,16.1658084 6.93819334,18.1029866 L6.93819334,22 L0,22 L0,0 L6.93819334,0 L6.93819334,3.9423275 C6.93819334,5.87950566 8.56524036,7.46549949 10.5525621,7.46549949 L10.6920232,7.46549949 C12.679345,7.46549949 14.306392,5.87950566 14.306392,3.9423275 L14.306392,1.45005149 C14.306392,0.645726056 14.9688325,0 15.7939778,0 L22,0 L22,5.94747683 C22,6.75180227 21.3375594,7.39752832 20.5124142,7.39752832 L18.5250924,7.39752832 C16.5377707,7.40885685 14.9107237,8.99485067 14.9107237,10.9320288 Z" id="Path"></path>
				</g>
			</g>
		</svg>
	)}
    if (asset === 'COPE'){ return (
		<svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
			<title>icon-airdrop-asset-cope</title>
			<g id="icon-airdrop-asset-cope" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
				<circle id="Oval" stroke="currentColor" strokeWidth="1.5" cx="14" cy="14" r="10.25"></circle>
				<circle id="Oval" fill="currentColor" cx="9.5" cy="13.5" r="1.5"></circle>
				<circle id="Oval-Copy" fill="currentColor" cx="14" cy="13.5" r="1.5"></circle>
				<circle id="Oval-Copy-2" fill="currentColor" cx="18.5" cy="13.5" r="1.5"></circle>
			</g>
		</svg>
	)}
    if (asset === ''){ return <i className="material-icons">token</i> }
}
const Buy = ({ solGbp, solUsd, currency, userName }) => {
	const [allListings, setAllListings] = useState([]);
	const [selectedCrypto, selectCrypto] = useState(CRYPTO_SOL);
	const [searchCriteriaPayment, setSearchCriteriaPayment] = useState('Please Select');
	const [searchCriteriaLocation, setSearchCriteriaLocation] = useState('Please Select');
	const [searchCriteriaFeedback, setSearchCriteriaFeedback] = useState('Please select');
	const [searchCriteriaPrice, setSearchCriteriaPrice] = useState('Please select');
	const [filteredListings, setFilteredListings] = useState([]);
	const [isFiltering, setIsFiltering] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
  
	const navigate = useNavigate();
	
	const PaymentMethods = [
		"Please Select",
		"UK Bank Transfer",
		"EU Bank Transfer",
		"International Wire Transfer",
		"Paypal",
		"Skrill",
	];

	const locationMethods = [
		"Please Select",
		"United Kingdom",
		"America",
		"France",
	];

	const feedbackMethods = [
		"Please Select",
		"High - Low",
		"Low - High",
	];

	const priceMethods = [
		"Price",
		"High - Low",
		"Low - High",
	]

	const ListingArea = styled.div`
		max-height: 100vh;
		overflow-y: auto;
	`;

	const getAllListings = () => {
		Axios.get(`${AppUrl}/getAllListings`).then((response) => {
			const newArray = response.data.map(function(item){
				return {
					saleID: item.saleID,
					userID: item.userID,
					amountForSale: item.amountForSale,
					aboveOrBelow: item.aboveOrBelow,
					percentChange: item.percentChange,
					tradeHistory: item.tradeHistory,
					userName: item.userName,
					feedbackScore: item.feedbackScore,
					Town: item.Town,
					Country: item.Country,
					paymentMethods: [item.paymentMethod1, item.paymentMethod2],
				}
			});
			console.log(newArray, 'listings');
			setAllListings(newArray);
		});
	}

	const searchConditions = [
		{
			key: "Country",
			value: searchCriteriaLocation,
			type: SearchType.EQ,
		},
		{
			key: "paymentMethods",
			value: searchCriteriaPayment,
			type: SearchType.EQ,
		}
	  ];


	  const filter = () =>{
		console.log(searchConditions);
		const result = filterData(allListings, searchConditions);
		console.log(result);
	  };



	const resetFilters = () => {
		setIsFiltering(false);
		setSearchCriteriaPayment('Please Select');
		setSearchCriteriaLocation('Please Select');
		setSearchCriteriaFeedback('Please Select');
		setSearchCriteriaPrice('Please Select');
		setFilteredListings([]);
	}

    useEffect(() => {
		getAllListings();
	}, []);

	const filteredAllListings = allListings.filter(al => (al.userName !== userName));

  	return (
		<PageBody>
			<div className="container">
				<div className="row pt-5">
					<div className="col-12 col-md-5 col-xl-4">
						<Card radius="10px" className="p-4">
						<div className="d-flex">
							<div className="col-6">
								<ToggleButton
									className="left w-100 selected"
								>
									Buy
								</ToggleButton>
							</div>
							<div className="col-6">
								<ToggleButton
									onClick={() => navigate("/Sell")}
									className="right w-100"
								>
									Sell
								</ToggleButton>
							</div>
						</div>
							<div className="d-flex flex-wrap mt-3">
								<div className="col-12">
									<StyledLabel bold padding="0 0 5px 0">
										Crypto
									</StyledLabel>
								</div>
								<div className="col-6 d-flex">
									<QuadButton
										className={`w-100 me-1 mb-1 d-flex justify-content-center align-items-center ${selectedCrypto === CRYPTO_SOL && 'selected'}`}
										onClick={ () => selectCrypto(CRYPTO_SOL) }
									>
										{convertAssetToSvg(CRYPTO_SOL)}
										<span className="ms-2">{CRYPTO_SOL}</span>
									</QuadButton>
								</div>
								<div className="col-6 d-flex">
									<QuadButton
										className={`w-100 me-1 mb-1 d-flex justify-content-center align-items-center ${selectedCrypto === CRYPTO_KIN && 'selected'}`}
										onClick={ () => selectCrypto(CRYPTO_KIN) }
									>
										{convertAssetToSvg(CRYPTO_KIN)}
										<span className="ms-2">{CRYPTO_KIN}</span>
									</QuadButton>
								</div>
								<div className="col-6 d-flex">
									<QuadButton
										className={`w-100 me-1 mb-1 d-flex justify-content-center align-items-center ${selectedCrypto === CRYPTO_COPE && 'selected'}`}
										onClick={ () => selectCrypto(CRYPTO_COPE) }
									>
										{convertAssetToSvg(CRYPTO_COPE)}
										<span className="ms-2">{CRYPTO_COPE}</span>
									</QuadButton>
								</div>
								<div className="col-6 d-flex">
									<QuadButton
										className={`w-100 me-1 mb-1 d-flex justify-content-center align-items-center ${selectedCrypto === CRYPTO_LRA && 'selected'}`}
										onClick={ () => selectCrypto(CRYPTO_LRA) }
									>
										{convertAssetToSvg(CRYPTO_LRA)}
										<span className="ms-2">{CRYPTO_LRA}</span>
									</QuadButton>
								</div>
							</div>
							<div>
							<div className="col-12">
								<StyledLabel bold padding="10px 0 5px 0" htmlFor="preferredPayment">
									Preferred Payment Method
								</StyledLabel>
							</div>
							<StyledDropdown
								type="change"
								placeholder="preferredPayment"
								name="preferredPayment"
								value={searchCriteriaPayment}
								id="preferredPayment"
								color="btn"
								onChange={(e) => {
									setSearchCriteriaPayment(e.target.value);
								}}
								className="w-100"
								required
							>
								{PaymentMethods.map((data) => (
									<option value={data}>{data}</option>
								))}
							</StyledDropdown>
							<div className="col-12">
								<StyledLabel bold padding="10px 0 5px 0" htmlFor="preferredLocation">
									Preferred Location
								</StyledLabel>
							</div>
							<StyledDropdown
								type="change"
								placeholder="preferredLocation"
								name="preferredLocation"
								value={searchCriteriaLocation}
								id="preferredLocation"
								color="btn"
								onChange={(e) => {
									setSearchCriteriaLocation(e.target.value);
								}}
								className="w-100"
								required
							>
								{locationMethods.map((data) => (
									<option value={data}>{data}</option>
								))}
							</StyledDropdown>
							<div className="col-12">
								<StyledLabel bold padding="10px 0 5px 0" htmlFor="preferredFeedback">
									Feedback Score
								</StyledLabel>
							</div>
							<StyledDropdown
								type="change"
								placeholder="preferredFeedback"
								name="preferredFeedback"
								value={searchCriteriaFeedback}
								id="preferredFeedback"
								color="btn"
								onChange={(e) => {
									setSearchCriteriaFeedback(e.target.value);
								}}
								className="w-100"
								required
							>
								{feedbackMethods.map((data) => (
									<option value={data}>{data}</option>
								))}
							</StyledDropdown>
							<div className="col-12 mt-3">
								<GradientButton
									text="Filter Results"
									onClick={filter}
									fontSize="20px"
									padding="4px 20px"
									className="w-100" 
								/>
							</div>
							</div>
						</Card>
					</div>
					<div className="col-12 col-md-7 col-xl-8 mt-4 mt-md-0 position-relative">
						{filteredAllListings.length === 0 && (
							<LoadingState />
						)}
						<div className="d-flex justify-content-between flex-row pb-2">
							<Heading size="24px">Buy {selectedCrypto} from these Sellers</Heading>
							<div className="d-flex align-items-center">
								<InvisibleDropdown
									type="change"
									placeholder="preferredPrice"
									name="preferredPrice"
									value={searchCriteriaPrice}
									id="preferredPrice"
									onChange={(e) => {
										setSearchCriteriaPrice(e.target.value);
									}}
									required
								>
									{priceMethods.map((data) => (
										<option value={data}>{data}</option>
									))}
								</InvisibleDropdown>
								<IconHelper className="material-icons">expand_more</IconHelper>
							</div>
						</div>
						{selectedCrypto === "SOL" && (
							<ListingArea>
								{isFiltering && (
									<div className="d-flex mb-3 align-items-baseline">
										<Paragraph size="20px" bold className="mb-0 me-1">{filteredListings.length}</Paragraph>
										<Paragraph size="20px" className="mb-0">result{filteredListings.length > 1 && 's'} found</Paragraph>
										<ClearFilterButton onClick={ resetFilters } className="d-flex align-items-center">
											<span className="me-1">Clear</span>
											<i className="material-icons">cancel</i>
										</ClearFilterButton>
									</div>
								)}
								{isFiltering ? (
									filteredListings.map((val, index) => (
										<TradeCard val={val} solGbp={solGbp} solUsd={solUsd} currency={currency} key={index} />
								))) : (
									filteredAllListings.map((val, index) => (
										<TradeCard val={val} solGbp={solGbp} solUsd={solUsd} currency={currency} key={index} />
									))
								)}
							</ListingArea>
						)}
						{(selectedCrypto === "KIN" || selectedCrypto === "COPE" || selectedCrypto === "LRA") && (
							<Paragraph size="20px" bold className="pt-2">Coming Soon</Paragraph>
						)}
					</div>
				</div>
			</div>
		</PageBody>
  );
}

export default Buy;
