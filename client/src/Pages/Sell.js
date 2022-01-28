import React, { useState } from "react";
import Axios from "axios";
import { FormInput } from "../Components/FormInputs";

function Sell() {

  const [amountForSaleReg, setAmountForSaleReg] = useState("");
  const [aboveOrBelowReg, setAboveOrBelowReg] = useState("");
  const [changeReg, setChangeReg] = useState("");

  const addSale = () => {
    Axios.post("http://localhost:3001/sell", {
        amountForSale: amountForSaleReg,
        aboveOrBelow: aboveOrBelowReg,
        change: changeReg,
      })
}

  return (
    <div>
      <div className="logInForm">
        <label for="amountForSale">Amount of SOL for sale</label>

        <label for="amountForSale"></label>
        <FormInput
          type="text"
          placeholder="amount"
          name="amount"
          id="amount"
           onChange={(e) => {
            setAmountForSaleReg(e.target.value);
           }}
          required
        />
        <label for="aboveOrBelow">Sell above or below market</label>
        <label for="aboveOrBelow"></label>
        <input
          type="aboveOrBelow"
          placeholder="aboveOrBelow"
          name="aboveOrBelow"
          id="aboveOrBelow"
           onChange={(e) => {
             setAboveOrBelowReg(e.target.value);
           }}
          required
        />

        <label for="change">% above or below market</label>
        <label for="change"></label>
        <input
          type="change"
          placeholder="change"
          name="change"
          id="change"
           onChange={(e) => {
            setChangeReg(e.target.value);
           }}
          required
        />
        <button type="sell" form="nameform" value="sell" onClick={addSale}>
          List Sale
        </button>
      </div>
    </div>
  );
}

export default Sell;
