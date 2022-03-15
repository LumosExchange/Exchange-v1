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
import Card from '../../Components/Card';

export const StyledModal = styled(Modal)(({ theme }) => css`
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
	.modal-dialog {
		max-width: 700px;
	}
`);

const FakeWalletData = [
	{'address': 'GAECQos3deHaqzB1EDvPJcqaGVvG9xqDuFYU239KAsXV'},
	{'address': 'GAECQos3deHaqzB1EDvPJcqaGVvG9xqDuFYU239KAsXV'},
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

const Wallets = ({ userID }) => {
  // Modal Controls
  const [modalMode, setModalMode] = useState("initial");
  const [addWalletModal, setAddWalletModal] = useState(false);

  const [editModalMode, setEditModalMode] = useState("initial");
  const [editWalletModal, setEditWalletModal] = useState(false);

  // Wallet Addresses
  const [wallets, setWallets] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");
  const [editingWalletAddress, setEditingWalletAddress] = useState("");

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

  const addWallet= () => {
    Axios.post("http://localhost:3001/RegisterWallet", {
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
    Axios.post("http://localhost:3001/UpdateWallet", {
      walletAddress,
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

  const getWalletAddresses = () => {
    Axios.post("http://localhost:3001/GetWallets", {
      userID,
    }).then((response) => {
      console.log(response, "response from /GetWallets");
      if (!response.data.code) {
        setWallets(response.data);
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
        <ProfileTabs selected="Wallets" />
        <ContentTab className="text-white">
          <div className="d-flex p-4 row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <Heading size="18px" bold className="mb-0">
                  Wallet Addresses
                </Heading>
                <div className="col-3">
                  <InlineButton onClick={toggleAddWallet}>
                    Add a Wallet
                  </InlineButton>
                </div>
              </div>
              <div className="d-flex p-4 row">
              {FakeWalletData.map((wallet) => (
                <WalletCard className="p-4 mb-3 d-flex justify-content-between" >
					<div className="d-flex">
						<i className="material-icons me-2">wallet</i>
						<Paragraph className="mb-0" size="18px">{wallet.address}</Paragraph>
					</div>
					<div className="d-flex">
						<InvisibleButton onClick={() => toggleEditWallet(wallet.address)}>
							<i className="material-icons edit">edit</i>
						</InvisibleButton>
						<InvisibleButton>
							<i className="material-icons remove">delete</i>
						</InvisibleButton>
					</div>
				</WalletCard>
              ))}
              </div>
            </div>
          </div>
		  {/* ------ Add Wallets ------ */}
          <StyledModal centered isOpen={addWalletModal} toggle={toggleAddWallet}>
            {modalMode !== "confirmation" && (
              <ModalHeader className="d-flex align-items-center">
                  Add Wallet Address
              </ModalHeader>
            )}
            {modalMode === "initial" && (
              <ModalBody>
                  <StyledLabel padding="0" bold htmlFor="walletAddress">Address</StyledLabel>
                  <FormInput
                      type="text"
                      id="walletAddress"
                      value={walletAddress}
                      name="walletAddress"
                      placeholder="Enter Wallet Address"
                      onChange={(e) => {
                        setWalletAddress(e.target.value);
                      }}
                      className="w-100"
                    />
                  <PrimaryButton
                    className="w-100 mt-3"
                    text="Add Wallet"
                    onClick={null}
                  />
              </ModalBody>
            )}
            {modalMode === "confirmation" && (
              <ModalBody>
                Wallet Added
              </ModalBody>
            )}
          </StyledModal>
		  {/* ------ Edit Wallets ------ */}
		  <StyledModal centered isOpen={editWalletModal} toggle={toggleEditWallet}>
            {modalMode !== "confirmation" && (
              <ModalHeader className="d-flex align-items-center">
                  Edit Wallet Address
              </ModalHeader>
            )}
            {editModalMode === "initial" && (
              <ModalBody>
                  <StyledLabel padding="0" bold htmlFor="editingWalletAddress">Address</StyledLabel>
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
                  <PrimaryButton
                    className="w-100 mt-3"
                    text="Update Wallet"
					onClick={null}
                  />
              </ModalBody>
            )}
            {editModalMode === "confirmation" && (
              <ModalBody>
                Wallet Added
              </ModalBody>
            )}
          </StyledModal>
        </ContentTab>
      </div>
    </PageBody>
  );
};

export default Wallets;
