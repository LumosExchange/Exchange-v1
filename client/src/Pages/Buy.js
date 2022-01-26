import React, { useState, useEffect } from "react";
import styled, { css } from 'styled-components';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { PageBody } from "../Components/FormInputs";
import Card from "../Components/Card";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import GradientButton from "../Components/GradientButton";
import PrimaryButton from "../Components/Buttons";

var TRADEID = "";
var F4S = 0;
var AOB = "";
var PER = "";
var USERID = "";

const CRYPTO_KIN = 'KIN';
const CRYPTO_SOL = 'SOL';
const CRYPTO_LRA = 'LRA';
const CRYPTO_COPE = 'COPE';

const ToggleButton = styled.button(({ theme }) => css`
	background: ${theme.colors.six9Grey};
	padding: 10px 0;
	border: 2px solid ${theme.colors.yellow};
	color: ${theme.colors.white};
	font-size: 18px;

	&.left { border-radius: 10px 0 0px 10px };
	&.right { border-radius: 0 10px 10px 0 };

	&.selected {
		background: ${theme.colors.yellow};
		font-family: 'THICCCBOI-BOLD';
		color: ${theme.colors.black};
	}
`);

const QuadButton = styled.button(({ theme }) => css`
	background: ${theme.colors.six9Grey};
	padding: 10px 0;
	border: 0;
	border-radius: 10px;
	color: ${theme.colors.white};
	font-size: 18px;

	&.selected {
		background: ${theme.colors.yellow};
		font-family: 'THICCCBOI-BOLD';
		color: ${theme.colors.black};
	}
`);

const Buy = () => {
	const [allListings, setAllListings] = useState([]);
	const [selectedCrypto, selectCrypto] = useState(CRYPTO_SOL);
	const [selectedMode, selectMode] = useState('buy');
	const [selectedCurrency, selectCurrency] = useState('£');

	console.log(selectedCrypto, 'selected crypto');

  	const navigate = useNavigate();
 

  //pass variables we need here

  const handleClick = () => {
    navigate("/Offer", {
      state: {
        id: 1,
        tradeID: TRADEID,
        solForSale: F4S,
        aboveOrBelow: AOB,
        percentage: PER,
        userID: USERID,
      },
     

    });
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllListings").then((response) => {
      setAllListings(response.data);
    });
  }, []);

  return (
		<PageBody>
			<div className="container">
				<div className="row pt-5">
					<div className="col-12 col-md-4">
						<Card radius="10px" className="p-4">
						<div className="d-flex">
							<div className="col-md-6">
								<ToggleButton
									onClick={() => selectMode('buy')}
									className={`left w-100 ${selectedMode === 'buy' && 'selected'}`}
								>
									Buy
								</ToggleButton>
							</div>
							<div className="col-md-6">
								<ToggleButton
									onClick={() => selectMode('sell')}
									className={`right w-100 ${selectedMode === 'sell' && 'selected'}`}
								>
									Sell
								</ToggleButton>
							</div>
						</div>
							<div className="d-flex flex-wrap mt-3">
								<div className="col-12">
									<Heading size="16px">Crypto</Heading>
								</div>
								<div className="col-6 d-flex">
									<QuadButton
										className={`
											w-100 me-1 mb-1 d-flex justify-content-center
											${selectedCrypto === CRYPTO_SOL && 'selected'}
										`}
										onClick={ () => selectCrypto(CRYPTO_SOL) }
									>
										<i className="material-icons me-2">token</i>
										<span>{CRYPTO_SOL}</span>
									</QuadButton>
								</div>
								<div className="col-6 d-flex">
									<QuadButton
										className={`
											w-100 me-1 mb-1 d-flex justify-content-center
											${selectedCrypto === CRYPTO_KIN && 'selected'}
										`}
										onClick={ () => selectCrypto(CRYPTO_KIN) }
									>
										<i className="material-icons me-2">token</i>
										<span>{CRYPTO_KIN}</span>
									</QuadButton>
								</div>
								<div className="col-6 d-flex">
									<QuadButton
										className={`
											w-100 me-1 mb-1 d-flex justify-content-center
											${selectedCrypto === CRYPTO_COPE && 'selected'}
										`}
										onClick={ () => selectCrypto(CRYPTO_COPE) }
									>
										<i className="material-icons me-2">token</i>
										<span>{CRYPTO_COPE}</span>
									</QuadButton>
								</div>
								<div className="col-6 d-flex">
									<QuadButton
										className={`
											w-100 me-1 mb-1 d-flex justify-content-center
											${selectedCrypto === CRYPTO_LRA && 'selected'}
										`}
										onClick={ () => selectCrypto(CRYPTO_LRA) }
									>
										<i className="material-icons me-2">token</i>
										<span>{CRYPTO_LRA}</span>
									</QuadButton>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-12 col-md-8">
						<Heading size="26px">
							<span style={{ textTransform: 'capitalize' }}>{selectedMode} </span>
							{selectedCrypto} from these Sellers</Heading>
						{allListings.map((val) => (
							<Card className="p-4 mb-3">
								<div className="row">
									<div className="col-3">
										<Heading size="24px">userName</Heading>
									</div>
									<div className="col-3">United States</div>
									<div className="col-3">Oceanside, CA</div>
									<div className="col-3">
										<Heading size="24px" color="yellow">
											{selectedCurrency}{val.amountForSale}
										</Heading>
									</div>
									<div className="col-3">110 Trades</div>
									<div className="col-3">Paypal</div>
									<div className="col-3">
										<Paragraph size="18px">
											{val.percentChange}%
											{' '}{val.aboveOrBelow}{' '}market
										</Paragraph>
									</div>
									<div className="col-3">
										<GradientButton text="Buy" fontSize="24px" padding="4px 20px" className="w-100" />
									</div>
								</div>
							</Card>
						))}
					</div>
				</div>
			</div>
		</PageBody>
  );
}

export default Buy;
