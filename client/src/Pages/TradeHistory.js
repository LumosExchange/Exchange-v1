import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled, { css } from "styled-components";
import { PageBody, StyledLabel } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import StyledTable from "../Components/Tables";

const FakeTableData = [
	{
		'user': 'shinji0314',
		'date': '16-07-2021 - 11:00:00',
		'type': 'Airdrop',
		'amount': 0.5,
		'currency': 'SOL',
		'total': '100',
		'status': 'completed',
	},
]

const TradeHistory = () => {
	const [userListings, setUserListings] = useState([]);

	useEffect(() => {
	  Axios.get("http://localhost:3001/getAllListings").then((response) => {
		  console.log(response.data, 'data');
		setUserListings(response.data);
	  });
	}, []);

	console.log(userListings, 'user listings');

  return (
		<PageBody className="d-flex align-items-center">
			<div className="container d-flex align-items-center justify-content-center py-5 flex-column">
				<div className="row w-100 mt-4">
					<Heading>Trade History</Heading>
					<div className="d-flex">
						<div className="col-4 flex-column">
							<StyledLabel>Type</StyledLabel>
						</div>
						<div className="col-4">2</div>
						<div className="col-4">3</div>
					</div>
					<StyledTable className="w-100 mt-4">
						<thead>
							<tr>
								<th>User</th>
								<th>Region</th>
								<th>Date</th>
								<th>Type</th>
								<th>Amount</th>
								<th>Total</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{FakeTableData.map((data) => (
								<tr key={data.date}>
									<td>{data.user}</td>
									<td>{data.date}</td>
									<td>{data.type}</td>
									<td>{data.amount}</td>
									<td>{data.total} {data.currency}</td>
									<td>{data.status}</td>
								</tr>
							))}
						</tbody>
					</StyledTable>
				</div>
			</div>
    	</PageBody>
  );
}

export default TradeHistory;
