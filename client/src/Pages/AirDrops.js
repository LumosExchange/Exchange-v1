import React, { useState } from "react";
import { PageBody } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import Card from "../Components/Card";
import { Link } from "react-router-dom";
import { AirDropTable } from "../Components/Tables";
import GradientButton from "../Components/GradientButton";
import {
    AirdropData,
    AirDropButton,
    convertAssetToIcon,
    DROPTYPE_ONGOING,
    DROPTYPE_PARTICIPATED,
    DROPTYPE_ENDED,
    DROPTYPE_UPCOMING,
    DROPTYPE_LATEST,
} from "../Components/AirDrops";

import {
    NewsIconAirdrop,
    FaqIconAirdrop,
} from '../Components/SVGComponents';

const AirDropsOngoing = AirdropData.filter(airDrops => airDrops.status === DROPTYPE_ONGOING);
const AirDropsEnded = AirdropData.filter(airDrops => airDrops.status === DROPTYPE_ENDED);
const AirDropsUpcoming = AirdropData.filter(airDrops => airDrops.status === DROPTYPE_UPCOMING);
const AirDropsParticipated = AirdropData.filter(airDrops => airDrops.participating && airDrops.status === DROPTYPE_ENDED);

const AirDrops = () => {
	const [selectedAirdrop, selectAirdrop] = useState("");

	return (
		<PageBody className="d-flex align-items-start" style={{ padding: "100px 0" }}>
			<div className="container">
				<div className="row">
					<div className="col-12 col-xl-6 flex-column">
						<Heading>Exclusive SPL Airdrops</Heading>
						<Paragraph size="18px">
							Take part in airdrops and earn SPL assets from some of the hottest and newest projects, in
							the Solana ecosystem
						</Paragraph>
					</div>
					<div className="col-12 col-xl-6">
						<div className="row">
							<div className="col-6">
								<Link to="/blog" className="text-decoration-none">
									<Card className="p-4 d-flex h-100">
										<NewsIconAirdrop />
										<div className="flex-column ps-3">
											<Paragraph size="18px" color="yellow" className="mb-0">
												Airdrop News
											</Paragraph>
											<Paragraph size="12px" className="mb-0">
												Learn more in our blog
											</Paragraph>
										</div>
									</Card>
								</Link>
							</div>
							<div className="col-6">
								<Link to="/faq" className="text-decoration-none">
									<Card className="p-4 d-flex h-100">
										<FaqIconAirdrop />
										<div className="flex-column ps-3">
											<Paragraph size="18px" color="yellow" className="mb-0">
												Airdrop FAQs
											</Paragraph>
											<Paragraph size="12px" className="mb-0">
												Learn more via the Library
											</Paragraph>
										</div>
									</Card>
								</Link>
							</div>
						</div>
					</div>
					<div className="col-12 col-xl-9 mt-5 pt-5">
						<div className="row">
							<div className="col-4 col-md-2">
								<AirDropButton
									className={selectedAirdrop === DROPTYPE_LATEST && "active"}
									onClick={() => selectAirdrop(DROPTYPE_LATEST)}
								>
									Latest
								</AirDropButton>
							</div>
							<div className="col-4 col-md-2">
								<AirDropButton
									className={selectedAirdrop === DROPTYPE_ONGOING && "active"}
									onClick={() => selectAirdrop(DROPTYPE_ONGOING)}
								>
									Ongoing
								</AirDropButton>
							</div>
							<div className="col-4 col-md-2">
								<AirDropButton
									className={selectedAirdrop === DROPTYPE_UPCOMING && "active"}
									onClick={() => selectAirdrop(DROPTYPE_UPCOMING)}
								>
									Upcoming
								</AirDropButton>
							</div>
							<div className="col-4 col-md-2">
								<AirDropButton
									className={`mt-2 mt-md-0 ${selectedAirdrop === DROPTYPE_ENDED && "active"}`}
									onClick={() => selectAirdrop(DROPTYPE_ENDED)}
								>
									Ended
								</AirDropButton>
							</div>
							<div className="col-4 col-md-2">
								<AirDropButton
									className={`mt-2 mt-md-0 ${selectedAirdrop === DROPTYPE_PARTICIPATED && "active"}`}
									onClick={() => selectAirdrop(DROPTYPE_PARTICIPATED)}
								>
									Participated
								</AirDropButton>
							</div>
						</div>
					</div>
					<div className="col-12">
						<AirDropTable className="w-100 mt-4">
							<thead>
								<tr>
									<th>
										<Paragraph className="mb-0" size="16px" bold>
											Asset
										</Paragraph>
									</th>
									<th>
										<Paragraph className="mb-0" size="16px" bold>
											Project
										</Paragraph>
									</th>
									<th>
										<Paragraph className="mb-0" size="16px" bold>
											Amount
										</Paragraph>
									</th>
									<th>
										<Paragraph className="mb-0" size="16px" bold>
											Filled
										</Paragraph>
									</th>
									<th>
										<Paragraph className="mb-0" size="16px" bold>
											Ends In
										</Paragraph>
									</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{selectedAirdrop === DROPTYPE_ONGOING &&
									AirDropsOngoing.map((data) => (
										<tr key={data.date}>
											<td className="icons">{convertAssetToIcon(data.asset)}</td>
											<td>
												<Paragraph className="mb-0" size="16px">
													{data.project}
												</Paragraph>
											</td>
											<td>
												<Paragraph className="mb-0" size="16px">
													{data.amount}
												</Paragraph>
											</td>
											<td>
												<Paragraph className="mb-0" size="16px">
													{data.filled}
												</Paragraph>
											</td>
											<td>
												<Paragraph className="mb-0" size="16px">
													{data.ends}
												</Paragraph>
											</td>
											<td className="buttons">
												<GradientButton
													text={data.participating ? "Participating" : "Participate"}
													padding="5px 10px"
													fontSize="14px"
													borderSize="2px"
													className="w-100"
													dark
													disabled={data.participating}
												/>
											</td>
										</tr>
									))}
                                    {selectedAirdrop === DROPTYPE_UPCOMING &&
                                        AirDropsUpcoming.map((data) => (
                                            <tr key={data.date}>
                                                <td className="icons">{convertAssetToIcon(data.asset)}</td>
                                                <td>
                                                    <Paragraph className="mb-0" size="16px">
                                                        {data.project}
                                                    </Paragraph>
                                                </td>
                                                <td>
                                                    <Paragraph className="mb-0" size="16px">
                                                        {data.amount}
                                                    </Paragraph>
                                                </td>
                                                <td>
                                                    <Paragraph className="mb-0" size="16px">
                                                        {data.filled}
                                                    </Paragraph>
                                                </td>
                                                <td>
                                                    <Paragraph className="mb-0" size="16px">
                                                        {data.ends}
                                                    </Paragraph>
                                                </td>
                                                <td className="buttons">
                                                    <GradientButton
                                                        text={data.participating ? "Participating" : "Participate"}
                                                        padding="5px 10px"
                                                        fontSize="14px"
                                                        borderSize="2px"
                                                        className="w-100"
                                                        dark
                                                        disabled={data.participating}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    {selectedAirdrop === DROPTYPE_ENDED &&
                                        AirDropsEnded.map((data) => (
                                            <tr key={data.date}>
                                                <td className="icons">{convertAssetToIcon(data.asset)}</td>
                                                <td>
                                                    <Paragraph className="mb-0" size="16px">
                                                        {data.project}
                                                    </Paragraph>
                                                </td>
                                                <td>
                                                    <Paragraph className="mb-0" size="16px">
                                                        {data.amount}
                                                    </Paragraph>
                                                </td>
                                                <td>
                                                    <Paragraph className="mb-0" size="16px">
                                                        {data.filled}
                                                    </Paragraph>
                                                </td>
                                                <td>
                                                    <Paragraph className="mb-0" size="16px">
                                                        {data.ends}
                                                    </Paragraph>
                                                </td>
                                                <td className="buttons">
                                                    <GradientButton
                                                        text={data.participating ? "Participating" : "Participate"}
                                                        padding="5px 10px"
                                                        fontSize="14px"
                                                        borderSize="2px"
                                                        className="w-100"
                                                        dark
                                                        disabled={data.participating}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    {selectedAirdrop === DROPTYPE_PARTICIPATED &&
                                        AirDropsParticipated.map((data) => (
                                            <tr key={data.date}>
                                                <td className="icons">{convertAssetToIcon(data.asset)}</td>
                                                <td>
                                                    <Paragraph className="mb-0" size="16px">
                                                        {data.project}
                                                    </Paragraph>
                                                </td>
                                                <td>
                                                    <Paragraph className="mb-0" size="16px">
                                                        {data.amount}
                                                    </Paragraph>
                                                </td>
                                                <td>
                                                    <Paragraph className="mb-0" size="16px">
                                                        {data.filled}
                                                    </Paragraph>
                                                </td>
                                                <td>
                                                    <Paragraph className="mb-0" size="16px">
                                                        {data.ends}
                                                    </Paragraph>
                                                </td>
                                                <td className="buttons">
                                                    <GradientButton
                                                        text={data.participating ? "Participating" : "Participate"}
                                                        padding="5px 10px"
                                                        fontSize="14px"
                                                        borderSize="2px"
                                                        className="w-100"
                                                        dark
                                                        disabled={data.participating}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
							</tbody>
						</AirDropTable>
					</div>
				</div>
			</div>
		</PageBody>
	);
};

export default AirDrops;