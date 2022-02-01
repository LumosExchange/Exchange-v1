import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import "../offer.css";

function Offer() {

  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, tradeID, solForSale, aboveOrBelow, percentage, userID } = state;
  const [userName, setUserName] = useState([]);
  var amount = 0;
  var gbp = 0;
  var sellerFirst;
  var sellerSecond;
 


  //Create lookup for seller ID Name & Feedback
  useEffect(() => {
    Axios.get("http://localhost:3001/getUserNameSeller", {
      params: {
        sellerID: state.userID
      }
    }).then((response) => {
       setUserName(response.data);

      console.log("Username is : "  );
    });
  }, []);

  //Get solana price from coingeko api and het parameters for sale
  function getElement(id) {
    return document.getElementById(id);
  }
  fetch(
    "https://api.coingecko.com/api/v3/coins/solana?localization=false&sparkline=false&vs_currencies=GBP"
  )
    .then((res) => res.json())
    .then((res) => {
      const market_data = res.market_data;
      getElement("price").innerHTML =
        "£" + market_data.current_price.gbp.toFixed(2);
      console.log(res.market_data);
      gbp = market_data.current_price.gbp.toFixed(2);
      //pass through info
      document.getElementById("S4S").innerHTML = state.solForSale;
      document.getElementById("AOB").innerHTML = state.aboveOrBelow;
      document.getElementById("PER").innerHTML = state.percentage;
    });

    //Pass params for feedback
    function handleClick() {
      navigate("/Feedback", {
        state: {
          id: 1,
          sellerID: state.userID,
          sellerFirst: sellerFirst,
          sellerLast: sellerSecond
      },

      });
    }

  //calculate amount of sol for gbp value
  function Calculate() {
    var offer = document.getElementById("Offer").value;
    amount = Math.floor(offer/gbp).toFixed(2);
    document.getElementById("deal").innerHTML = amount;

  }



  //open trade

  return (
    <div className="Offer">
    <div className="Left">
      <h1 alt="Create Offer">Create Offer:</h1>
      <h2 alt="Current Solana Price">Current Solana price : <h2 id="price"> </h2></h2>
      <h2 alt="">Trade amount</h2>
      <h3 alt="">GBP</h3>
      <label for="Offer"></label>
      <input
        type="text"
        placeholder="Offer GBP"
        name="Offer"
        id="Offer"
        required
      />
      <button onClick={Calculate}>Calculate</button>

      <h2 alt="">You will recieve:</h2>
      <h2 id="deal" alt=""> </h2>
      <button>Open Trade</button>
      </div>



      <div className="Right">
        <h1>Trade Details:</h1>
        <h2>Seller: </h2>
        {userName.map((val) => {
          return <h3>{sellerFirst = val.firstName} {sellerSecond = val.lastName}</h3>
        })}
        
        <button onClick={handleClick}>View Sellers Feedback</button>
        
        
        <h2>Sol for sale:</h2>
        <h3 id="S4S" alt=""> </h3>
        <h2>Above or Below</h2>
        <h3 id="AOB" alt=""> </h3>
        <h2>Percentage</h2>
        <h3 id="PER" alt=""> </h3>
        
      </div>
     
    </div>
    
  );
}

export default Offer;
