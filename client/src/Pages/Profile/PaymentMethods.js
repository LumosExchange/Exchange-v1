import React, { useState, useEffect, useRef } from "react";
import Heading from "../../Components/Heading";
import PrimaryButton, {
  InlineButton,
  InvisibleButton,
} from "../../Components/Buttons";
import styled, { css } from "styled-components";
import Axios from "axios";
import {
  ContentTab,
  LoadingState,
  ProfileTabLink,
  Tabs,
  ProfileTabs,
} from "../../Components/Profile";
import {
  FormInput,
  PageBody,
  InlineInput,
  StyledDropdown,
  StyledLabel,
} from "../../Components/FormInputs";
import Paragraph from "../../Components/Paragraph";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { CodeSentMessage } from "../ChangePassword";
import GradientButton from "../../Components/GradientButton";

const MethodIcon = styled.i(
  ({ theme }) => css`
    color: ${theme.colors.text_primary};
  `
);

const convertMethodToIcon = (type) => {
  if (type === "card") {
    return <MethodIcon className="material-icons">credit_card</MethodIcon>;
  }
  if (type === "ukbank" || type === "eubank") {
    return <MethodIcon className="material-icons">account_balance</MethodIcon>;
  }
  if (type === "paypal") {
    return <MethodIcon className="material-icons">account_balance</MethodIcon>;
  } else {
    return (
      <MethodIcon className="material-icons">account_balance_wallet</MethodIcon>
    );
  }
};

const PaymentMethodCard = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.panel_accent};
    border-radius: 3px;

    .showError {
      color: ${theme.colors.invalid};
    }

    .edit {
      color: ${theme.colors.primary_cta};
    }
  `
);

export const StyledModal = styled(Modal)(
  ({ theme }) => css`
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
  `
);

const AddBankButton = styled(InvisibleButton)(
  ({ theme }) => css`
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
  `
);

const PaymentDetails = styled.span(
  ({ theme }) => css`
    color: ${theme.colors.text_secondary};
    padding-left: 15px;
  `
);

const formatString = (e) => {
  var inputChar = String.fromCharCode(e.keyCode);
  var code = e.keyCode;
  var allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    return;
  }

  e.target.value = e.target.value
    .replace(
      /^([1-9]\/|[2-9])$/g,
      "0$1/" // 3 > 03/
    )
    .replace(
      /^(0[1-9]|1[0-2])$/g,
      "$1/" // 11 > 11/
    )
    .replace(
      /^([0-1])([3-9])$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
      "$1/$2" // 141 > 01/41
    )
    .replace(
      /^([0]+)\/|[0]+$/g,
      "0" // 0/ > 0 and 00 > 0
    )
    .replace(
      /[^\d\/]|^[\/]*$/g,
      "" // To allow only digits and `/`
    )
    .replace(
      /\/\//g,
      "/" // Prevent entering more than 1 `/`
    );
};

const StyledBackIcon = styled.i(
  ({ theme }) => css`
    color: ${theme.colors.primary_cta};
  `
);

const PaymentMethods = () => {
  // Modal Controls
  const [modalMode, setModalMode] = useState("initial");
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

  const [isEditing, setIsEditing] = useState(false);

  const ShowAddedPaymentMethods = () => {
    const [userPaymentMethods, setUserPaymentMethods] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteModalData, setDeleteModalData] = useState([]);
    const [deleteModalMode, setDeleteModalMode] = useState("initial");
    const [deleteConfirmationMessage, setDeleteConfirmationMessage] =
      useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [modalTitle, setModalTitle] = useState("");

    const getUserPaymentMethods = () => {
      Axios.all([
        Axios.post(`http://localhost:3001/getUKBankDetails`),
        Axios.post(`http://localhost:3001/getEUBankDetails`),
        Axios.post(`http://localhost:3001/getInterBankDetails`),
        Axios.post(`http://localhost:3001/getPaypalDetails`),
        Axios.post(`http://localhost:3001/getSkrillDetails`),
      ])
        .catch((err) => {
          if (err) {
            console.log(err, "error from getUserPaymentMethods");
          }
        })
        .then(
          Axios.spread((...responses) => {
            setUserPaymentMethods(responses);
            setIsLoading(false);
          })
        );
    };

    useEffect(() => {
      getUserPaymentMethods();
    }, []);

    const openEditModal = (data) => {
      setModal(!modal);

      if (data.type === "ukbank") {
        setIsEditing(true);
        setAccountNumber(data.account);
        setSortCode1(data.sort.slice(0, 2));
        setSortCode2(data.sort.slice(2, 4));
        setSortCode3(data.sort.slice(4, 6));
        setModalMode("ukbank");
      }

      if (data.type === "paypal") {
        setIsEditing(true);
        setPayPalEmail(data.email);
        setModalMode("paypal");
      }

      if (data.type === "skrill") {
        setIsEditing(true);
        setSkrillEmail(data.email);
        setModalMode("skrill");
      }

      if (data.type === "eubank") {
        setIsEditing(true);
        setIBAN(data.IBAN);
        setBIC(data.BIC);
        setBankName(data.bankName);
        setModalMode("eubank");
      }

      if (data.type === "card") {
        setIsEditing(true);
        setNameOnCard(data.nameOnCard);
        setCardExpiration(data.cardExpiration);
        setCardCvc(data.ccv);
        setCardPostalCode(data.cardPostalCode);
        setCardNumber(data.number);
        setModalMode("card");
      }

      if (data.type === "internationalBank") {
        setIsEditing(true);
        setBankName(data.bankName);
        setBankCity(data.bankCity);
        setBankCountry(data.bankCountry);
        setBIC(data.BIC);
        setPayeeName(data.payeeName);
        setInterBankName(data.interBankName);
        setInterBankCity(data.interBankCity);
        setInterBankCountry(data.interBankCountry);
        setInterBankAccountNumber(data.interBankAccountNumber);
        setInterBankRoutingNumber(data.interBankRoutingNumber);
        setModalMode("intbank");
      }
    };

    const toggleDelete = () => {
      setDeleteModal(!deleteModal);
    };

    const openDeleteModal = (data) => {
      setDeleteModal(!deleteModal);
      setDeleteModalData(data);
    };

    const deletePayment = () => {
      if (deleteModalData.type === "ukbank") {
        Axios.post(`http://localhost:3001/deleteUKBank`).then((response) => {
          if (response.status === 200) {
            setDeleteConfirmationMessage(response.data.message);
            setDeleteModalMode("confirmation");
          }
        });
      }

      if (deleteModalData.type === "eubank") {
        Axios.post(`http://localhost:3001/deleteEUBank`).then((response) => {
          if (response.status === 200) {
            setDeleteConfirmationMessage(response.data.message);
            setDeleteModalMode("confirmation");
          }
        });
      }

      if (deleteModalData.type === "internationalBank") {
        Axios.post(`http://localhost:3001/deleteInterBank`).then((response) => {
          if (response.status === 200) {
            setDeleteConfirmationMessage(response.data.message);
            setDeleteModalMode("confirmation");
          }
        });
      }
      if (deleteModalData.type === "paypal") {
        Axios.post(`http://localhost:3001/deletePaypalBank`).then(
          (response) => {
            if (response.status === 200) {
              setDeleteConfirmationMessage(response.data.message);
              setDeleteModalMode("confirmation");
            }
          }
        );
      }

      if (deleteModalData.type === "skrill") {
        Axios.post(`http://localhost:3001/deleteSkrillBank`).then(
          (response) => {
            if (response.status === 200) {
              setDeleteConfirmationMessage(response.data.message);
              setDeleteModalMode("confirmation");
            }
          }
        );
      }
    };

    const filteredUserPayments = userPaymentMethods.filter(
      (u) => u.data.status !== "none-added"
    );

    return (
      <div className="position-relative">
        {filteredUserPayments.length === 0 && (
          <div className="col-12 text-center mt-3">
            <Paragraph size="20px">No Payment methods added</Paragraph>
          </div>
        )}
        {filteredUserPayments.map((data, index) => (
          <PaymentMethodCard className="p-4 mb-3 d-flex align-items-center row position-relative" key={index}>
            <div className="col-12 d-flex col-lg-10">
              {convertMethodToIcon(data.data.type)}
              <Heading size="20px" className="mb-0 ms-2">
                {data.data.name}
                <PaymentDetails>
                  {data.data.account ||
                    data.data.IBAN ||
                    data.data.email ||
                    data.data.BIC}
                </PaymentDetails>
              </Heading>
            </div>
            <div className="col-12 col-lg-2 d-none d-lg-flex justify-content-end">
              <InvisibleButton
                className="me-2"
                title="Edit"
                onClick={() => openEditModal(data.data)}
              >
                <i className="material-icons edit">edit</i>
              </InvisibleButton>
              <InvisibleButton
                title="Remove"
                onClick={() => openDeleteModal(data.data)}
              >
                <i className="material-icons showError">clear</i>
              </InvisibleButton>
            </div>
            <div className="col-12 col-lg-2 d-flex d-lg-none mt-4 flex-column flex-md-row">
                <div className="col-12 col-md-3 me-3">
                <InlineButton onClick={() => openEditModal(data.data)} className="w-100">
                    Edit
                  </InlineButton>
                </div>
                <div className="col-12 col-md-3 mt-2 mt-md-0">
                  <InlineButton className="delete w-100" onClick={() => openDeleteModal(data.data)}>
                    Delete
                  </InlineButton>
                </div>
            </div>
          </PaymentMethodCard>
        ))}
        {isLoading && <LoadingState />}
        <StyledModal centered isOpen={deleteModal} toggle={toggleDelete}>
          <ModalHeader>Remove Payment Method</ModalHeader>
          {deleteModalMode === "initial" && (
            <ModalBody>
              <Paragraph size="18px">
                Are you sure you want to remove {deleteModalData.name} as a
                payment method?
              </Paragraph>
              <div className="row">
                <div className="col-6">
                  <InlineButton className="cancel" onClick={toggleDelete}>
                    Cancel
                  </InlineButton>
                </div>
                <div className="col-6 mb-3">
                  <InlineButton className="delete" onClick={deletePayment}>
                    Remove
                  </InlineButton>
                </div>
              </div>
            </ModalBody>
          )}
          {deleteModalMode === "confirmation" && (
            <ModalBody className="p-4">
              <CodeSentMessage className="d-flex mb-4 align-items-center flex-column">
                <i className="material-icons me-2">check_circle</i>
                <Paragraph bold size="20px" className="mb-0">
                  {deleteConfirmationMessage}
                </Paragraph>
              </CodeSentMessage>
              <PrimaryButton
                text="OK"
                className="w-100"
                onClick={reloadPayments}
              />
            </ModalBody>
          )}
        </StyledModal>
      </div>
    );
  };

  const resetValues = () => {
    setSortCode1("");
    setSortCode2("");
    setSortCode3("");
    setAccountNumber("");
    setIBAN("");
    setBankName("");
    setBIC("");
    setSkrillEmail("");
    setPayPalEmail("");
    setNameOnCard("");
    setCardNumber("");
    setCardExpiration("");
    setCardCvc("");
    setCardPostalCode("");
  };

  const toggle = () => {
    setModal(!modal);
    setIsEditing(false);
    setErrorMessage("");

    if (modalMode === "intbankPage2") {
      setModalMode("intbank");
    } else {
      setModalMode("initial");
      resetValues();
    }
  };

  const goBack = () => {
    if (modalMode === "intbankPage2") {
      setModalMode("intbank");
    } else {
      setModalMode("initial");
      resetValues();
    }
  };

  // Add & Edit Cards
  const addCard = () => {
    Axios.post("http://localhost:3001/RegisterCard", {
      nameOnCard,
      cardExpiration,
      cardCvc,
      cardPostalCode,
      cardNumber,
    }).then((response) => {
      setModal(!modal);
      setModalMode("initial");
      resetValues();
    });
  };

  const editCard = () => {
    Axios.post("http://localhost:3001/UpdateCard", {
      nameOnCard,
      cardExpiration,
      cardCvc,
      cardPostalCode,
      cardNumber,
    }).then((response) => {
      setModal(!modal);
      setModalMode("initial");
      resetValues();
    });
  };

  // Add & Edit UK Bank
  const addUKBank = () => {
    Axios.post("http://localhost:3001/RegisterUkBank", {
      sortCode,
      accountNumber,
    }).then((response) => {
      if (!response.data.code) {
        setConfirmationMessage(response.data.message);
        setModalMode("confirmation");
      } else {
        setErrorMessage(response.data.sqlMessage);
      }
    });
  };

  const editUKBank = () => {
    Axios.post("http://localhost:3001/UpdateUkBank", {
      sortCode,
      accountNumber,
    }).then((response) => {
      if (!response.data.code) {
        setConfirmationMessage(response.data.message);
        setModalMode("confirmation");
      } else {
        setErrorMessage(response.data.sqlMessage);
      }
    });
  };

  // Add & Edit EU Bank
  const addEUBank = () => {
    Axios.post("http://localhost:3001/RegisterEUBank", {
      bankName,
      IBAN,
      BIC,
    }).then((response) => {
      if (!response.data.code) {
        setConfirmationMessage(response.data.message);
        setModalMode("confirmation");
      } else {
        setErrorMessage(response.data.sqlMessage);
      }
    });
  };

  const editEUBank = () => {
    Axios.post("http://localhost:3001/UpdateEUBank", {
      bankName,
      IBAN,
      BIC,
    }).then((response) => {
      if (!response.data.code) {
        setConfirmationMessage(response.data.message);
        setModalMode("confirmation");
      } else {
        setErrorMessage(response.data.sqlMessage);
      }
    });
  };

  // Add & Edit International Bank
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
      if (!response.data.code) {
        setConfirmationMessage(response.data.message);
        setModalMode("confirmation");
      } else {
        setErrorMessage(response.data.sqlMessage);
      }
    });
  };

  const editIntBank = () => {
    Axios.post("http://localhost:3001/UpdateInternationalBank", {
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
      if (!response.data.code) {
        setConfirmationMessage(response.data.message);
        setModalMode("confirmation");
      } else {
        setErrorMessage(response.data.sqlMessage);
      }
    });
  };

  // Add & Edit International Bank
  const addPayPal = () => {
    Axios.post("http://localhost:3001/RegisterPaypal", {
      paypalEmail,
    }).then((response) => {
      if (!response.data.code) {
        setConfirmationMessage(response.data.message);
        setModalMode("confirmation");
      } else {
        setErrorMessage(response.data.sqlMessage);
      }
    });
  };

  const editPayPal = () => {
    Axios.post("http://localhost:3001/UpdatePaypal", {
      paypalEmail,
    }).then((response) => {
      if (!response.data.code) {
        setConfirmationMessage(response.data.message);
        setModalMode("confirmation");
      } else {
        setErrorMessage(response.data.sqlMessage);
      }
    });
  };

  // Add & Edit International Bank
  const addSkrill = () => {
    Axios.post("http://localhost:3001/RegisterSkrill", {
      skrillEmail,
    }).then((response) => {
      if (!response.data.code) {
        setConfirmationMessage(response.data.message);
        setModalMode("confirmation");
      } else {
        setErrorMessage(response.data.sqlMessage);
      }
    });
  };

  const editSkrill = () => {
    Axios.post("http://localhost:3001/UpdateSkrill", {
      skrillEmail,
    }).then((response) => {
      console.log(response, "response from editSkrill");
      if (!response.data.code) {
        setConfirmationMessage(response.data.message);
        setModalMode("confirmation");
      } else {
        setErrorMessage(response.data.sqlMessage);
      }
    });
  };

  const reloadPayments = () => {
    window.location.reload(true);
  };

  useEffect(() => {}, []);

  return (
    <PageBody>
      <div className="container pt-5">
        <ProfileTabs selected="PaymentMethods" />
        <ContentTab className="text-white">
          <div className="d-flex p-4 row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center flex-column flex-md-row">
                <div className="col-12 col-md-6">
                <Heading size="18px" bold className="mb-0">
                  Payment Methods
                </Heading>
                </div>
                <div className="col-12 col-md-6 col-lg-3 mt-2 mt-md-0">
                  <InlineButton onClick={toggle}>
                    Add a Payment Method
                  </InlineButton>
              </div>
              </div>
              <div className="d-flex p-4 row">
                <ShowAddedPaymentMethods />
              </div>
            </div>
          </div>
          <StyledModal centered isOpen={modal} toggle={toggle}>
            {modalMode !== "confirmation" && (
              <ModalHeader className="d-flex align-items-center">
                {modalMode !== "initial" && !isEditing && (
                  <InvisibleButton
                    onClick={() => goBack()}
                    className="d-flex align-items-center"
                  >
                    <StyledBackIcon className="material-icons">
                      arrow_back
                    </StyledBackIcon>
                  </InvisibleButton>
                )}
                <div>
                  {(modalMode === "initial" && "Add a Payment Method") ||
                    (modalMode === "ukbank" &&
                      (isEditing
                        ? "Edit UK Bank Account"
                        : "Add UK Bank Account")) ||
                    (modalMode === "eubank" &&
                      (isEditing
                        ? "Edit EU Bank Account"
                        : "Add EU Bank Account")) ||
                    (modalMode === "intbank" &&
                      (isEditing
                        ? "Edit International Bank (1/2)"
                        : "Add International Bank Account (1/2)")) ||
                    (modalMode === "intbankPage2" &&
                      (isEditing
                        ? "Edit Internation Bank (2/2)"
                        : "Add International Bank Account (2/2)")) ||
                    (modalMode === "card" &&
                      (isEditing
                        ? "Edit Credit/Debit Card"
                        : "Add Credit/Debit Card")) ||
                    (modalMode === "paypal" &&
                      (isEditing
                        ? "Edit PayPal Account"
                        : "Add PayPal Account")) ||
                    (modalMode === "skrill" &&
                      (isEditing
                        ? "Edit Skrill Account"
                        : "Add Skrill Account"))}
                </div>
              </ModalHeader>
            )}
            {modalMode === "initial" && (
              <ModalBody className="row">
                <AddBankButton
                  onClick={() => setModalMode("ukbank")}
                  className="mb-2"
                >
                  <div className="col-12 p-4 rounded d-flex justify-content-between align-items-center inner">
                    <div className="d-flex">
                      <i className="material-icons me-2 d-flex align-items-center">
                        account_balance
                      </i>
                      <Paragraph size="20px" className="mb-0">
                        Add UK Bank Account
                      </Paragraph>
                    </div>
                    <i className="material-icons arrow">arrow_forward</i>
                  </div>
                </AddBankButton>
                <AddBankButton
                  onClick={() => setModalMode("eubank")}
                  className="mb-2"
                >
                  <div className="col-12 p-4 rounded d-flex justify-content-between align-items-center inner">
                    <div className="d-flex">
                      <i className="material-icons me-2 d-flex align-items-center">
                        account_balance
                      </i>
                      <Paragraph size="20px" className="mb-0">
                        Add EU Bank Account
                      </Paragraph>
                    </div>
                    <i className="material-icons arrow">arrow_forward</i>
                  </div>
                </AddBankButton>
                <AddBankButton
                  onClick={() => setModalMode("intbank")}
                  className="mb-2"
                >
                  <div className="col-12 p-4 rounded d-flex justify-content-between align-items-center inner">
                    <div className="d-flex">
                      <i className="material-icons me-2 d-flex align-items-center">
                        account_balance
                      </i>
                      <Paragraph size="20px" className="mb-0">
                        Add International Bank Account
                      </Paragraph>
                    </div>
                    <i className="material-icons arrow">arrow_forward</i>
                  </div>
                </AddBankButton>
                <AddBankButton
                  onClick={() => setModalMode("paypal")}
                  className="mb-2"
                >
                  <div className="col-12 p-4 rounded d-flex justify-content-between align-items-center inner">
                    <div className="d-flex">
                      <i className="material-icons me-2 d-flex align-items-center">
                        mail_outline
                      </i>
                      <Paragraph size="20px" className="mb-0">
                        Add PayPal Account
                      </Paragraph>
                    </div>
                    <i className="material-icons arrow">arrow_forward</i>
                  </div>
                </AddBankButton>
                <AddBankButton
                  onClick={() => setModalMode("skrill")}
                  className="mb-2"
                >
                  <div className="col-12 p-4 rounded d-flex justify-content-between align-items-center inner">
                    <div className="d-flex">
                      <i className="material-icons me-2 d-flex align-items-center">
                        mail_outline
                      </i>
                      <Paragraph size="20px" className="mb-0">
                        Add Skrill Account
                      </Paragraph>
                    </div>
                    <i className="material-icons arrow">arrow_forward</i>
                  </div>
                </AddBankButton>
              </ModalBody>
            )}
            {modalMode === "card" && (
              <ModalBody className="p-4">
                <form>
                  <div className="col-12 mb-4">
                    <StyledLabel padding="0 0 10px 0" bold htmlFor="cardName">
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
                        onKeyUp={(e) => {
                          formatString(e);
                        }}
                        onChange={(e) => {
                          setCardExpiration(e.target.value);
                        }}
                        maxLength="5"
                        className="w-100"
                      />
                    </div>
                    <div className="col-4">
                      <StyledLabel padding="0 0 10px 0" bold htmlFor="cvc">
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
                      <StyledLabel padding="0 0 10px 0" bold htmlFor="postcode">
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
                    <StyledLabel padding="0 0 10px 0" bold htmlFor="cardNumber">
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
                      className="w-100"
                      disabled={
                        nameOnCard.length === 0 ||
                        cardExpiration.length < 5 ||
                        cardCvc.length < 3 ||
                        cardPostalCode.length < 6
                      }
                      text={isEditing ? "Save Changes" : "Add Card"}
                      onClick={() => {
                        isEditing ? editCard() : addCard();
                      }}
                    />
                    {errorMessage && (
                      <Paragraph
                        className="showError mt-3 mb-0"
                        size="18px"
                        bold
                      >
                        Error: {errorMessage}
                      </Paragraph>
                    )}
                  </div>
                </form>
              </ModalBody>
            )}
            {modalMode === "ukbank" && (
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
                        maxLength="2"
                        placeholder=""
                        onChange={(e) => {
                          setSortCode1(e.target.value);
                        }}
                        className="w-100 text-center"
                      />
                    </div>
                    <div className="col-1 d-flex align-items-center">
                      &mdash;
                    </div>
                    <div className="col-3">
                      <FormInput
                        type="tel"
                        value={sortCode2}
                        id="sort-part-2"
                        name="sort-part-2"
                        maxLength="2"
                        placeholder=""
                        onChange={(e) => {
                          setSortCode2(e.target.value);
                        }}
                        className="w-100 text-center"
                      />
                    </div>
                    <div className="col-1 d-flex align-items-center">
                      &mdash;
                    </div>
                    <div className="col-3">
                      <FormInput
                        type="tel"
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
                      text={isEditing ? "Update UK Bank" : "Add UK Bank"}
                      className="w-100"
                      disabled={
                        sortCode.length > 6 ||
                        sortCode.length < 6 ||
                        accountNumber.length < 8
                      }
                      onClick={() => {
                        isEditing ? editUKBank() : addUKBank();
                      }}
                    />
                    {errorMessage && (
                      <Paragraph
                        className="showError mt-3 mb-0"
                        size="18px"
                        bold
                      >
                        Error: {errorMessage}
                      </Paragraph>
                    )}
                  </div>
                </form>
              </ModalBody>
            )}
            {modalMode === "eubank" && (
              <ModalBody className="p-4">
                <div className="col-12 mb-3">
                  <StyledLabel padding="0 0 10px 0" bold htmlFor="bankName">
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
                  <StyledLabel padding="0 0 10px 0" bold htmlFor="IBAN">
                    IBAN{" "}
                    {IBAN.length > 0 && (
                      <span className={IBAN.length > 32 && "showError"}>
                        {" "}
                        - {IBAN.length}/32
                      </span>
                    )}
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
                  <StyledLabel padding="0 0 10px 0" bold htmlFor="BIC">
                    BIC{" "}
                    {BIC.length > 0 && (
                      <span className={BIC.length > 11 && "showError"}>
                        {" "}
                        - {BIC.length}/11
                      </span>
                    )}
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
                    text={isEditing ? "Update EU Bank" : "Add EU Bank"}
                    className="w-100"
                    disabled={
                      IBAN.length === 0 ||
                      IBAN.length > 32 ||
                      BIC.length > 11 ||
                      BIC.length < 8 ||
                      bankName.length === 0
                    }
                    onClick={() => {
                      isEditing ? editEUBank() : addEUBank();
                    }}
                  />
                  {errorMessage && (
                    <Paragraph className="showError mt-3 mb-0" size="18px" bold>
                      Error: {errorMessage}
                    </Paragraph>
                  )}
                </div>
              </ModalBody>
            )}
            {modalMode === "intbank" && (
              <ModalBody className="p-4">
                <div className="col-12 mb-3">
                  <StyledLabel padding="0 0 10px 0" bold htmlFor="bankName">
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
                  <StyledLabel padding="0 0 10px 0" bold htmlFor="bankCity">
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
                  <StyledLabel padding="0 0 10px 0" bold htmlFor="bankCountry">
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
                  <StyledLabel padding="0 0 10px 0" bold htmlFor="BIC">
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
                  <StyledLabel padding="0 0 10px 0" bold htmlFor="payeeName">
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
                    onClick={() => setModalMode("intbankPage2")}
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
                    text={
                      isEditing
                        ? "Update International Bank"
                        : "Add International Bank"
                    }
                    className="w-100"
                    disabled={
                      interBankName.length === 0 ||
                      interBankCity.length === 0 ||
                      interBankCountry.length === 0 ||
                      interBankAccountNumber.length === 0 ||
                      interBankRoutingNumber.length === 0
                    }
                    onClick={() => {
                      isEditing ? editIntBank() : addIntBank();
                    }}
                  />
                  {errorMessage && (
                    <Paragraph className="showError mt-3 mb-0" size="18px" bold>
                      Error: {errorMessage}
                    </Paragraph>
                  )}
                </div>
              </ModalBody>
            )}
            {modalMode === "paypal" && (
              <ModalBody className="p-4">
                <form>
                  <div className="col-12 mb-3">
                    <StyledLabel padding="0 0 10px 0" bold htmlFor="email">
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
                      text={isEditing ? "Edit Paypal" : "Add PayPal"}
                      className="w-100"
                      disabled={paypalEmail.length === 0}
                      onClick={(event) => {
                        event.preventDefault();
                        isEditing ? editPayPal() : addPayPal();
                      }}
                    />
                    {errorMessage && (
                      <Paragraph
                        className="showError mt-3 mb-0"
                        size="18px"
                        bold
                      >
                        Error: {errorMessage}
                      </Paragraph>
                    )}
                  </div>
                </form>
              </ModalBody>
            )}
            {modalMode === "skrill" && (
              <ModalBody className="p-4">
                <form>
                  <div className="col-12 mb-3">
                    <StyledLabel padding="0 0 10px 0" bold htmlFor="email">
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
                      text={isEditing ? "Edit Skrill" : "Add Skrill"}
                      className="w-100"
                      disabled={skrillEmail.length === 0}
                      onClick={(event) => {
                        event.preventDefault();
                        isEditing ? editSkrill() : addSkrill();
                      }}
                    />
                  </div>
                  {errorMessage && (
                    <Paragraph className="showError mt-3 mb-0" size="18px" bold>
                      Error: {errorMessage}
                    </Paragraph>
                  )}
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
                  onClick={reloadPayments}
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
