import React, { useState, useEffect } from "react";
import Axios from "axios";
import { PageBody, StyledLabel, StyledDropdown } from "../Components/FormInputs";
import styled, { css } from 'styled-components';
import Heading from "../Components/Heading";
import Card from "../Components/Card";
import Paragraph from "../Components/Paragraph";
import { useLocation } from 'react-router-dom';

const VerifiedIcon = styled.i(({ theme }) => css`
	&.true { color: ${theme.colors.valid} };
	&.false { color: ${theme.colors.invalid} };
	&.neutral { color: ${theme.colors.grey} };
`);

const Striped = styled.div(({ theme }) => css`
	&:nth-of-type(odd){
		background: ${theme.colors.card_bg};
	}
`);

const convertVerifiedToIcon = (status) => {
	if (status === 1){
		return <VerifiedIcon className="material-icons true">check_circle</VerifiedIcon>
	} else {
		return <VerifiedIcon className="material-icons false">cancel</VerifiedIcon>
	}
}

const convertScoreToIcon = (rating) => {
	if (rating === 1){
		return <VerifiedIcon className="material-icons true me-2">thumb_up</VerifiedIcon>
	}
	if (rating === 2){
		return <VerifiedIcon className="material-icons neutral me-2">sentiment_neutral</VerifiedIcon>
	}
	if (rating === 3){
		return <VerifiedIcon className="material-icons false me-2">thumb_down</VerifiedIcon>
	}
}

const fakeFeedbackComments = [
	{
		rating: 1,
		comment: "Sent payment fast great buyer",
		timestamp: "May 30, 2021, 12:31 a.m.",
	},
	{
		rating: 3,
		comment: "Took ages to send",
		timestamp: "May 30, 2021, 12:31 a.m.",
	}
];


const Feedback = () => {
	const [historyExpanded, expandHistory] = useState(false);
	const [totalTrades, setTotalTrades] =  useState("");
	const [feedbackScore, setFeedbackScore] = useState("");
	const [registeredDate, setRegisteredDate] = useState("");
	const [country, setCountry] = useState("");
	const [emailVerified, setEmailVerified] = useState("");
	const [phoneVerified, setPhoneVerified] = useState("");
	const [feedbackComments, setFeedbackComments] = useState([]);
	const [userName, setUserName] = useState("");

	// get userID from the url to profile links
	const userID = window.location.pathname.match(/\d+/)[0];

	const tradeInfo = () => {
		Axios.post("http://localhost:3001/GetFeedbackPage", {
			userID: userID
		}).then((response) => {
			console.log(response, 'response from getfeedback');
			setTotalTrades(response.data.totalTrades);
			setFeedbackScore(response.data.feedbackScore);
			setRegisteredDate(response.data.registeredDate);
			setCountry(response.data.country);
			setEmailVerified(response.data.emailVerified);
			setPhoneVerified(response.data.phoneVerified);
			setUserName(response.data.userName);
		})
	};

	const feedback = () => {
		Axios.post("http://localhost:3001/FeedbackComments", {
			userID: userID
		}).then((response) => {
			console.log('feedback response: ', response);
			//Will need to map this 
			if (response.data.length > 0){
				setFeedbackComments(response.data);
			} else {
				setFeedbackComments([]);
			}
		})
	}

	console.log(feedbackComments, 'feedback comments');

	useEffect(() => {
		tradeInfo();
		feedback();
	}, []);

	return (
		<PageBody className="d-flex align-items-start flex-column">
			<div className="container">
				<div className="d-flex justify-content-center pt-5 pb-3 flex-column">
					<div className="row">
						<div className="col-12 mb-3">
							<Heading size="30px" bold>{userName}</Heading>
						</div>
						<div className="row d-flex justify-content-between">
							<div className="col-12 col-md-6">
								<Card radius="6px" className="p-4">
									<table className="w-100">
										<thead>
											<th className="pb-3">
												<Paragraph size="20px" className="d-inline" bold>
													Trade Info
												</Paragraph>
											</th>
											<tr>
												<td className="pb-2">
													<Paragraph size="18px" bold className="d-inline">
														Total Trades
													</Paragraph>
												</td>
												<td className="pb-2">
													<Paragraph size="18px" className="d-inline">
														{totalTrades}
													</Paragraph>
												</td>
											</tr>
											<tr>
												<td className="pb-2">
													<Paragraph size="18px" bold className="d-inline">
														Feedback Score
													</Paragraph>
												</td>
												<td>
													<Paragraph size="18px" className="d-inline">
														{feedbackScore}
													</Paragraph>
												</td>
											</tr>
											<tr>
												<td className="pb-2">
													<Paragraph size="18px" bold className="d-inline">
														Date Registered
													</Paragraph>
												</td>
												<td>
													{registeredDate && (
														<Paragraph size="18px" className="d-inline">
															{registeredDate.replace('T', ' at ').replace('.000Z', ' ')}
														</Paragraph>
													)}
												</td>
											</tr>
											<tr>
												<td>
													<Paragraph size="18px" bold className="d-inline">
														Location
													</Paragraph>
												</td>
												<td>
													{country && (
														<Paragraph size="18px" className="d-inline">
															{country}
														</Paragraph>
													)}
												</td>
											</tr>
										</thead>
									</table>
								</Card>
							</div>
							<div className="col-12 col-md-6">
								<Card radius="6px" className="p-4">
								<table className="w-100">
										<thead>
											<th className="pb-3">
												<Paragraph size="20px" className="d-inline" bold>
													Verification Status
												</Paragraph>
											</th>
											<tr>
												<td>
													<Paragraph size="18px" bold className="d-inline">
														Email
													</Paragraph>
												</td>
												<td>
													<Paragraph size="18px" className="d-inline">
														{convertVerifiedToIcon(emailVerified)}
													</Paragraph>
												</td>
											</tr>
											<tr>
												<td>
													<Paragraph size="18px" bold className="d-inline">
														Phone
													</Paragraph>
												</td>
												<td>
													<Paragraph size="18px" className="d-inline">
														{convertVerifiedToIcon(phoneVerified)}
													</Paragraph>
												</td>
											</tr>
											<tr>
												<td>
													<Paragraph size="18px" bold className="d-inline">
														KYC
													</Paragraph>
												</td>
												<td>
													<Paragraph size="18px" className="d-inline">
														{convertVerifiedToIcon(true)}
													</Paragraph>
												</td>
											</tr>
										</thead>
									</table>
								</Card>
							</div>
							<div className="col-12 mt-3">
								<div>
									<div className="py-4">
										<Paragraph size="20px" className="mb-0" bold>
											Feedback
										</Paragraph>
									</div>
									{feedbackComments.length === 0 && (
										<Paragraph size="18px">No Feedback Comments to show.</Paragraph>
									)}
									{feedbackComments.length > 0 && feedbackComments.map((fb) => (
										<Striped className="d-flex px-4 py-3 mb-2 flex-column">
											<Paragraph size="14px" className="mb-1">
												{fb.date}
											</Paragraph>
											<div className="d-flex">
												{convertScoreToIcon(fb.feedbackSCore)}
												<Paragraph size="20px" className="mb-0">
													{fb.comment}
												</Paragraph>
											</div>
										</Striped>
									))}
									<div className="p-3" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageBody>
	);
}

export default Feedback;