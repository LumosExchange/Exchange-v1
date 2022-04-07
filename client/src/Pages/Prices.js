import React, { useEffect, useState } from "react";
import CoinGecko from "coingecko-api";
import { PageBody } from "../Components/FormInputs";
import { AirDropTable } from "../Components/Tables";
import Paragraph from "../Components/Paragraph";
const CoinGeckoClient = new CoinGecko();

const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Prices = () => {
	const [coins, setcoins] = useState([]);

	useEffect(() => {
		async function fetchData() {
			// console.log(fetchURL);
			console.log(CoinGecko, "coingecko");
			const result = await CoinGeckoClient.coins.markets({ vs_currency: "gbp" });
			// let data = await CoinGeckoClient.ping();
			console.log(result.data[0]);
			setcoins(result.data);
		}
		fetchData();
	}, []);

	return (
		<PageBody>
			<div className="container-fluid" style={{ padding: "4% 10%" }}>
				<AirDropTable className="w-100">
					<thead>
						<tr>
							<th scope="col">
								<Paragraph size="18px" className="mb-0" bold>
									Rank
								</Paragraph>
							</th>
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
							<th scope="col">
								<Paragraph size="18px" className="mb-0" bold>
									Market Cap
								</Paragraph>
							</th>
						</tr>
					</thead>
					<tbody>
						{coins.map((e, i) => {
							// console.log(e);
							return (
								<tr key={e.id}>
									<th scope="row">{i + 1}</th>
									<th className="d-flex align-items-center">
										<img src={e.image} alt="{e.name}" width="24" height="24" />
										<Paragraph size="18px" className="mb-0 ms-2">
											{e.name}
										</Paragraph>
										<Paragraph size="18px" className="mb-0 ms-2 text-uppercase">
											{" "}
											({e.symbol})
										</Paragraph>
									</th>
									<td>
										<Paragraph size="18px" className="mb-0">
											£{e.current_price}
										</Paragraph>
									</td>
									<td>
										<Paragraph
											size="18px"
											className="mb-0 ms-2"
											color={
												e.price_change_percentage_24h.toString().includes("-")
													? "invalid"
													: "valid"
											}
										>
											{e.price_change_percentage_24h} %
										</Paragraph>
									</td>
									<td>
										<Paragraph size="18px" className="mb-0">
											£{numberWithCommas(e.market_cap)}
										</Paragraph>
									</td>
								</tr>
							);
						})}
					</tbody>
				</AirDropTable>
			</div>
		</PageBody>
	);
};

export default Prices;
