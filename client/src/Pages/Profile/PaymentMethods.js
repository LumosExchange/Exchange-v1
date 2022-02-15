import React, { useState, useEffect, useRef } from "react";
import Heading from "../../Components/Heading";
import PrimaryButton, { InlineButton, InvisibleButton } from "../../Components/Buttons";
import styled, { css } from "styled-components";
import Axios from "axios";
import {
  ContentTab,
  ProfileTabLink,
  Tabs,
} from "../../Components/Profile";
import {
  FormInput,
  PageBody,
  InlineInput,
  StyledDropdown,
  StyledLabel,
} from "../../Components/FormInputs";
import Paragraph from "../../Components/Paragraph";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { CodeSentMessage } from "../ChangePassword";



const getUserPaymentMethods = () => {
	Axios.all([
		Axios.post(`http://localhost:3001/getUkBankDetails`), 
		Axios.post(`http://localhost:3001/getEUBankDetails`),
		Axios.post(`http://localhost:3001/getInterBankDetails`),
		Axios.post(`http://localhost:3001/getPaypalDetails`),
		Axios.post(`http://localhost:3001/getSkrillDetails`),
	  ])
	  .then(Axios.spread((UK, EU, Inter, PP, SK) => {
		// output of req.
		 const dataObject1 = {UK, EU, Inter, PP, SK};
		 
		//const dataObject1 = createDataObject1(UK, EU, Inter, PP, SK);
	//	console.log('data1', data1, 'data2', data2, 'data3', data3, 'data4', data4, 'data5', data5)
		console.log(dataObject1);
	  }));

}

const fakeUserPaymentMethods = [
	{
        type: "card",
        name: "Primary Card",
        number: "0123456789101112",
        account: "12345678",
        sort: "01-02-03",
        ccv: "069",
		nameOnCard: "Mr John Smith",
		cardExpiration: "01/02",
		cardPostalCode: "ABC123",
    },
    {
        type: "ukbank",
        name: "UK Bank Account",
        account: "123456",
        sort: "123456",
    },
    {
		type: "eubank",
		name: "EU Bank Account",
		bankName: "Lloyds Bank",
		bic: "BINAADADXXX",
		iban: "CY170020012800000012005276002",
  	},
	{
        type: "intbank",
        name: "International Bank Account",
        bankName: "Lloyds Bank",
		bankCity: "London",
		bankCountry: "United Kingdom",
		bic: "BINAADADXXX",
		payeeName: "Mr John Smith",
		interBankName: "Santender Plc",
		interBankCity: "Lisbon",
		interBankCountry: "Portugal",
		interBankAccountNumber: "0123456789",
		interBankRoutingNumber: "123456789",
    },
    {
        type: "paypal",
        name: "PayPal",
        email: "thisEmail@gmai.com"
    },
	{
        type: "skrill",
        name: "Skrill",
        email: "thisEmail@gmail.com"
    },
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

	.showError {
		color: ${theme.colors.invalid};
	}

	.edit {
		color: ${theme.colors.primary_cta};
	}
`);

const StyledModal = styled(Modal)(({ theme }) => css`
	.modal-content {
		border: 1px solid ${theme.colors.panel_accent};
		background: ${theme.colors.modal_bg};
		color: ${theme.colors.text_primary};
	}
	.modal-body{
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

const AddBankButton = styled(InvisibleButton)(({ theme }) => css`
	.inner {
		background: ${theme.colors.panel_accent};

		p, i { color: ${theme.colors.text_primary} };

		&:hover, &:focus {
			i.arrow { color:  ${theme.colors.primary_cta}; }
		}
	}
`);

const PaymentDetails = styled.span(({ theme }) => css`
	color: ${theme.colors.text_secondary};
	padding-left: 15px;
`);

const formatString = (e) => {
	var inputChar = String.fromCharCode(e.keyCode);
	var code = e.keyCode;
	var allowedKeys = [8];
	if (allowedKeys.indexOf(code) !== -1) {
	  return;
	}
  
	e.target.value = e.target.value.replace(
	  /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
	).replace(
	  /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
	).replace(
	  /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
	).replace(
	  /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
	).replace(
	  /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
	).replace(
	  /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
	).replace(
	  /\/\//g, '/' // Prevent entering more than 1 `/`
	);
}

const StyledBackIcon = styled.i(({ theme }) => css`
	color: ${theme.colors.primary_cta};
`);

const PaymentMethods = () => {

	// Modal Controls
	const [modalMode, setModalMode] = useState("initial")
    const [modal, setModal] = useState(false);

	// Set Credit/Debit Cards
	const [nameOnCard, setNameOnCard] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [cardExpiration, setCardExpiration] = useState("");
	const [cardCvc, setCardCvc] = useState("");
	const [cardPostalCode, setCardPostalCode] = useState("");

	// Set Bank Accounts
	const [sortCode1, setSortCode1] = useState("");
	const [sortCode2, setSortCode2] = useState("");
	const [sortCode3, setSortCode3] = useState("");
	const [accountNumber, setAccountNumber] = useState("");
	
	const sortCode = sortCode1 + sortCode2 + sortCode3;

	// Set EU Bank Accounts
	const [bankName, setBankName] = useState("");
	const [IBAN, setIBAN] = useState("");
	const [BIC, setBIC] = useState("");

	// Set Int Back Accounts
	const [bankCity, setBankCity] = useState("");
	const [bankCountry, setBankCountry] = useState("");
	const [payeeName, setPayeeName] = useState("");
	const [interBankCity, setInterBankCity] = useState("");
	const [interBankCountry, setInterBankCountry] = useState("");
	const [interBankAccountNumber, setInterBankAccountNumber] = useState("");
	const [interBankRoutingNumber, setInterBankRoutingNumber] = useState("");
	const [interBankName, setInterBankName] = useState("");

	// PayPal & Skrill
	const [paypalEmail, setPayPalEmail] = useState("");
	const [skrillEmail, setSkrillEmail] = useState("");

	// Response Handling
	const [confirmationMessage, setConfirmationMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const ShowAddedPaymentMethods = () => {
		const [userPaymentMethods, setUserPaymentMethods] = useState([]);
	
		const getUserPaymentMethods = () => {
			Axios.post("http://localhost:3001/getInterBankDetails", {
			}).then((response) => {
			  console.log('get payment methods fired');
				  setUserPaymentMethods(response?.data);
				  console.log(userPaymentMethods, 'user payment methods');
			});
		}

		const openEditModal = (data) => {
			setModal(!modal);
			console.log(data, 'data passed through');

			if (data.type === "ukbank"){
				setAccountNumber(data.account);
				setSortCode1(data.sort.split("-", 3)[0]);
				setSortCode2(data.sort.split("-", 3)[1]);
				setSortCode3(data.sort.split("-", 3)[2]);
				setModalMode("ukbank");
			}

			if (data.type === "paypal"){
				setPayPalEmail(data.email);
				setModalMode("paypal");
			}

			if (data.type === "skrill"){
				setSkrillEmail(data.email);
				setModalMode("skrill");
			}

			if (data.type === "eubank"){
				setIBAN(data.iban);
				setBIC(data.bic);
				setBankName(data.bankName);
				setModalMode("eubank");
			}

			if (data.type === "card"){
				setNameOnCard(data.nameOnCard);
				setCardExpiration(data.cardExpiration);
				setCardCvc(data.ccv);
				setCardPostalCode(data.cardPostalCode);
				setCardNumber(data.number);
				setModalMode("card");
			}

			if (data.type === "intbank"){
				setBankName(data.bankName);
				setBankCity(data.bankCity);
				setBankCountry(data.bankCountry);
				setBIC(data.bic);
				setPayeeName(data.payeeName);
				setInterBankName(data.interBankName);
				setInterBankCity(data.interBankCity);
				setInterBankCountry(data.interBankCountry);
				setInterBankAccountNumber(data.interBankAccountNumber);
				setInterBankRoutingNumber(data.interBankRoutingNumber);
				setModalMode("intbank");
			}
		}
		
		return (
			<React.Fragment>
			{fakeUserPaymentMethods.map((data) => (
				<PaymentMethodCard className="p-4 mb-3 d-flex align-items-center row">
					<div className="col-12 d-flex col-lg-11">
					{convertMethodToIcon(data.type)}
						<Heading
							size="20px"
							className="mb-0 ms-2"
						>
							{data.name}
							<PaymentDetails>
								{data.account || data.iban || data.email}
							</PaymentDetails>
						</Heading>
					</div>
					<div className="col-12 col-lg-1 d-flex">
						<InvisibleButton
							className="me-2"
							title="Edit"
							onClick={ () => openEditModal(data) }
						>
							<i className="material-icons edit">edit</i>
						</InvisibleButton>
						<InvisibleButton title="Remove">
							<i className="material-icons showError">clear</i>
						</InvisibleButton>
					</div>
				</PaymentMethodCard>
			))}
			</React.Fragment>
		);
	}
	
	const resetValues = () => {
		setSortCode1('');
		setSortCode2('');
		setSortCode3('');
		setAccountNumber('');
		setIBAN('');
		setBankName('');
		setBIC('');
		setSkrillEmail('');
		setPayPalEmail('');
		setNameOnCard('');
		setCardNumber('');
		setCardExpiration('');
		setCardCvc('');
		setCardPostalCode('');
	}

    const toggle = () => {
		setModal(!modal);

		if (modalMode === "intbankPage2"){
			setModalMode("intbank");
		} else {
			setModalMode("initial");
			resetValues()
		}
	}

	const goBack = () => {
		if (modalMode === "intbankPage2"){
			setModalMode("intbank");
		} else {
			setModalMode("initial");
			resetValues()
		}	
	}

	const addCard = () => {
		Axios.post("http://localhost:3001/RegisterCard", {
			nameOnCard,
			cardExpiration,
			cardCvc,
			cardPostalCode,
			cardNumber,
		}).then((response) => {
			console.log(response, 'response');
			setModal(!modal);
			setModalMode('initial');
			resetValues()
		})
	}

	const addUKBank = () => {
		Axios.post("http://localhost:3001/RegisterUkBank", {
			sortCode,
			accountNumber
		}).then((response) => {
			console.log(response, 'response');
			setModal(!modal);
			setModalMode('initial');
			resetValues()
		})
	}

	const addEUBank = () => {
		Axios.post("http://localhost:3001/RegisterEUBank", {
			bankName,
			IBAN,
			BIC,
		}).then((response) => {
			if (response.status === 200){
				setConfirmationMessage(response.data.message);
				setModalMode('confirmation');
			} else {
				setErrorMessage(response.data.message);
			}
		})
	}

	const addIntBank = () => {
		Axios.post("http://localhost:3001/RegisterInternationalBank", {
			bankName,
			bankCity,
			bankCountry,
			BIC,
			payeeName,
			interBankName,
			interBankCity,
			interBankCountry,
			interBankAccountNumber,
			interBankRoutingNumber,
		}).then((response) => {
			console.log(response, 'response');
			setModal(!modal);
			setModalMode('initial');
			resetValues()
		})
	}

	const addPayPal = () => {
		Axios.post("http://localhost:3001/RegisterPaypal", {
			paypalEmail,
		}).then((response) => {
			if (response.status === 200){
				setConfirmationMessage(response.data.message);
				setModalMode('confirmation');
			} else {
				setErrorMessage(response.data.message);
			}
		})
	}

	const addSkrill = () => {
		Axios.post("http://localhost:3001/RegisterSkrill", {
			skrillEmail,
		}).then((response) => {
			console.log(response, 'response');
			setModal(!modal);
			setModalMode('initial');
			resetValues()
		})
	}

	const reloadPayments = () => {
		window.location.reload(true);
	}

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
							<InlineButton onClick={toggle}>
								Add a Payment Method</InlineButton>
						</div>
					</div>
					<div className="d-flex p-4 row">
						<ShowAddedPaymentMethods />
					</div>
				</div>
			</div>
			<button onClick={getUserPaymentMethods}></button>
			<StyledModal
				centered
				isOpen={modal}
				toggle={toggle}
				>
				{modalMode !== 'confirmation' && (
					<ModalHeader className="d-flex align-items-center">
						{modalMode !== "initial" && (
							<InvisibleButton
								onClick={() => goBack() }
								className="d-flex align-items-center"
							>
								<StyledBackIcon className="material-icons">arrow_back</StyledBackIcon>
							</InvisibleButton>
						)}
						<div>
						{(
							modalMode === "initial" && 'Add a Payment Method')
							|| (modalMode === "ukbank" && 'Add UK Bank Account')
							|| (modalMode === "eubank" && 'Add EU Bank Account')
							|| (modalMode === "intbank" && 'Add International Bank Account (1/2)')
							|| (modalMode === "intbankPage2" && 'Add International Bank Account (2/2)')
							|| (modalMode === "card" && 'Add Credit/Debit Card')
							|| (modalMode === "paypal" && 'Add PayPal Account')
							|| (modalMode === "skrill" && 'Add Skrill Account'
						)}
						</div>
					</ModalHeader>
				)}
				{modalMode === 'initial' && (
					<ModalBody className="row">
						<AddBankButton onClick={() => setModalMode("card")} className="mb-2">
							<div className="col-12 p-4 rounded d-flex justify-content-between align-items-center inner">
								<div className="d-flex">
									<i className="material-icons me-2 d-flex align-items-center">credit_card</i>
									<Paragraph size="20px" className="mb-0">Add Credit/Debit Card</Paragraph>
								</div>
								<i className="material-icons arrow">arrow_forward</i>
							</div>
						</AddBankButton>
						<AddBankButton onClick={() => setModalMode("ukbank")} className="mb-2">
							<div className="col-12 p-4 rounded d-flex justify-content-between align-items-center inner">
								<div className="d-flex">
									<i className="material-icons me-2 d-flex align-items-center">account_balance</i>
									<Paragraph size="20px" className="mb-0">Add UK Bank Account</Paragraph>
								</div>
								<i className="material-icons arrow">arrow_forward</i>
							</div>
						</AddBankButton>
						<AddBankButton onClick={() => setModalMode("eubank")} className="mb-2">
							<div className="col-12 p-4 rounded d-flex justify-content-between align-items-center inner">
								<div className="d-flex">
									<i className="material-icons me-2 d-flex align-items-center">account_balance</i>
									<Paragraph size="20px" className="mb-0">Add EU Bank Account</Paragraph>
								</div>
								<i className="material-icons arrow">arrow_forward</i>
							</div>
						</AddBankButton>
						<AddBankButton onClick={() => setModalMode("intbank")} className="mb-2">
							<div className="col-12 p-4 rounded d-flex justify-content-between align-items-center inner">
								<div className="d-flex">
									<i className="material-icons me-2 d-flex align-items-center">account_balance</i>
									<Paragraph size="20px" className="mb-0">Add International Bank Account</Paragraph>
								</div>
								<i className="material-icons arrow">arrow_forward</i>
							</div>
						</AddBankButton>
						<AddBankButton onClick={() => setModalMode("paypal")} className="mb-2">
							<div className="col-12 p-4 rounded d-flex justify-content-between align-items-center inner">
								<div className="d-flex">
									<i className="material-icons me-2 d-flex align-items-center">mail_outline</i>
									<Paragraph size="20px" className="mb-0">Add PayPal Account</Paragraph>
								</div>
								<i className="material-icons arrow">arrow_forward</i>
							</div>
						</AddBankButton>
						<AddBankButton onClick={() => setModalMode("skrill")} className="mb-2">
							<div className="col-12 p-4 rounded d-flex justify-content-between align-items-center inner">
								<div className="d-flex">
									<i className="material-icons me-2 d-flex align-items-center">mail_outline</i>
									<Paragraph size="20px" className="mb-0">Add Skrill Account</Paragraph>
								</div>
								<i className="material-icons arrow">arrow_forward</i>
							</div>
						</AddBankButton>
					</ModalBody>
				)}
				{modalMode === 'card' && (
					<ModalBody className="p-4">
						<form>
						<div className="col-12 mb-4">
							<StyledLabel
								padding="0 0 10px 0"
								bold
								htmlFor="cardName"
							>
								Name on Card
							</StyledLabel>
							<FormInput
								type="text"
								id="cardName"
								value={nameOnCard}
								name="cardName"
								placeholder="Enter account number"
								onChange={(e) => {
									setNameOnCard(e.target.value);
								}}
								className="w-100"
							/>
						</div>
						<div className="col-12 mb-4 row">
							<div className="col-4">
								<StyledLabel
									padding="0 0 10px 0"
									bold
									htmlFor="expiration"
								>
									Expiration
								</StyledLabel>
								<FormInput
									type="text"
									id="expiration"
									value={cardExpiration}
									name="expiration"
									placeholder="MM/YY"
									onKeyUp={(e) => {formatString(e)}}
									onChange={(e) => {
										setCardExpiration(e.target.value);
									}}
									maxLength="5"
									className="w-100"
								/>
							</div>
							<div className="col-4">
								<StyledLabel
									padding="0 0 10px 0"
									bold
									htmlFor="cvc"
								>
									CVC
								</StyledLabel>
								<FormInput
									type="text"
									id="cvc"
									value={cardCvc}
									name="cvc"
									maxLength="3"
									placeholder="123"
									onChange={(e) => {
										setCardCvc(e.target.value);
									}}
									className="w-100"
								/>
							</div>
							<div className="col-4">
								<StyledLabel
									padding="0 0 10px 0"
									bold
									htmlFor="postcode"
								>
									Postal Code
								</StyledLabel>
								<FormInput
									type="text"
									id="postcode"
									value={cardPostalCode}
									name="postcode"
									placeholder=""
									maxLength="6"
									onChange={(e) => {
										setCardPostalCode(e.target.value);
									}}
									className="w-100"
								/>
							</div>
						</div>
						<div className="col-12 mb-4">
							<StyledLabel
								padding="0 0 10px 0"
								bold
								htmlFor="cardNumber"
							>
								Card Number
							</StyledLabel>
							<FormInput
								type="text"
								id="cardNumber"
								value={cardNumber}
								name="cardName"
								placeholder="Enter account number"
								onChange={(e) => {
									setCardNumber(e.target.value);
								}}
								className="w-100"
							/>
						</div>
						<div className="col-12">
							<PrimaryButton
								text="Save"
								className="w-100"
								disabled={ (nameOnCard.length === 0 || cardExpiration.length < 5) || (cardCvc.length < 3) || (cardPostalCode.length < 6)}
								onClick={ () => addCard }
							/>
						</div>
						</form>
					</ModalBody>
				)}
				{modalMode === 'ukbank' && (
					<ModalBody className="p-4">
						<form>
						<div className="col-12 mb-3 row">
							<div className="col-12">
								<StyledLabel
									padding="0 0 10px 0"
									bold
									htmlFor="sort-part-1"
								>
									Sort Code
								</StyledLabel>
							</div>
							<div className="col-3">
								<FormInput
									type="tel"
									id="sort-part-1"
									value={sortCode1}
									name="sort-part-1"
									placeholder=""
									onChange={(e) => {
										setSortCode1(e.target.value);
									}}
									onInput={(e) => { e.target.value = e.target.value.slice(0, 2) }}
									className="w-100 text-center"
								/>
							</div>
							<div className="col-1 d-flex align-items-center">&mdash;</div>
							<div className="col-3">
								<FormInput
									type="tel"
									value={sortCode2}
									id="sort-part-2"
									name="sort-part-2"
									placeholder=""
									onChange={(e) => {
										setSortCode2(e.target.value);
									}}
									onInput={(e) => { e.target.value = e.target.value.slice(0, 2) }}
									className="w-100 text-center"
									
								/>
							</div>
							<div className="col-1 d-flex align-items-center">&mdash;</div>
							<div className="col-3">
								<FormInput
									type="tel"
									onInput={(e) => { e.target.value = e.target.value.slice(0, 2) }}
									value={sortCode3}
									id="sort-part-3"
									maxLength="2"
									name="sort-part-3"
									placeholder=""
									onChange={(e) => {
										setSortCode3(e.target.value);
									}}
									className="w-100 text-center"
								/>
							</div>
						</div>
						<div className="col-12 mb-4">
							<StyledLabel
								padding="0 0 10px 0"
								bold
								htmlFor="accountNumber"
							>
								Account Number
							</StyledLabel>
							<FormInput
								type="text"
								id="accountNumber"
								value={accountNumber}
								name="accountNumber"
								placeholder="Enter account number"
								maxLength="8"
								onChange={(e) => {
									setAccountNumber(e.target.value);
								}}
								className="w-100"
						/>
						</div>
						<div className="col-12">
							<PrimaryButton
								text="Save"
								className="w-100"
								disabled={ (sortCode.length > 6 || sortCode.length < 6) || (accountNumber.length < 8)}
								onClick={ () => addUKBank }
							/>
						</div>
						</form>
					</ModalBody>
				)}
				{modalMode === 'eubank' && (
					<ModalBody className="p-4">
						<div className="col-12 mb-3">
							<StyledLabel
								padding="0 0 10px 0"
								bold
								htmlFor="bankName"
							>
								Bank Name
							</StyledLabel>
							<FormInput
								type="text"
								id="bankName"
								name="bankName"
								value={bankName}
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
								htmlFor="IBAN"
							>
								IBAN {IBAN.length > 0 && <span className={IBAN.length > 32 && 'showError'}> - {IBAN.length}/32</span>}
							</StyledLabel>
							<FormInput
								type="text"
								id="IBAN"
								name="IBAN"
								value={IBAN}
								maxLength="32"
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
								htmlFor="BIC"
							>
								BIC {BIC.length > 0 && <span className={BIC.length > 11 && 'showError'}> - {BIC.length}/11</span>}
							</StyledLabel>
							<FormInput
								type="text"
								id="BIC"
								name="BIC"
								value={BIC}
								placeholder="Enter BIC/SWIFT"
								maxLength="11"
								onChange={(e) => {
									setBIC(e.target.value);
								}}
								className="w-100"
							/>
						</div>
						<div className="col-12">
							<PrimaryButton
								text="Save"
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
				{modalMode === 'intbank' && (
					<ModalBody className="p-4">
						<div className="col-12 mb-3">
							<StyledLabel
								padding="0 0 10px 0"
								bold
								htmlFor="bankName"
							>
								Bank Name
							</StyledLabel>
							<FormInput
								type="text"
								id="bankName"
								value={bankName}
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
								htmlFor="bankCity"
							>
								Bank City
							</StyledLabel>
							<FormInput
								type="text"
								id="bankCity"
								name="bankCity"
								value={bankCity}
								placeholder="Enter Bank City"
								onChange={(e) => {
									setBankCity(e.target.value);
								}}
								className="w-100"
							/>
						</div>
						<div className="col-12 mb-3">
							<StyledLabel
								padding="0 0 10px 0"
								bold
								htmlFor="bankCountry"
							>
								Bank Country
							</StyledLabel>
							<FormInput
								type="text"
								id="bankCountry"
								name="bankCountry"
								value={bankCountry}
								placeholder="Enter Bank Country"
								onChange={(e) => {
									setBankCountry(e.target.value);
								}}
								className="w-100"
							/>
						</div>
						<div className="col-12 mb-3">
							<StyledLabel
								padding="0 0 10px 0"
								bold
								htmlFor="BIC"
							>
								Bank BIC/SWIFT code
							</StyledLabel>
							<FormInput
								type="text"
								id="BIC"
								name="BIC"
								value={BIC}
								placeholder="Enter BIC/SWIFT"
								onChange={(e) => {
									setBIC(e.target.value);
								}}
								className="w-100"
							/>
						</div>
						<div className="col-12 mb-4">
							<StyledLabel
								padding="0 0 10px 0"
								bold
								htmlFor="payeeName"
							>
								Payee Name
							</StyledLabel>
							<FormInput
								type="text"
								id="payeeName"
								name="payeeName"
								value={payeeName}
								placeholder="Enter Payee Name"
								onChange={(e) => {
									setPayeeName(e.target.value);
								}}
								className="w-100"
							/>
						</div>
						<div className="col-12">
							<PrimaryButton
								text="Next"
								className="w-100"
								onClick={ () => setModalMode("intbankPage2")}
							/>
						</div>
					</ModalBody>
				)}
				{modalMode === "intbankPage2" && (
					<ModalBody className="p-4">
						<div className="col-12 mb-4">
							<StyledLabel
								padding="0 0 10px 0"
								bold
								htmlFor="intermediateBankName"
							>
								Intermediate Bank Name
							</StyledLabel>
							<FormInput
								type="text"
								id="intermediateBankName"
								name="intermediateBankName"
								value={interBankName}
								placeholder="Intermediate Bank Name"
								onChange={(e) => {
									setInterBankName(e.target.value);
								}}
								className="w-100"
							/>
						</div>
						<div className="col-12 mb-4">
							<StyledLabel
								padding="0 0 10px 0"
								bold
								htmlFor="intermediateBankCity"
							>
								Intermediate Bank City
							</StyledLabel>
							<FormInput
								type="text"
								id="intermediateBankCity"
								name="intermediateBankCity"
								value={interBankCity}
								placeholder="Intermediate Bank City"
								onChange={(e) => {
									setInterBankCity(e.target.value);
								}}
								className="w-100"
							/>
						</div>
						<div className="col-12 mb-4">
							<StyledLabel
								padding="0 0 10px 0"
								bold
								htmlFor="intermediateBankCountry"
							>
								Intermediate Bank Country
							</StyledLabel>
							<FormInput
								type="text"
								id="intermediateBankCountry"
								name="intermediateBankCountry"
								value={interBankCountry}
								placeholder="Intermediate Bank Country"
								onChange={(e) => {
									setInterBankCountry(e.target.value);
								}}
								className="w-100"
							/>
						</div>
						<div className="col-12 mb-4">
							<StyledLabel
								padding="0 0 10px 0"
								bold
								htmlFor="intermediateBankAccountNumber"
							>
								Intermediate Bank Account Number
							</StyledLabel>
							<FormInput
								type="text"
								id="intermediateBankAccountNumber"
								name="intermediateBankAccountNumber"
								value={interBankAccountNumber}
								placeholder="Intermediate Bank Account Number"
								onChange={(e) => {
									setInterBankAccountNumber(e.target.value);
								}}
								className="w-100"
							/>
						</div>
						<div className="col-12 mb-4">
							<StyledLabel
								padding="0 0 10px 0"
								bold
								htmlFor="intermediateBankRoutingNumber"
							>
								Intermediate ABA/Routing Number
							</StyledLabel>
							<FormInput
								type="text"
								id="intermediateBankRoutingNumber"
								name="intermediateBankRoutingNumber"
								value={interBankRoutingNumber}
								placeholder="Intermediate ABA/Routing Number"
								onChange={(e) => {
									setInterBankRoutingNumber(e.target.value);
								}}
								className="w-100"
							/>
						</div>
						<div className="col-12">
							<PrimaryButton
								text="Save"
								className="w-100"
								disabled={
									interBankName.length === 0
									|| interBankCity.length === 0
									|| interBankCountry.length === 0
									|| interBankAccountNumber.length === 0
									|| interBankRoutingNumber.length === 0
								}
								onClick={ addIntBank }
							/>
							<Paragraph className="showError">{errorMessage}</Paragraph>
						</div>
					</ModalBody>
				)}
				{modalMode === "paypal" && (
					<ModalBody className="p-4">
						<form>
							<div className="col-12 mb-3">
								<StyledLabel
									padding="0 0 10px 0"
									bold
									htmlFor="email"
								>
									PayPal Email
								</StyledLabel>
								<FormInput
									type="text"
									id="email"
									name="email"
									value={paypalEmail}
									placeholder="Enter PayPal Email"
									onChange={(e) => {
										setPayPalEmail(e.target.value);
									}}
									className="w-100"
							/>
							</div>
							<div className="col-12">
								<PrimaryButton
									text="Save"
									className="w-100"
									disabled={ paypalEmail.length === 0}
									onClick={
										event => {
											event.preventDefault();
											addPayPal()
										}
									}
								/>
								<Paragraph className="showError">{errorMessage}</Paragraph>
							</div>
						</form>
					</ModalBody>
				)}
				{modalMode === "skrill" && (
					<ModalBody className="p-4">
						<form>
							<div className="col-12 mb-3">
								<StyledLabel
									padding="0 0 10px 0"
									bold
									htmlFor="email"
								>
									Skrill Email
								</StyledLabel>
								<FormInput
									type="text"
									id="email"
									name="email"
									value={skrillEmail}
									placeholder="Enter Skrill Email"
									onChange={(e) => {
										setSkrillEmail(e.target.value);
									}}
									className="w-100"
							/>
							</div>
							<div className="col-12">
								<PrimaryButton
									text="Save"
									className="w-100"
									disabled={ skrillEmail.length === 0}
									onClick={
										event => {
											event.preventDefault();
											addSkrill()
										}
									}
								/>
							</div>
							<Paragraph className="showError">{errorMessage}</Paragraph>
						</form>
					</ModalBody>
				)}
				{modalMode === "confirmation" && (
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
							onClick={ reloadPayments }
						/>
					</ModalBody>
				)}
				</StyledModal>
			</ContentTab>
		</div>
		</PageBody>
	);
};

export default PaymentMethods;
