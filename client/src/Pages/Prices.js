import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const Coin = ({
	name,
	price,
	symbol,
	marketcap,
	volume,
	image,
	priceChange,
  }) => {
	return (
	  <div className="coin-container">
		<div className="coin-row">
		  <div className="coin">
			<img src={image} alt="crypto" />
			<h1>{name}</h1>
			<p className="coin-symbol">{symbol}</p>
		  </div>
		  <div className="coin-data">
			<p className="coin-price">${price}</p>
			<p className="coin-volume">${volume.toLocaleString()}</p>
  
			{priceChange < 0 ? (
			  <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
			) : (
			  <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
			)}
  
			<p className="coin-marketcap">
			  Mkt Cap: ${marketcap.toLocaleString()}
			</p>
		  </div>
		</div>
	  </div>
	);
  };

const Prices = () => {
	const [coins, setCoins] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h", { crossDomain: true })
			.then((res) => {
				setCoins(res.data);
				console.log(res.data);
			})
			.catch((error) => console.log(error));
	}, []);

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const filteredCoins = coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));

	return (
		<div className="coin-app">
			<div className="coin-search">
				<h1 className="coin-text">Search a currency</h1>

				<form>
					<input className="coin-input" type="text" onChange={handleChange} placeholder="Search" />
				</form>
			</div>
			<div className="grid-container">
				<div className="item1">Name</div>
				<div className="item2">Symbol</div>
				<div className="item3">Price</div>
				<div className="item4">Volume</div>
				<div className="item4">24h</div>
				<div className="item5">Market cap</div>
			</div>

			{filteredCoins.map((coin) => {
				return (
					<Coin
						key={coin.id}
						name={coin.name}
						price={coin.current_price}
						symbol={coin.symbol}
						marketcap={coin.market_cap}
						volume={coin.total_volume}
						image={coin.image}
						priceChange={coin.price_change_percentage_24h}
					/>
				);
			})}
		</div>
	);
}

export default Prices;
