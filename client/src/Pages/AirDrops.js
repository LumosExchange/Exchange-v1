import React, { useState } from "react";
import styled, { css } from "styled-components";
import { PageBody } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import Card from "../Components/Card";
import IconNews from "../Images/icon-news.svg";
import IconFaq from "../Images/icon-faq.svg";
import { Link } from "react-router-dom";
import { AirDropTable } from "../Components/Tables";
import GradientButton from "../Components/GradientButton";

// AirDrop Icons
import IconAirdropAssetSol from '../Images/icon-airdrop-asset-sol.svg';
import IconAirdropAssetKin from '../Images/icon-airdrop-asset-kin.svg';
import IconAirdropAssetLumos from '../Images/icon-airdrop-asset-lumos.svg';
import IconAirdropAssetCope from '../Images/icon-airdrop-asset-cope.svg';

const AirDropButton = styled.button(({ theme }) => css`
    padding: 7px 0;
    border-radius: 10px;
    border: 0;
    background: ${theme.colors.grey};
    color: ${theme.colors.white};
    width: 100%;

    &.active {
        font-family: 'THICCCBOI-BOLD';
        background-color: ${theme.colors.gradients.grey};
        background:
            linear-gradient(
                90deg,
                ${theme.colors.gradients.yellow} 0%,
                ${theme.colors.gradients.peach} 30%,
                ${theme.colors.gradients.mauve} 60%,
                ${theme.colors.gradients.blue} 100%
            );
    }
`);

const OngoingAirdropData = [
	{
		'asset': 'SOL',
		'project': 'uc.finance',
		'amount': '265,000',
		'filled': '800/1000',
        'filledPercentage': '80',
		'ends': '30-01-22',
		'participating': true,
	},
    {
		'asset': 'LUMOS',
		'project': 'KASGAMES',
		'amount': '80,000',
		'filled': '350/500',
        'filledPercentage': '70',
		'ends': '30-01-22',
		'participating': true,
	},
    {
		'asset': 'KIN',
		'project': 'rici9761',
		'amount': '678,246',
		'filled': '1000/5000',
        'filledPercentage': '50',
		'ends': '30-01-22',
		'participating': false,
	},
    {
		'asset': 'COPE',
		'project': 'CWIN.GB',
		'amount': '47,282',
		'filled': '500/2000',
        'filledPercentage': '25',
		'ends': '30-01-22',
		'participating': false,
	},
    {
		'asset': '',
		'project': 'Unknown',
		'amount': '47,282',
		'filled': '500/2000',
        'filledPercentage': '25',
		'ends': '30-01-22',
		'participating': false,
	},
];

const AirDropIcon = styled.img`
    width: 28px;
    height: 28px;
    min-width: 28px;
    min-height: 28px;
`;

export const convertAssetToIcon = (asset) => {
    if (asset === 'SOL'){ return <AirDropIcon src={IconAirdropAssetSol} alt="SOL" title="SOL" /> }
    if (asset === 'LUMOS'){ return <AirDropIcon src={IconAirdropAssetLumos} alt="LUMOS" title="LUMOS" /> }
    if (asset === 'KIN'){ return <AirDropIcon src={IconAirdropAssetKin} alt="KIN" title="KIN" /> }
    if (asset === 'COPE'){ return <AirDropIcon src={IconAirdropAssetCope} alt="COPE" title="COPE" /> }
    if (asset === ''){ return <i className="material-icons">token</i> }
}

const DROPTYPE_LATEST = 'latest';
const DROPTYPE_ONGOING = 'ongoing';
const DROPTYPE_UPCOMING = 'upcoming';
const DROPTYPE_ENDED = 'ended';
const DROPTYPE_PARTICIPATED = 'participated';

const AirDrops = () => {
    const [selectedAirdrop, selectAirdrop] = useState("");

    return(
        <PageBody className="d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-xl-6 flex-column">
                        <Heading>Exclusive SPL Airdrops</Heading>
                        <Paragraph size="18px">Take part in airdrops and earn SPL assets from some of the hottest and newest projects, in the Solana ecosystem</Paragraph>
                    </div>
                    <div className="col-12 col-xl-6">
                        <div className="row">
                            <div className="col-6">
                                <Link to="/blog" className="text-decoration-none">
                                    <Card className="p-4 d-flex h-100">
                                        <img src={IconNews} alt="News Icon" />
                                        <div className="flex-column ps-3">
                                            <Paragraph
                                                size="18px"
                                                color="yellow"
                                                className="mb-0"
                                            >
                                                Airdrop News
                                            </Paragraph>
                                            <Paragraph
                                                size="12px"
                                                className="mb-0"
                                            >
                                                Learn more in our blog
                                            </Paragraph>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                            <div className="col-6">
                                <Link to="/faq" className="text-decoration-none">
                                    <Card className="p-4 d-flex h-100">
                                        <img src={IconFaq} alt="FAQs" />
                                        <div className="flex-column ps-3">
                                            <Paragraph
                                                size="18px"
                                                color="yellow"
                                                className="mb-0"
                                            >
                                                Airdrop FAQs
                                            </Paragraph>
                                            <Paragraph
                                                size="12px"
                                                className="mb-0"
                                            >
                                                Learn more via the Library
                                            </Paragraph>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-9 mt-4">
                        <div className="row">
                            <div className="col-4 col-md-2">
                                <AirDropButton
                                    className={ selectedAirdrop === DROPTYPE_LATEST && 'active'}
                                    onClick={() => selectAirdrop(DROPTYPE_LATEST)}>
                                        Latest
                                </AirDropButton>
                            </div>
                            <div className="col-4 col-md-2">
                                <AirDropButton
                                    className={ selectedAirdrop === DROPTYPE_ONGOING && 'active'}
                                    onClick={() => selectAirdrop(DROPTYPE_ONGOING)}>
                                        Ongoing
                                    </AirDropButton>
                            </div>
                            <div className="col-4 col-md-2">
                                <AirDropButton
                                    className={ selectedAirdrop === DROPTYPE_UPCOMING && 'active'}
                                    onClick={() => selectAirdrop(DROPTYPE_UPCOMING)}
                                    >
                                        Upcoming
                                    </AirDropButton>
                            </div>
                            <div className="col-4 col-md-2">
                                <AirDropButton
                                    className={`mt-2 mt-md-0 ${selectedAirdrop === DROPTYPE_ENDED && 'active'}`}
                                    onClick={() => selectAirdrop(DROPTYPE_ENDED)}
                                >
                                    Ended
                                </AirDropButton>
                            </div>
                            <div className="col-4 col-md-2">
                                <AirDropButton
                                    className={`mt-2 mt-md-0 ${selectedAirdrop === DROPTYPE_PARTICIPATED && 'active'}`}
                                    onClick={() => selectAirdrop(DROPTYPE_PARTICIPATED)}>Participated</AirDropButton>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        {selectedAirdrop === DROPTYPE_ONGOING && (
                            <AirDropTable className="w-100 mt-4">
                                <thead>
                                    <tr>
                                        <th>Asset</th>
                                        <th>Project</th>
                                        <th>Amount</th>
                                        <th>Filled</th>
                                        <th>Ends In</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {OngoingAirdropData.map((data) => (
                                        <tr key={data.date}>
                                            <td className="icons">{convertAssetToIcon(data.asset)}</td>
                                            <td>{data.project}</td>
                                            <td>{data.amount}</td>
                                            <td>{data.filled}</td>
                                            <td>{data.ends}</td>
                                            <td className="buttons">{data.participating ? (
                                                <GradientButton
                                                    text="Participating"
                                                    padding="5px 10px"
                                                    fontSize="14px"
                                                    borderSize="2px"
                                                    className="w-100"
                                                    dark
                                                    disabled
                                                />
                                            ) : (
                                                <GradientButton
                                                    text="Participate"
                                                    padding="5px 10px"
                                                    fontSize="14px"
                                                    borderSize="2px"
                                                    className="w-100"
                                                    dark
                                            />
                                            )}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </AirDropTable>
                        )}
                    </div>
                </div>
            </div>
        </PageBody>
    );
}

export default AirDrops;