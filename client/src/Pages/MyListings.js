import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled, { css } from "styled-components";
import { PageBody, FormInput, StyledLabel, StyledDropdown } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import PrimaryButton, { InvisibleButton } from "../Components/Buttons";
import Card from "../Components/Card";
import GradientButton from "../Components/GradientButton";
import GradientCard from "../Components/GradientCard";
import { Collapse } from "@material-ui/core";
import SolanaIcon from '../Images/icon-solana.svg';
import DropdownIcon from '../Images/icon-dropdown.svg';
import StyledTable from "../Components/Tables";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { StyledModal } from "./Profile/PaymentMethods";
import { InlineButton } from "../Components/Buttons";

const PaymentMethods = [
	"Please Select",
	"UK Bank Transfer",
	"EU Bank Transfer",
	"International Wire Transfer",
];

const CardActionButton = styled(InvisibleButton)(({ theme }) => css`
	.edit { color: ${theme.colors.primary_cta} };
	.delete { color: ${theme.colors.invalid} };
`);

const MyListings = () => {
	const [userListings, setUserListings] = useState([]);
	const [modal, setModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	// Editing Listings
	const [primaryPaymentMethod, setPrimaryPaymentMethod] = useState('');
	const [secondaryPaymentMethod, setSecondaryPaymentMethod] = useState('');
	const [aboveOrBelow, setAboveOrBelow] = useState('');
	const [percentageDifference, setPercentageDifference] = useState('');
	const [volumeForSale, setVolumeForSale] = useState('');

	// Currency
	const [selectedCurrency, selectCurrency] = useState();
	const [solgbp, setSolGbp] = useState();
	const [solusd, setSolUsd] = useState();
	const [currencySymbol, setCurrencySymbol] = useState();

	const getUserListings = () => {
		Axios.get("http://localhost:3001/getListings").then((response) => {
			setUserListings(response.data);
		});
	}

	const getCurrency = () => {
		Axios.get("http://localhost:3001/getUserSettings").then((response) => {
			if(response.data[0]?.currency === 'GBP') {
				selectCurrency('GBP');
				setCurrencySymbol('£');
				//Get GBP price of SOlana
				fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=gbp').then((response) => response.json().then(function (data) {
					setSolGbp(data.solana.gbp);
				}));	
			} else if (response.data[0]?.currency === 'USD') {
				selectCurrency('USD');
				setCurrencySymbol('$');
				//Get USD price of solana
				fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd').then((response) => response.json().then(function (data) {
					setSolUsd(data.solana.usd);
				}));
			} else {
				//handle other currencys
				selectCurrency('GBP');
			}
		});
	}

	const openEditModal = (val) => {
		console.log(val, 'val');
		setPrimaryPaymentMethod(val.paymentMethod1);
		setSecondaryPaymentMethod(val.paymentMethod2);
		setAboveOrBelow(val.aboveOrBelow);
		setPercentageDifference(val.percentChange);
		setVolumeForSale(val.amountForSale);
		setModal(!modal);
	}

	const openDeleteModal = (val) => {
		setDeleteModal(!deleteModal);
	}

	useEffect(() => {
		getUserListings();
		getCurrency();
	}, []);

  	return (
		<PageBody className="d-flex align-items-start">
			<div className="container d-flex justify-content-center py-5 flex-column">
			{userListings.map((val) => (
				<Card className="p-4 mb-3" color="grey">
					<div className="row">
						<div className="col-3 d-flex align-items-center">
							<i className="material-icons">person</i>
							<Heading size="24px" bold className="mb-0">
								{val.userName}
							</Heading>
						</div>
						<div className="col-6 d-flex align-items-center">
							<i className="material-icons me-2">place</i>
							{val.Town}, {val.Country}
						</div>
						<div className="col-3 d-flex flex-column align-items-end">
							<Heading size="24px" bold color="primary_cta" className="mb-0">
								{currencySymbol}{val.aboveOrBelow === 'above' && ((solgbp / 100) * (100 + val.percentChange)).toFixed(2)}
								{val.aboveOrBelow === 'below' && ((solgbp / 100) * (100 - val.percentChange)).toFixed(2)}
							</Heading>
							<Paragraph className="mb-0">{val.amountForSale} for sale</Paragraph>
						</div>
						<div className="col-3 d-flex align-items-center">{val.tradeHistory} Trades</div>
						<div className="col-3 d-flex align-items-center">
							<i className="material-icons me-2">account_balance_wallet</i>
							{val.paymentMethod1}{' & '}{val.paymentMethod2}
						</div>
						<div className="col-3 d-flex align-items-center">
							<i className="material-icons me-2">vertical_align_center</i>
							<Paragraph size="18px" className="mb-0">
								{val.percentChange}%
								{' '}{val.aboveOrBelow}{' '}market
							</Paragraph>
						</div>
						<div className="col-3 d-flex align-items-end justify-content-end">
							<CardActionButton onClick={ () => openEditModal(val) } title="Edit">
								<i className="material-icons edit">edit</i>
							</CardActionButton>
							<CardActionButton onClick={ () => openDeleteModal(val) } title="Delete">
								<i className="material-icons delete">clear</i>
							</CardActionButton>
						</div>
					</div>
				</Card>
			))}
			<StyledModal
				centered
				isOpen={modal}
				toggle={openEditModal}
			>
				<ModalHeader>
					Edit Listing
				</ModalHeader>
				<ModalBody>
					<div className="col-12 mb-4">
						<StyledLabel
							padding="0 0 10px 0"
							bold
							htmlFor="primaryPayment"
						>
							Primary Payment Method
						</StyledLabel>
						<StyledDropdown
							type="text"
							id="primaryPayment"
							value={primaryPaymentMethod}
							name="primaryPayment"
							onChange={(e) => {
								setPrimaryPaymentMethod(e.target.value);
							}}
							className="w-100"
						>
							{PaymentMethods.map((data) => (
								<option value={data}>{data}</option>
							))}
						</StyledDropdown>
					</div>
					<div className="col-12 mb-4">
						<StyledLabel
							padding="0 0 10px 0"
							bold
							htmlFor="secondaryPayment"
						>
							Secondary Payment Method
						</StyledLabel>
						<StyledDropdown
							id="secondaryPayment"
							value={secondaryPaymentMethod}
							name="secondaryPayment"
							onChange={(e) => {
								setSecondaryPaymentMethod(e.target.value);
							}}
							className="w-100"
						>
							{PaymentMethods.map((data) => (
								<option value={data}>{data}</option>
							))}
						</StyledDropdown>
					</div>
					<div className="col-12">
						<StyledLabel padding="0 0 10px 0" htmlFor="percentageDifference" bold>Sell above or below market</StyledLabel>
					</div>
					<div className="col-12 mb-4 d-flex">
						<div className="col-2">
							<FormInput
								type="text"
								id="percentageDifference"
								name="percentageDifference"
								value={percentageDifference}
								onChange={(e) => {
									setPercentageDifference(e.target.value);
								}}
								className="w-100"
							/>
						</div>
						<div className="col-1 d-flex align-items-center justify-content-center">
							<Paragraph bold className="mb-0" size="24px">%</Paragraph>
						</div>
						<div className="col-9">
							<StyledDropdown
								autofocus="true"
								type="aboveOrBelow"
								placeholder="aboveOrBelow"
								value={aboveOrBelow}
								name="aboveOrBelow"
								id="aboveOrBelow"
								color="btn"
								onChange={(e) => {
									setAboveOrBelow(e.target.value);
								}}
								className="w-100"
								required
							>
								<option value="below">Below</option>
								<option value="above">Above</option>
							</StyledDropdown>
						</div>
					</div>
					<div className="col-12 mb-4">
						<StyledLabel padding="0 0 10px 0" htmlFor="volumeForSale" bold>Amount for Sale</StyledLabel>
						<FormInput
							type="text"
							id="volumeForSale"
							name="volumeForSale"
							value={volumeForSale}
							onChange={(e) => {
								setVolumeForSale(e.target.value);
							}}
							className="w-100"
						/>
					</div>
					<div className="col-12 mb-4">
						<PrimaryButton text="Save" className="w-100" />
					</div>
				</ModalBody>
			</StyledModal>
			<StyledModal
				centered
				isOpen={deleteModal}
				toggle={openDeleteModal}
			>
				<ModalHeader>Permenantly delete this listing?</ModalHeader>
				<ModalBody>
					<div className="row">
						<div className="col-6">
							<InlineButton className="cancel">Cancel</InlineButton>
						</div>
						<div className="col-6">
							<InlineButton className="delete">Delete Listing</InlineButton>
						</div>
					</div>
				</ModalBody>
			</StyledModal>
			</div>
    	</PageBody>
  );
}

export default MyListings;
