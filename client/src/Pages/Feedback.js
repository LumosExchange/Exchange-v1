import React, { useState, useEffect } from "react";
import Axios from "axios";
import { PageBody, StyledLabel, StyledDropdown } from "../Components/FormInputs";
import styled, { css } from 'styled-components';
import Heading from "../Components/Heading";
import Card from "../Components/Card";
import Paragraph from "../Components/Paragraph";

const Feedback = () => {
	const [historyExpanded, expandHistory] = useState(false);

	useEffect(() => {}, []);

	return (
		<PageBody className="d-flex align-items-start flex-column">
			<div className="container">
				<div className="d-flex justify-content-center pt-5 pb-3 flex-column">
					<div className="row">
						<div className="col-12">
							<Heading>userName</Heading>
						</div>
						<div className="row d-flex justify-content-between">
							<div className="col-12 col-md-5">
								<Card radius="6px" className="p-4 row">
									<table class="tg">
										<thead>
										<tr>
											<td>
												<Paragraph size="18px" bold className="d-inline">Total Trades</Paragraph>
											</td>
											<td>
												<Paragraph size="18px" className="d-inline">0</Paragraph>
											</td>
										</tr>
										<tr>
											<td>
												<Paragraph size="18px" bold className="d-inline">Feedback Score</Paragraph>
											</td>
											<td>
												<Paragraph size="18px" className="d-inline">100%</Paragraph>
											</td>
										</tr>
										</thead>
									</table>
								</Card>
							</div>
							<div className="col-12 col-md-5">
								<Card radius="6px" className="p-4 row">
									verification here
								</Card>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageBody>
	);
}

export default Feedback;