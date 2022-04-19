import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import CoinGecko from "coingecko-api";
import { PageBody } from "../Components/FormInputs";
import { AirDropTable } from "../Components/Tables";
import Paragraph from "../Components/Paragraph";
import { IconHelper } from './Login';
import Card from '../Components/Card';
import { LoadingState } from "../Components/Profile";
const CoinGeckoClient = new CoinGecko();

const numberWithCommas = (x) => {
	if (x.toString().startsWith("0")){
		return x;
	} else {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
};

const addPlusSigns = (x) => {
	const symbol = "+";
	if (x.toString().startsWith("-")){
		return x;
	} else {
		return symbol + x.toString();
	}
};

const convertPriceChangeToColor = (price) => {
	return price.toString().includes("-") ? "invalid" : "valid";
}

const convertPriceChangeToIcon = (price) => {
	return price.toString().includes("-") ? "arrow_drop_down" : "arrow_drop_up";
}

const convertMarketCap = (market_cap) => {
	return new Intl.NumberFormat('en-GB',
		{
			maximumSignificantDigits: 3, 
			notation: "compact",
			style: "currency",
			currency: "GBP",
			currencyDisplay: "symbol",
			currencySign: "accounting"
		})
		.format(market_cap)
}

const MobilePriceCard = styled(Card)(({ theme, border }) => css`
	border-bottom: 4px solid ${theme.colors[border]};
`);

const Prices = () => {
	const [coins, setcoins] = useState([]);
	const [isLoading, setIsLoading] = useState("");

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			const result = await CoinGeckoClient.coins.markets({ vs_currency: "gbp" });
			setcoins(result.data);
			setIsLoading(false);
		}
		fetchData();
	}, []);

	return (
		<PageBody style={{ padding: "50px 0 100px 0" }}>
			{/*      Mobile View      */}
			<div className="container py-5 d-flex d-lg-none row mx-auto">
				{isLoading && <LoadingState />}
				{coins.map((e) => (
					<MobilePriceCard key={e.id} className="d-flex p-4 col-12 mb-3 align-items-center flex-wrap" border={convertPriceChangeToColor(e.price_change_percentage_24h)}>
						<div className="d-flex justify-content-between w-100">
							<div className="d-flex align-items-center">
								<img src={e.image} alt={e.name} width="48" height="48" />
								<div className="d-flex flex-column">
									<Paragraph size="18px" className="mb-2 ms-3">
										{e.name}
									</Paragraph>
									<Paragraph size="18px" className="mb-0 ms-3 text-uppercase" color="text_secondary">
										{" "}
										{e.symbol}
									</Paragraph>
								</div>
							</div>
							<div className="d-flex flex-column">
								<Paragraph size="18px" className="mb-2 text-end">
									£{numberWithCommas(e.current_price)}
								</Paragraph>
								<Paragraph
									size="18px"
									className="mb-0"
									color={convertPriceChangeToColor(e.price_change_percentage_24h)}
								>
									{addPlusSigns(e.price_change_percentage_24h)} %
								</Paragraph>
							</div>
						</div>
					</MobilePriceCard>
				))}
			</div>
			{/*      Desktop View      */}
			<div className="container py-5 d-none d-lg-block">
				<AirDropTable className="w-100">
					<thead>
						<tr className="border-0">
							<th scope="col">
								<Paragraph size="18px" className="mb-0" bold>
									Coin / Ticker
								</Paragraph>
							</th>
							<th scope="col">
								<Paragraph size="18px" className="mb-0" bold>
									Price (GBP)
								</Paragraph>
							</th>
							<th scope="col">
								<Paragraph size="18px" className="mb-0" bold>
									24hr change (%)
								</Paragraph>
							</th>
							<th scope="col" className="text-end">
								<Paragraph size="18px" className="mb-0" bold>
									Market Cap
								</Paragraph>
							</th>
						</tr>
					</thead>
					<tbody>
						{coins.map((e, i) => (
							<tr key={e.id}>
								<th className="d-inline-flex align-items-center prices">
									<img src={e.image} alt={e.name} width="30" height="30" />
									<Paragraph size="18px" className="mb-0 ms-3">
										{e.name}
									</Paragraph>
									<Paragraph size="16px" className="mb-0 ms-2 text-uppercase" color="text_secondary">
										{" "}
										{e.symbol}
									</Paragraph>
								</th>
								<td>
									<Paragraph size="18px" className="mb-0">
										£{numberWithCommas(e.current_price)}
									</Paragraph>
								</td>
								<td className="d-inline-flex align-items-center">
									<Paragraph
										size="18px"
										className="mb-0"
										color={convertPriceChangeToColor(e.price_change_percentage_24h)}
									>
										{addPlusSigns(e.price_change_percentage_24h)} %
									</Paragraph>
									<IconHelper
										className="material-icons"
										color={convertPriceChangeToColor(e.price_change_percentage_24h)}
									>
										{convertPriceChangeToIcon(e.price_change_percentage_24h)}
									</IconHelper>
								</td>
								<td className="text-end">
									<Paragraph size="18px" className="mb-0">
										{convertMarketCap(e.market_cap)}
									</Paragraph>
								</td>
							</tr>
						))}
					</tbody>
				</AirDropTable>
			</div>
		</PageBody>
	);
};

export default Prices;
