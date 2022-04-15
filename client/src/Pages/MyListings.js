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
import { CodeSentMessage } from "./ChangePassword";
import { useNavigate } from "react-router";
import TradeCard from "../Components/TradeCard";
import { LoadingState } from "../Components/Profile";

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

const MissingIcon = styled.i(({ theme }) => css`
	font-size: 80px;
	color: ${theme.colors.primary_cta};
`);

const MyListings = ({ solGbp, currency }) => {
	const [userListings, setUserListings] = useState([]);
	const [modal, setModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [modalMode, setModalMode] = useState('initial');
	const [deleteModalMode, setDeleteModalMode] = useState('initial');

	// Editing Listings
	const [primaryPaymentMethod, setPrimaryPaymentMethod] = useState('');
	const [secondaryPaymentMethod, setSecondaryPaymentMethod] = useState('');
	const [aboveOrBelow, setAboveOrBelow] = useState('');
	const [percentageDifference, setPercentageDifference] = useState('');
	const [volumeForSale, setVolumeForSale] = useState('');

	// Delete Listings
	const [saleID, setSaleId] = useState('');
	const [userID, setUserId] = useState('');
	const [confirmationMessage, setConfirmationMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const [isLoading, setIsLoading] = useState(true);

	const getUserListings = () => {
		Axios.get("http://3.8.159.233:3001/getListings").then((response) => {
			setUserListings(response.data);
			setIsLoading(false);
		});
	}

	const openEditModal = (val) => {
		console.log(val, 'val');
		setPrimaryPaymentMethod(val.paymentMethod1);
		setSecondaryPaymentMethod(val.paymentMethod2);
		setAboveOrBelow(val.aboveOrBelow);
		setPercentageDifference(val.percentChange);
		setVolumeForSale(val.amountForSale);
		setSaleId(val.saleID);
		setUserId(val.userID);
		setModal(!modal);
	}

	const openDeleteModal = (val) => {
		setDeleteModal(!deleteModal);
		setSaleId(val.saleID);
		setUserId(val.userID);
	}

	const editListing = () => {
		Axios.post("http://3.8.159.233:3001/UpdateMyListings", {
			amountForSale: volumeForSale,
			aboveOrBelow,
			percentChange: percentageDifference,
			paymentMethod1: primaryPaymentMethod,
			paymentMethod2: secondaryPaymentMethod,
			userID,
			saleID,
		  }).then((response) => {
				if (response.status === 200){
					setConfirmationMessage(response.data.message);
					setModalMode('confirmation');
				} else {
					setModalMode('error');
					setErrorMessage(response.data.message);
				}
		})
	};

	const deleteListing = () => {
		Axios.post("http://3.8.159.233:3001/DeleteMyListing", {
			saleID,
		  }).then((response) => {
			  if (response.status === 200){
					setConfirmationMessage(response.data.message);
					setDeleteModalMode('confirmation');
			  } else {
					setDeleteModalMode('error');
				 	setErrorMessage(response.data.message);
			  }
		})
	};

	const confirmDeletion = () => {
		openDeleteModal(false);
		setDeleteModalMode('initial');
		window.location.reload(true);
	}

	const confirmEditing = () => {
		openEditModal(false);
		setModalMode('initial');
		window.location.reload(true);
	}

	useEffect(() => {
		getUserListings();
	}, []);

	const navigate = useNavigate();

  	return (
		<PageBody className={`d-flex position-relative ${userListings.length === 0 ? 'align-items-center' : 'align-items-start'}`}>
			<div className="container d-flex justify-content-center py-5 flex-column">
			{isLoading && <LoadingState />}
			{userListings.length === 0 && (
				<div className="d-flex align-items-center justify-content-center flex-column">
					<MissingIcon className="material-icons mb-3">manage_search</MissingIcon>
					<Heading bold size="24px" className="mb-4">No Listings Found</Heading>
					<PrimaryButton text="Create Listing" onClick={ () => navigate('/Sell') } />
				</div>
			)}
			<div className="col-12 col-lg-6 col-xl-9">
				{userListings.map((val, index) => (
					<TradeCard val={val} withoutButton solGbp={solGbp} currency={currency} key={index}>
						<div className="col-3 d-flex align-items-end justify-content-end">
							<CardActionButton onClick={ () => openEditModal(val) } title="Edit">
								<i className="material-icons edit">edit</i>
							</CardActionButton>
							<CardActionButton onClick={ () => openDeleteModal(val) } title="Delete">
								<i className="material-icons delete">clear</i>
							</CardActionButton>
						</div>
					</TradeCard>
				))}
			</div>
			<StyledModal
				centered
				isOpen={modal}
				toggle={openEditModal}
			>
				<ModalHeader>
					Edit Listing
				</ModalHeader>
				{modalMode === 'initial' && (
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
							<PrimaryButton text="Save" className="w-100" onClick={editListing} />
						</div>
					</ModalBody>
				)}
				{modalMode === 'confirmation' && (
					<ModalBody className="p-4">
						<CodeSentMessage className="d-flex mb-4 align-items-center flex-column">
							<i className="material-icons me-2">check_circle</i>
							<Paragraph bold size="20px" className="mb-0">
								{confirmationMessage}
							</Paragraph>
						</CodeSentMessage>
						<PrimaryButton
							text="OK"
							className="w-100"
							onClick={ confirmEditing }
						/>
					</ModalBody>
				)}
				{modalMode === 'error' && (
					<ModalBody className="p-4">
						<CodeSentMessage error className="d-flex mb-4 align-items-center flex-column">
							<i className="material-icons me-2">cancel</i>
							<Paragraph bold size="20px" className="mb-0">
								{errorMessage}
							</Paragraph>
						</CodeSentMessage>
						<PrimaryButton
							text="OK"
							className="w-100"
							onClick={ null }
						/>
					</ModalBody>
				)}
			</StyledModal>
			<StyledModal
				centered
				isOpen={deleteModal}
				toggle={openDeleteModal}
			>
				<ModalHeader>Permenantly delete this listing?</ModalHeader>
				{deleteModalMode === 'initial' && (
					<ModalBody>
						<div className="row">
							<div className="col-6">
								<InlineButton className="cancel" onClick={openDeleteModal}>Cancel</InlineButton>
							</div>
							<div className="col-6">
								<InlineButton className="delete" onClick={deleteListing}>Delete Listing</InlineButton>
							</div>
						</div>
					</ModalBody>
				)}
				{deleteModalMode === 'error' && (
					<ModalBody className="p-4">
						<CodeSentMessage error className="d-flex mb-4 align-items-center flex-column">
							<i className="material-icons me-2">cancel</i>
							<Paragraph bold size="20px" className="mb-0">
								{errorMessage}
							</Paragraph>
						</CodeSentMessage>
						<PrimaryButton
							text="OK"
							className="w-100"
							onClick={ null }
						/>
					</ModalBody>
				)}
				{deleteModalMode === 'confirmation' && (
					<ModalBody className="p-4">
						<CodeSentMessage className="d-flex mb-4 align-items-center flex-column">
							<i className="material-icons me-2">check_circle</i>
							<Paragraph bold size="20px" className="mb-0">
								{confirmationMessage}
							</Paragraph>
						</CodeSentMessage>
						<PrimaryButton
							text="OK"
							className="w-100"
							onClick={ confirmDeletion }
						/>
					</ModalBody>
				)}
			</StyledModal>
			</div>
    	</PageBody>
  );
}

export default MyListings;
