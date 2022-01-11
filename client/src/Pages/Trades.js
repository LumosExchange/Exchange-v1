import React, { useState, useEffect } from "react";
import Axios from "axios";

function Trades() {
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllListings").then((response) => {
      setUserListings(response.data);
    });
  }, []);

  return (
    <div>
      <h1> Trades </h1>
      <h2> Please update or edit live listings </h2>
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Amount of Sol for sale Remaining </th>
              <th>Above or Below</th>
              <th>Percentage</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          {userListings.map((val) => {
            return (
              <tbody key={val.tradeID}>
                <tr>
                  <td>{val.amountForSale}</td>
                  <td>{val.aboveOrBelow}</td>
                  <td>{val.percentChange}</td>
                  <td>EDIT</td>
                  <td>DELETE</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Trades;
