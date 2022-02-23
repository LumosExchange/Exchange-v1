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

const MyListings = () => {
	const [userListings, setUserListings] = useState([]);
	const [modal, setModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	// Editing Listings
	const [primaryPaymentMethod, setPrimaryPaymentMethod] = useState('');
	const [secondaryPaymentMethod, setSecondaryPaymentMethod] = useState('');
	const [aboveOrBelow, setAboveOrBelow] = useState('');
	const [percentageDifference, setPercentageDifference] = useState('');

	const getUserListings = () => {
		Axios.get("http://localhost:3001/getListings").then((response) => {
			setUserListings(response.data);
		});
	}

	const openEditModal = (val) => {
		console.log(val, 'val');
		setPrimaryPaymentMethod(val.paymentMethod1);
		setSecondaryPaymentMethod(val.paymentMethod2);
		setAboveOrBelow(val.aboveOrBelow);
		setModal(!modal);
	}

	const openDeleteModal = (val) => {
		setDeleteModal(!deleteModal);
	}

	useEffect(() => {
		getUserListings();
	}, []);

  	return (
		<PageBody className="d-flex align-items-start">
			<div className="container d-flex justify-content-center py-5 flex-column">
			{userListings.map((val) => (
				<Card className="p-4 mb-3" color="grey">
					<div className="row">
						<div className="col-3">
							<Heading size="24px" bold>{val.userName}</Heading>
						</div>
						<div className="col-3">{val.Country}</div>
						<div className="col-3">{val.Town}</div>
						<div className="col-3">
							<Heading size="24px" color="primary_cta" bold>
							</Heading>
							{/*
							<Heading size="18px">Total Sol for sale</Heading>
								{val.amountForSale}
							<Heading size="18px">Total value of sale</Heading>
								{currencySymbol}{selectedCurrency === 'GBP' && ((val.amountForSale * solgbp)).toFixed(2)}
								{selectedCurrency === 'USD' && ((val.amountForSale * solusd))}
							</Heading>
							*/}
						</div>
						<div className="col-3">{val.tradeHistory} Trades</div>
						<div className="col-3">{val.paymentMethod1}{' & '}{val.paymentMethod2}</div>
						<div className="col-3">
							<Paragraph size="18px">
								{val.percentChange}%
								{' '}{val.aboveOrBelow}{' '}market
							</Paragraph>
						</div>
						<div className="col-3">
							<button onClick={ () => openEditModal(val) }>Edit</button>
							<button onClick={ () => openDeleteModal(val) }>Delete</button>
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
					<div className="col-12 mb-4">
						<StyledLabel padding="0 0 10px 0" htmlFor="aboveOrBelow" bold>Sell above or below market</StyledLabel>
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
