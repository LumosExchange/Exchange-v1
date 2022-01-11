import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

var TRADEID = "";
var F4S = 0;
var AOB = "";
var PER = "";
var USERID = "";

function Buy() {
  const [allListings, setAllListings] = useState([]);

  const navigate = useNavigate();
 

  //pass variables we need here

  function handleClick() {
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
    <div>
      <h1>Please see current market listings</h1>
      <div>
        <table id="myTable" border="1">
          <thead>
            <tr>
              <th>Sol for sale</th>
              <th>Above or Below</th>
              <th>Percentage</th>
              <th>UserID</th>
              <th>TradeID</th>
              <th>BUY</th>
            </tr>
          </thead>

          {allListings.map((val) => {
            return (
              <tbody key={val.tradeID}>
                <tr>
                  <td>{val.amountForSale}</td>

                  <td>{val.aboveOrBelow}</td>
                  <td>{val.percentChange}</td>
                  <td>{val.userID}</td>
                  <td>{val.tradeID}</td>
                  <td>
                    <button class="btnSelect" onClick={handleClick}>
                      BUY
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
$(document).ready(function () {
  // code to read selected table row cell data (values).
  $("#myTable").on("click", ".btnSelect", function () {
    // get the current row
    var currentRow = $(this).closest("tr");

    F4S = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
    AOB = currentRow.find("td:eq(1)").text(); // get current row 2nd TD
    PER = currentRow.find("td:eq(2)").text(); // get current row 3rd TD
    USERID = currentRow.find("td:eq(3)").text(); // get current row 3rd TD
     TRADEID = currentRow.find("td:eq(4)").text(); // get current row 3rd TD
  });
});

export default Buy;
