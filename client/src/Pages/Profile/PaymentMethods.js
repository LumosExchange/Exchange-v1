import React, { useState, useEffect } from "react";
import Heading from "../../Components/Heading";
import PrimaryButton, { InlineButton, InvisibleButton } from "../../Components/Buttons";
import styled, { css } from "styled-components";
import Axios from "axios";
import {
  ContentTab,
  ProfileTabLink,
  Tabs,
} from "../../Components/Profile";
import { useNavigate } from "react-router";
import {
  FormInput,
  PageBody,
  InlineInput,
  StyledDropdown,
  StyledLabel,
} from "../../Components/FormInputs";
import Paragraph from "../../Components/Paragraph";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const userPaymentMethods = [
	{
        type: "card",
        name: "Primary Card",
        number: "0123 4567 8910 1112",
        account: "12345678",
        sort: "00-00-00",
        ccv: "069",
    },
    {
        type: "ukbank",
        name: "UK Bank Account",
        account: "12345678",
        sort: "00-00-00",
    },
    {
      type: "eubank",
      name: "EU Bank Account",
      bankName: "Lloyds Bank",
      bic: "BINAADADXXX",
      iban: "FR7630006000011234567890189",
  },
    {
        type: "paypal",
        name: "PayPal",
        email: "thisEmail@gmai.com"
    }
];

const MethodIcon = styled.i(({ theme }) => css`
	color: ${theme.colors.text_primary};
`);

const convertMethodToIcon = (type) => {
	if (type === "card"){
		return( <MethodIcon className="material-icons">credit_card</MethodIcon> )
	}
	if (type === "ukbank" || type === "eubank"){
		return <MethodIcon className="material-icons">account_balance</MethodIcon>
	}
	if (type === "paypal"){
		return <MethodIcon className="material-icons">account_balance</MethodIcon>
	}
  	else {
	  return <MethodIcon className="material-icons">account_balance_wallet</MethodIcon>
	}
}

const PaymentMethodCard = styled.div(({ theme }) => css`
	background: ${theme.colors.panel_accent};
	border-radius: 3px;
`);

const StyledModal = styled(Modal)(({ theme }) => css`
	.modal-content {
		border: 2px solid ${theme.colors.primary_cta};
		background: ${theme.colors.base_bg};
		color: ${theme.colors.text_primary};
	}
	.modal-body{
		button { color: inherit };

		.showError {
			color: ${theme.colors.invalid};
		}
	}
	.modal-title {
		display: flex;
	}
`);

// **** TODO ****
// Map type to icon
// Add remove button
// Add Payment method modal

const PaymentMethods = () => {

	const [modalMode, setModalMode] = useState("initial")
    const [modal, setModal] = useState(false);

	const resetValues = () => {
		setSortCode('');
		setAccountNumber('');
		setIBAN('');
		setBankName('');
		setBIC('');
	}

    const toggle = () => {
		setModal(!modal);
		setModalMode('initial');
		resetValues();
	}

	const goBack = () => {
		setModalMode("initial");
		resetValues()
	}


	// Set Bank Accounts
	const [sortCode, setSortCode] = useState("");
	const [accountNumber, setAccountNumber] = useState("");

	// Set EU Bank Accounts
	const [bankName, setBankName] = useState("");
	const [IBAN, setIBAN] = useState("");
	const [BIC, setBIC] = useState("");

	const addUKBank = () => {
		Axios.post("http://localhost:3001/RegisterUkBank", {
			sortCode,
			accountNumber
		}).then((response) => {
			console.log(response, 'response');
			setModal(!modal);
			setModalMode('initial');
	})}

	const addEUBank = () => {
		Axios.post("http://localhost:3001/RegisterUkBank", {
			bankName,
			IBAN,
			BIC,
		}).then((response) => {
			console.log(response, 'response');
			setModal(!modal);
			setModalMode('initial');
			setIBAN('');
			setBankName('');
			setBIC('');
	})}

  	useEffect(() => {}, []);

	return (
		<PageBody>
		<div className="container pt-5">
			<Tabs>
				<ProfileTabLink href="/Profile/Basic">Basic</ProfileTabLink>
				<ProfileTabLink href="/Profile/Security">Security</ProfileTabLink>
				<ProfileTabLink href="/Profile/KYC">KYC</ProfileTabLink>
				<ProfileTabLink href="/Profile/PaymentMethods" className="selected">Payment Methods</ProfileTabLink>
			</Tabs>
			<ContentTab className="text-white">
			<div className="d-flex p-4 row">
				<div className="col-12">
					<div className="d-flex justify-content-between align-items-center">
						<Heading size="18px" bold className="mb-0">Payment Methods</Heading>
						<div className="col-3">
							<InlineButton onClick={toggle}>Add a Payment Method</InlineButton>
						</div>
					</div>
					<div className="d-flex p-4 row">
						{userPaymentMethods.map((data) => {
							console.log(data.type);
							return (
								<PaymentMethodCard className="p-4 mb-3 d-flex align-items-center row">
									<div className="col-12 d-flex col-lg-4">
									{convertMethodToIcon(data.type)}
										<Heading
											size="20px"
											className="mb-0 ms-2"
										>
											{data.name}
										</Heading>
									</div>
									<div className="col-12 col-lg-6">
										<Paragraph className="mb-0">
											{data.account || data.iban || data.email}
										</Paragraph>
									</div>
									<div className="col-12 col-lg-2">
										<InlineButton>Edit</InlineButton>
									</div>
								</PaymentMethodCard>
							);
						})}
					</div>
				</div>
				</div>
				<StyledModal
					centered
					isOpen={modal}
					toggle={toggle}
				>
				<ModalHeader className="d-flex align-items-center">
					{modalMode !== "initial" && (
						<InvisibleButton
							onClick={() => goBack() }
							className="d-flex align-items-center"
						>
							<i className="material-icons">arrow_back</i>
						</InvisibleButton>
					)}
					<div>Add a Payment Method</div>
				</ModalHeader>
				
				{modalMode === 'initial' && (
					<ModalBody className="row">
						<InvisibleButton onClick={() => setModalMode("card")} className="mb-2" disabled>
							<div className="col-12 py-4 border rounded">
								Add Credit/Debit Card
							</div>
						</InvisibleButton>
						<InvisibleButton onClick={() => setModalMode("ukbank")} className="mb-2">
							<div className="col-12 py-4 border rounded">
								Add UK Bank Acount
							</div>
						</InvisibleButton>
						<InvisibleButton onClick={() => setModalMode("eubank")} className="mb-2">
							<div className="col-12 py-4 border rounded">
								Add EU Bank Acount
							</div>
						</InvisibleButton>
					</ModalBody>
				)}
				{modalMode === 'ukbank' && (
					<ModalBody className="p-4">
						<div className="col-12 mb-3">
							<StyledLabel
								padding="0 0 10px 0"
								bold
							>
								Sort Code
							</StyledLabel>
							<FormInput
								type="text"
								id="Code"
								name="code"
								placeholder="Enter sort code"
								onChange={(e) => {
									setSortCode(e.target.value);
								}}
								className="w-100"
						/>
						</div>
						<div className="col-12 mb-4">
							<StyledLabel
								padding="0 0 10px 0"
								bold
							>
								Account Number
							</StyledLabel>
							<FormInput
								type="text"
								id="accountNumber"
								name="accountNumber"
								placeholder="Enter account number"
								onChange={(e) => {
									setAccountNumber(e.target.value);
								}}
								className="w-100"
						/>
						</div>
						<div className="col-12">
							<PrimaryButton
								text="Add Bank Account"
								className="w-100"
								disabled={ (sortCode.length > 6) || (accountNumber.length < 8)}
								onClick={ addUKBank }
							/>
						</div>
					</ModalBody>
				)}
				{modalMode === 'eubank' && (
					<ModalBody className="p-4">
						<div className="col-12 mb-3">
							<StyledLabel
								padding="0 0 10px 0"
								bold
							>
								Bank Name
							</StyledLabel>
							<FormInput
								type="text"
								id="bankName"
								name="bankName"
								placeholder="Enter bank name"
								onChange={(e) => {
									setBankName(e.target.value);
								}}
								className="w-100"
						/>
						</div>
						<div className="col-12 mb-3">
							<StyledLabel
								padding="0 0 10px 0"
								bold
							>
								IBAN {IBAN.length > 0 && <span className={IBAN.length > 32 && 'showError'}> - {IBAN.length}/32</span>}
							</StyledLabel>
							<FormInput
								type="text"
								id="IBAN"
								name="IBAN"
								placeholder="Enter IBAN"
								onChange={(e) => {
									setIBAN(e.target.value);
								}}
								className="w-100"
							/>
						</div>
						<div className="col-12 mb-4">
							<StyledLabel
								padding="0 0 10px 0"
								bold
							>
								BIC {BIC.length > 0 && <span className={BIC.length > 11 && 'showError'}> - {BIC.length}/11</span>}
							</StyledLabel>
							<FormInput
								type="text"
								id="BIC"
								name="BIC"
								placeholder="Enter BIC/SWIFT"
								onChange={(e) => {
									setBIC(e.target.value);
								}}
								className="w-100"
							/>
						</div>
						<div className="col-12">
							<PrimaryButton
								text="Add Bank Account"
								className="w-100"
								disabled={
									(IBAN.length === 0 || IBAN.length > 32)
									|| (BIC.length > 11 || BIC.length < 8)
									|| (bankName.length === 0)
								}
								onClick={ addEUBank }
							/>
						</div>
					</ModalBody>
				)}
			</StyledModal>
			</ContentTab>
		</div>
		</PageBody>
	);
};

export default PaymentMethods;
