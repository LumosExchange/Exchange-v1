import React, { useState, useEffect, useRef } from "react";
import Heading from "../../Components/Heading";
import PrimaryButton, { InlineButton, InvisibleButton } from "../../Components/Buttons";
import styled, { css } from "styled-components";
import Axios from "axios";
import { ContentTab, LoadingState, ProfileTabLink, Tabs, ProfileTabs } from "../../Components/Profile";
import { FormInput, PageBody, InlineInput, StyledDropdown, StyledLabel } from "../../Components/FormInputs";
import Paragraph from "../../Components/Paragraph";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { CodeSentMessage } from "../ChangePassword";
import Card from "../../Components/Card";

export const StyledModal = styled(Modal)(({ theme }) => css`
	max-width: 700px;

	.modal-content {
		border: 1px solid ${theme.colors.panel_accent};
		background: ${theme.colors.modal_bg};
		color: ${theme.colors.text_primary};
	}
	.modal-body {
		.showError {
			color: ${theme.colors.invalid};
		}
	}
	.modal-header {
		border: 0;
	}
	.modal-title {
		display: flex;
	}
`);

const FakeWalletData = [
	{
		walletID: 1,
		address: "GAECQos3deHaqzB1EDvPJcqaGVvG9xqDuFYU239KAsXV",
	},
	{
		walletID: 2,
		address: "GAECQos3deHaqzB1EDvPJcqaGVvG9xqDuFYU239KAsXV",
	},
];

const WalletCard = styled(Card)(({ theme }) => css`
	border-radius: 3px;

	.remove {
		color: ${theme.colors.invalid};
	}

	.edit {
		color: ${theme.colors.primary_cta};
	}
`);

const StyledCode = styled.code(({ theme }) => css`
	font-size: 18px;
	color: ${theme.colors.primary_cta};
`);

const ValidationBase = styled.div(({ theme }) => css`
	.valid {
		color: ${theme.colors.valid};
	}
	.invalid {
		color: ${theme.colors.invalid};
	}
`);

const InlineLabelValidation = ({ walletAddress, min, max }) => (
	<ValidationBase className="d-flex justify-content-between">
		<StyledLabel padding="0" bold htmlFor="walletAddress">
			Address
		</StyledLabel>
		<Paragraph
			size="18px"
			bold
			className={
				(walletAddress.length > 44 || walletAddress.length < 32)
				? 'invalid' : 'valid'
			}
		>
			{walletAddress.length} / 44
		</Paragraph>
	</ValidationBase>
);

const Wallets = ({ userID }) => {
	// Modal Controls
	const [modalMode, setModalMode] = useState("initial");
	const [addWalletModal, setAddWalletModal] = useState(false);
	const [deleteWalletModal, setDeleteWalletModal] = useState(false);

	const [editModalMode, setEditModalMode] = useState("initial");
	const [editWalletModal, setEditWalletModal] = useState(false);
	const [deleteModalMode, setDeleteModalMode] = useState("initial");
	const [deletingWalletID, setDeletingWalletID] = useState(0);

	// Wallet Addresses
	const [wallets, setWallets] = useState([]);
	const [walletAddress, setWalletAddress] = useState("");
	const [editingWalletAddress, setEditingWalletAddress] = useState("");
	const [deletingWalletAddress, setDeletingWalletAddress] = useState("");

	// Response Handling
	const [confirmationMessage, setConfirmationMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const [isEditing, setIsEditing] = useState(false);

	const toggleAddWallet = () => {
		setAddWalletModal(!addWalletModal);
	};

	const toggleEditWallet = (wallet) => {
		setEditWalletModal(!editWalletModal);
		setEditingWalletAddress(wallet);
	};

	const toggleDeleteWallet = (wallet) => {
		setDeleteWalletModal(!deleteWalletModal);
		setDeletingWalletAddress(wallet.address);
		setDeletingWalletID(wallet.walletID);
	};

	const addWallet = () => {
		console.log(walletCount, 'wallet count in addwallet');
		Axios.post("http://localhost:3001/AddWallet", {
			walletID: walletCount,
			walletAddress,
		}).then((response) => {
			if (!response.data.code) {
				setConfirmationMessage(response.data.message);
				setModalMode("confirmation");
			} else {
				setErrorMessage(response.data.sqlMessage);
			}
		});
	};

	const editWallet = () => {
		Axios.post("http://localhost:3001/EditWallet", {
			walletAddress,
		}).then((response) => {
			console.log(response, "response from editSkrill");
			if (!response.data.code) {
				setConfirmationMessage(response.data.message);
				setEditModalMode("confirmation");
			} else {
				setErrorMessage(response.data.sqlMessage);
			}
		});
	};

	const deleteWallet = () => {
		Axios.post("http://localhost:3001/DeleteWallet", {
			walletID: deletingWalletID,
			walletAddress: deletingWalletAddress,
		}).then((response) => {
			if (!response.data.code) {
				setConfirmationMessage(response.data.message);
				setDeleteModalMode("confirmation");
			} else {
				setErrorMessage(response.data.sqlMessage);
			}
		});
	};

	const getWalletAddresses = () => {
		Axios.post("http://localhost:3001/GetWallets", {
			userID,
		}).then((response) => {
			console.log(response, "response from /GetWallets");
			if (!response.data.code) {
				const formattedWallets = response.data.filter(fw => fw.address.length > 1);
				console.log(formattedWallets);
				setWallets(formattedWallets);
			} else {
				setErrorMessage(response.data.sqlMessage);
			}
		});
	};

	const walletCount = wallets.length + 1;
	console.log(walletCount, 'amount of wallets');

	const reloadPayments = () => {
		window.location.reload(true);
	};

	useEffect(() => {
		getWalletAddresses();
	}, []);

	return (
		<PageBody>
			<div className="container pt-5">
				<ProfileTabs selected="Wallets" />
				<ContentTab className="text-white">
					<div className="d-flex p-4 row">
						<div className="col-12">
							<div className="d-flex justify-content-between align-items-center">
								<Heading size="18px" bold className="mb-0">
									Wallet Addresses
								</Heading>
								<div className="col-3">
									<InlineButton onClick={toggleAddWallet}>Add a Wallet</InlineButton>
								</div>
							</div>
							{wallets.length > 0 ? (
							<div className="d-flex py-4 flex-column">
								{wallets.map((wallet, index) => (
									<WalletCard className="p-4 mb-3 d-flex justify-content-between w-100 align-items-center" key={index + 1}>
										<div className="d-flex">
											<i className="material-icons me-2">wallet</i>
											<Paragraph className="mb-0" size="18px">
												{wallet.address}
											</Paragraph>
										</div>
										<div className="d-flex">
											<InvisibleButton onClick={() => toggleEditWallet(wallet.address)}>
												<i className="material-icons edit">edit</i>
											</InvisibleButton>
											<InvisibleButton onClick={() => toggleDeleteWallet(wallet)}>
												<i className="material-icons remove">delete</i>
											</InvisibleButton>
										</div>
									</WalletCard>
								))}
							</div>
							) : (
								<div className="col-12 mt-3">
									<Paragraph size="18px">No Wallets Added</Paragraph>
								</div>
							)}

						</div>
					</div>
					{/* ------ Add Wallets ------ */}
					<StyledModal centered isOpen={addWalletModal} toggle={toggleAddWallet}>
						{modalMode !== "confirmation" && (
							<ModalHeader className="d-flex align-items-center">Add Wallet Address</ModalHeader>
						)}
						{modalMode === "initial" && (
							<ModalBody>
								<InlineLabelValidation walletAddress={walletAddress} />
								<FormInput
									type="text"
									id="walletAddress"
									value={walletAddress}
									name="walletAddress"
									placeholder="Enter Wallet Address"
									onChange={(e) => {
										setWalletAddress(e.target.value);
									}}
									className={`
										w-100 ${(walletAddress.length > 44 || walletAddress.length < 32)
										&& 'invalid'}
									`}
								/>
								<PrimaryButton
									className="w-100 mt-3"
									text="Add Wallet"
									onClick={() => addWallet()}
									disabled={(walletAddress.length > 44) || (walletAddress.length < 32)}
								/>
							</ModalBody>
						)}
						{modalMode === "confirmation" && <ModalBody>Wallet Added</ModalBody>}
					</StyledModal>
					{/* ------ Edit Wallets ------ */}
					<StyledModal centered isOpen={editWalletModal} toggle={toggleEditWallet}>
						{editModalMode !== "confirmation" && (
							<ModalHeader className="d-flex align-items-center">Edit Wallet Address</ModalHeader>
						)}
						{editModalMode === "initial" && (
							<ModalBody>
								<StyledLabel padding="0" bold htmlFor="editingWalletAddress">
									Address
								</StyledLabel>
								<FormInput
									type="text"
									id="editingWalletAddress"
									value={editingWalletAddress}
									name="editingWalletAddress"
									placeholder="Enter Wallet Address"
									onChange={(e) => {
										setEditingWalletAddress(e.target.value);
									}}
									className="w-100"
								/>
								<PrimaryButton className="w-100 mt-3" text="Update Wallet" onClick={null} />
							</ModalBody>
						)}
						{editModalMode === "confirmation" && <ModalBody>Wallet Added</ModalBody>}
					</StyledModal>
					{/* ------ Delete Wallets ------ */}
					<StyledModal centered isOpen={deleteWalletModal} toggle={toggleDeleteWallet}>
						{deleteModalMode !== "confirmation" && (
							<ModalHeader className="d-flex align-items-center">Remove Wallet Address</ModalHeader>
						)}
						{deleteModalMode === "initial" && (
							<ModalBody className="pt-0">
								<div className="d-flex align-items-center mb-3 overflow-auto">
									<i className="material-icons me-2">wallet</i>
									<StyledCode>{deletingWalletAddress}</StyledCode>
								</div>
								<div className="row">
									<div className="col-6">
										<InlineButton className="cancel" onClick={toggleDeleteWallet}>
											Cancel
										</InlineButton>
									</div>
									<div className="col-6">
										<InlineButton className="delete" onClick={() => deleteWallet() }>
											Remove Wallet
										</InlineButton>
									</div>
								</div>
							</ModalBody>
						)}
						{deleteModalMode === "confirmation" && <ModalBody>Wallet Added</ModalBody>}
					</StyledModal>
				</ContentTab>
			</div>
		</PageBody>
	);
};

export default Wallets;
