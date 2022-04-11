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
import PhantomIcon from '../../Images/phantom-icon-purple.svg';
import SlopeIcon from '../../Images/slope-finance-icon.png';
import SolflareIcon from '../../Images/solflare-icon.svg';
import * as web3 from '@solana/web3.js';

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

const WalletCard = styled(Card)(
	({ theme }) => css`
		border-radius: 3px;

		.remove {
			color: ${theme.colors.invalid};
		}

		.edit {
			color: ${theme.colors.primary_cta};
		}

		img {
			&.walletIcon {
				width: 35px;
				padding-right: 10px;
			}
		}

		i {
			&.walletIcon {
				font-size: 35px;
				padding-right: 10px;
			}
		}
	`
);

export const StyledCode = styled.code(({ theme }) => css`
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

const AddWalletButton = styled(InvisibleButton)(({ theme }) => css`
	.inner {
		background: ${theme.colors.panel_accent};

		p,
		i {
			color: ${theme.colors.text_primary};
		}

		&:hover,
		&:focus {
			i.arrow {
				color: ${theme.colors.primary_cta};
			}
		}
	}
`);

const CustomWalletIcon = styled.img`
	width: 40px;
	min-width: 40px;
	margin-right: 10px;
`;

const Wallets = () => {
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
	const [editingWalletID, setEditingWalletID] = useState("");
	const [deletingWalletAddress, setDeletingWalletAddress] = useState("");

	// Response Handling
	const [confirmationMessage, setConfirmationMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const [isEditing, setIsEditing] = useState(false);
	
	const [pubKey, setPubKey] = useState("");


	const getProvider = async () => {
		if ("solana" in window) {
			await window.solana.connect();
			const provider = window.solana;
			if (provider.isPhantom) {
				console.log("Is Phantom installed? ", provider.isPhantom);
				return provider;
			} if (provider.isSolflare){
				console.log("Is Solflare installed? ", provider.isSolflare);
				return provider;
			} if (provider.isSlope) {
				console.log("Is Slope installed? ", provider.isSlope);
				return provider;
			}
			} else {
				//Please install a sol wallet 
				window.open("https://www.phantom.app", "_blank");
			}	
	};

	const getWallet = async () => {
		try {
		  const wallet = typeof window !== 'undefined' && window.solana;
		  await wallet.connect();
		  
		} catch (err) {
		  console.log('err: ', err)
		}
	};

	const connectPhantomWallet = async() => {
		try {
		window.solana.connect();
		await window.solana.on("connect", () => addWallet("phantom", window.solana.publicKey.toString()));
			//setPubKey(window.solana.publicKey.toString());	
			console.log(window.solana.publicKey.toString(), 'public key');
		} catch {
			console.log("error");
		}
	};

	const connectSolflareWallet = async() => {
		try {
			window.solflare.connect();
			window.solflare.on("connect", () => addWallet("solflare", window.solana.publicKey.toString()));
			
		} catch {
		}
	};

	const connectSlopeWallet = async() => {
		try {
			window.slope.connect();
			window.slope.on("Connect", () => addWallet("slope", window.solana.publicKey.toString()));
		} catch {
		}
	}


	const toggleAddWallet = () => {
		setAddWalletModal(!addWalletModal);
		setWalletAddress("");
		setModalMode('initial');
	};

	const completeAddAddress = () => {
		setAddWalletModal(!addWalletModal);
		setModalMode('initial');
		reloadPayments();
	}

	const toggleEditWallet = (wallet) => {
		setEditWalletModal(!editWalletModal);
		setEditingWalletID(wallet.walletID);
		setEditingWalletAddress(wallet.address);
	};

	const toggleDeleteWallet = (wallet, index) => {
		setDeleteWalletModal(!deleteWalletModal);
		setDeletingWalletAddress(wallet.address);
		console.log(index, 'index is delete modal');
		setDeletingWalletID(index);
	};

	const completeDeleteAddress = () => {
		setAddWalletModal(!addWalletModal);
		setModalMode('initial');
		reloadPayments();
	}

	const completeEditAddress = () => {
		setDeleteWalletModal(!deleteWalletModal);
		setDeleteModalMode('initial');
		reloadPayments();
	}

	const addWallet = (type, walletAddress) => {
		console.log(type, 'type of wallet added');
		Axios.post("http://localhost:3001/AddWallet", {
			walletID: walletCount,
			walletAddress,
			type,
		}).then((response) => {
			if (!response.data.code) {
				setConfirmationMessage(response.data.message);
				setModalMode("confirmation");
			} else {
				setErrorMessage(response.data.sqlMessage);
			}
		});
	};

	const updateWallet = () => {
		Axios.post("http://localhost:3001/EditWallet", {
			walletID: editingWalletID,
			walletAddress: editingWalletAddress,
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
		Axios.post("http://localhost:3001/GetWallets").then((response) => {
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
									<WalletCard className="p-4 mb-3 d-flex justify-content-between w-100 align-items-center overflow-auto" key={index + 1}>
										<div className="d-flex">
											{
												(wallet.type === 'local' && <i className="material-icons walletIcon">wallet</i>)
												|| (wallet.type === 'phantom' && <CustomWalletIcon src={PhantomIcon} alt="Phantom" />)
												|| (wallet.type === 'slope' && <CustomWalletIcon src={SlopeIcon} alt="Slope" />)
												|| (wallet.type === 'solflare' && <CustomWalletIcon src={SolflareIcon} alt="Solflare" />)
											}
											<Paragraph className="mb-0 d-flex align-items-center" size="18px">
												{wallet.address}
											</Paragraph>
										</div>
										<div className="d-flex">
											<InvisibleButton onClick={() => toggleEditWallet(wallet)}>
												<i className="material-icons edit">edit</i>
											</InvisibleButton>
											<InvisibleButton onClick={() => toggleDeleteWallet(wallet, index + 1)}>
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
							<ModalHeader>
								{modalMode !== 'initial' && (
									<InvisibleButton onClick={() => setModalMode('initial')} className="d-flex align-items-center">
										<i className="material-icons">arrow_back</i>
									</InvisibleButton>
								)}
								Add Wallet
							</ModalHeader>
						)}
						{modalMode === "initial" && (
							<ModalBody>
								<AddWalletButton
									onClick={() => setModalMode("local")}
									className="mb-2 w-100"
								>
									<div className="col-12 p-4 rounded d-flex justify-content-between align-items-center inner">
									<div className="d-flex">
										<i className="material-icons me-2 d-flex align-items-center">
											add
										</i>
										<Paragraph size="20px" className="mb-0">
											Add Local Wallet
										</Paragraph>
									</div>
									<i className="material-icons arrow">arrow_forward</i>
									</div>
								</AddWalletButton>
								<AddWalletButton
									onClick={() => setModalMode("web3")}
									className="mb-2 w-100"
								>
									<div className="col-12 p-4 rounded d-flex justify-content-between align-items-center inner">
									<div className="d-flex">
										<i className="material-icons me-2 d-flex align-items-center">
											add
										</i>
										<Paragraph size="20px" className="mb-0">
											Add Web3 Wallet
										</Paragraph>
									</div>
									<i className="material-icons arrow">arrow_forward</i>
									</div>
								</AddWalletButton>
							</ModalBody>
						)}
						{modalMode === "local" && (
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
									onClick={() => addWallet("local")}
									disabled={(walletAddress.length > 44) || (walletAddress.length < 32)}
								/>
							</ModalBody>
						)}
						{modalMode === "web3" && (
							<ModalBody>
								<AddWalletButton
								onClick={connectPhantomWallet}
								
									className="mb-2 w-100"
								>
									<div className="col-12 p-4 rounded d-flex justify-content-between align-items-center inner">
									<div className="d-flex align-items-center">
										<CustomWalletIcon src={PhantomIcon} alt="Phantom" />
										<Paragraph size="20px" className="mb-0">
											Phantom Wallet
										</Paragraph>
									</div>
									<i className="material-icons arrow">add</i>
									</div>
								</AddWalletButton>
								<AddWalletButton
										onClick={connectSlopeWallet}
									className="mb-2 w-100"
								>
									<div className="col-12 p-4 rounded d-flex justify-content-between align-items-center inner">
									<div className="d-flex align-items-center">
										<CustomWalletIcon src={SlopeIcon} alt="Slope Wallet" />
										<Paragraph size="20px" className="mb-0">
											Slope Wallet
										</Paragraph>
									</div>
									<i className="material-icons arrow">add</i>
									</div>
								</AddWalletButton>
								<AddWalletButton
									onClick={connectSolflareWallet}
									className="mb-2 w-100"
								>
									<div className="col-12 p-4 rounded d-flex justify-content-between align-items-center inner">
									<div className="d-flex align-items-center">
										<CustomWalletIcon src={SolflareIcon} alt="Phantom" />
										<Paragraph size="20px" className="mb-0">
											Solflare Wallet
										</Paragraph>
									</div>
									<i className="material-icons arrow">add</i>
									</div>
								</AddWalletButton>
							</ModalBody>
						)}
						{modalMode === "confirmation" && (
							<ModalBody>
								<CodeSentMessage className="d-flex mb-4 align-items-center flex-column">
									<i className="material-icons me-2">check_circle</i>
									<Paragraph bold size="20px" className="mb-0">
										{confirmationMessage}
									</Paragraph>
								</CodeSentMessage>
								<PrimaryButton
									text="OK"
									onClick={completeAddAddress}
									className="w-100"
								/>
							</ModalBody>
						)}
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
								<PrimaryButton className="w-100 mt-3" text="Update Wallet" onClick={updateWallet} />
							</ModalBody>
						)}
						{editModalMode === "confirmation" && (
							<ModalBody>
								<CodeSentMessage className="d-flex mb-4 align-items-center flex-column">
									<i className="material-icons me-2">check_circle</i>
									<Paragraph bold size="20px" className="mb-0">
										{confirmationMessage}
									</Paragraph>
								</CodeSentMessage>
								<PrimaryButton
									text="OK"
									onClick={completeEditAddress}
									className="w-100"
								/>
							</ModalBody>
						)}
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
						{deleteModalMode === "confirmation" && (
							<ModalBody>
								<CodeSentMessage className="d-flex mb-4 align-items-center flex-column">
									<i className="material-icons me-2">check_circle</i>
									<Paragraph bold size="20px" className="mb-0">
										{confirmationMessage}
									</Paragraph>
								</CodeSentMessage>
								<PrimaryButton
									text="OK"
									onClick={completeDeleteAddress}
									className="w-100"
								/>
							</ModalBody>
						)}
					</StyledModal>
				</ContentTab>
			</div>
		</PageBody>
	);
};

export default Wallets;
