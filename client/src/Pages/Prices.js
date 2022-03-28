import React, { useEffect, useState } from "react";
import CoinGecko from "coingecko-api";
const CoinGeckoClient = new CoinGecko();

function Prices() {
  const [coins, setcoins] = useState([]);
  useEffect(() => {
    async function fetchData() {
      // console.log(fetchURL);
      var parms = {
        order: CoinGecko.ORDER.MARKET_CAP_DESC
      };
      const result = await CoinGeckoClient.coins.markets({ parms });
      // let data = await CoinGeckoClient.ping();
      console.log(result.data[0]);
      setcoins(result.data);
    }
    fetchData();
  }, []);
  return (
    <>
     
      <div className="container-fluid" style={{ padding: "4% 10%" }}>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">symbol</th>
              <th scope="col">price</th>
              <th scope="col">24 hr change(%)</th>
              <th scope="col">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((e, i) => {
              // console.log(e);
              return (
                <tr key={e.id} className="table">
                  <th scope="row">{i + 1}</th>
                  <th>
                    <img src={e.image} alt="{e.name}" width="24" srcset="" />
                    {" " + e.name + " "}({e.symbol})
                  </th>
                  <td>$ {e.current_price}</td>
                  <td>{e.price_change_percentage_24h} %</td>
                  <td>$ {e.market_cap}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Prices;