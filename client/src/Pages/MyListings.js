import React, { useState } from "react";
import styled, { css } from "styled-components";
import { PageBody, FormInput } from "../Components/FormInputs";
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

const MyListings = () => {
  const [walletExpanded, expandWallet] = useState(false);
  const [rewardsExpanded, expandRewards] = useState(false);

  return (
		<PageBody className="d-flex align-items-start">
			<div className="container d-flex justify-content-center py-5 flex-column">
				My Listings
			</div>
    	</PageBody>
  );
}

export default MyListings;
