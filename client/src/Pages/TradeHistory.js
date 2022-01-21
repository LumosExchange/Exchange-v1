import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled, { css } from "styled-components";
import { PageBody, StyledLabel, StyledDropdown } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import StyledTable from "../Components/Tables";

const FakeTableData = [
	{
		'user': 'shinji0314',
		'region': 'United Kingdom',
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
		<PageBody className="d-flex align-items-start">
			<div className="container d-flex align-items-center justify-content-center py-5 flex-column">
				<div className="row w-100 mt-5">
					<Heading className="pb-4">Trade History</Heading>
					<div className="col-8 d-flex justify-content-between">
						<div className="col-4 d-flex flex-column me-3">
							<StyledLabel
								padding="0 0 10px 0"
								fontSize="24px"
							>
								Type
							</StyledLabel>
							<StyledDropdown>
								<option>AirDrop</option>
								<option>Purchase</option>
								<option>Sale</option>
							</StyledDropdown>
						</div>
						<div className="col-4 d-flex flex-column me-3">
							<StyledLabel
								padding="0 0 10px 0"
								fontSize="24px"
							>
								Time
							</StyledLabel>
							<StyledDropdown>
								<option>Past 30 Days</option>
								<option>Past 60 Days</option>
								<option>Past 90 Days</option>
								<option>Past Year</option>
							</StyledDropdown>
						</div>
						<div className="col-4 d-flex flex-column me-3">
							<StyledLabel
								padding="0 0 10px 0"
								fontSize="24px"
							>
								Status
							</StyledLabel>
							<StyledDropdown>
								<option>Active</option>
								<option>Completed</option>
							</StyledDropdown>
						</div>
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
									<td><span>{data.user}</span></td>
									<td>{data.region}</td>
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
