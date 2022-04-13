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

const IconBase = styled.svg(({ theme }) => css`
    g, path {
        fill: ${theme.colors.text_primary};
    }
`);

const SolIcon = () => (
    <IconBase width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.22037 14.5422C4.3576 14.4007 4.54201 14.321 4.735 14.321H22.597C22.9229 14.321 23.0859 14.728 22.8543 14.9625L19.3248 18.6032C19.1875 18.7447 19.0031 18.8244 18.8101 18.8244H0.952462C0.62653 18.8244 0.463563 18.4174 0.695147 18.1829L4.22037 14.5422Z" fill="#F4F4F4"/>
        <path d="M4.22037 0.952509C4.3576 0.81095 4.54201 0.731323 4.735 0.731323H22.597C22.9229 0.731323 23.0859 1.1383 22.8543 1.37276L19.3248 5.00905C19.1875 5.15061 19.0031 5.23024 18.8101 5.23024H0.952462C0.62653 5.23024 0.463563 4.82326 0.695147 4.5888L4.22037 0.952509Z" fill="#F4F4F4"/>
        <path d="M19.3248 7.70312C19.1875 7.56156 19.0031 7.48193 18.8101 7.48193H0.952462C0.62653 7.48193 0.463563 7.88891 0.695147 8.12337L4.22465 11.7597C4.36189 11.9012 4.5463 11.9808 4.73928 11.9808H22.6012C22.9272 11.9808 23.0901 11.5739 22.8586 11.3394L19.3248 7.70312Z" fill="#F4F4F4"/>
    </IconBase>
);

const KinIcon = () => (
    <IconBase width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="icon-airdrop-asset-kin" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Kin-(KIN)" transform="translate(3.000000, 3.000000)" fill="#FFFFFF">
                <path d="M14.9107237,10.9320288 L14.9107237,11.0679712 C14.9107237,13.0051493 16.5377707,14.5911432 18.5250924,14.5911432 L20.5124142,14.5911432 C21.3375594,14.5911432 22,15.2368692 22,16.0411946 L22,21.9886715 L15.7939778,21.9886715 C14.9688325,21.9886715 14.306392,21.3429454 14.306392,20.53862 L14.306392,18.1029866 C14.306392,16.1658084 12.679345,14.5798146 10.6920232,14.5798146 L10.5525621,14.5798146 C8.56524036,14.5798146 6.93819334,16.1658084 6.93819334,18.1029866 L6.93819334,22 L0,22 L0,0 L6.93819334,0 L6.93819334,3.9423275 C6.93819334,5.87950566 8.56524036,7.46549949 10.5525621,7.46549949 L10.6920232,7.46549949 C12.679345,7.46549949 14.306392,5.87950566 14.306392,3.9423275 L14.306392,1.45005149 C14.306392,0.645726056 14.9688325,0 15.7939778,0 L22,0 L22,5.94747683 C22,6.75180227 21.3375594,7.39752832 20.5124142,7.39752832 L18.5250924,7.39752832 C16.5377707,7.40885685 14.9107237,8.99485067 14.9107237,10.9320288 Z" id="Path"></path>
            </g>
        </g>
    </IconBase>
);

const LraIcon = () => (
    <IconBase width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="icon-airdrop-asset-lumos" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Group" transform="translate(0.000000, 3.000000)" fill="#FFE300">
                <path d="M20.4615385,0 L28,8.10526316 L14,22 L0,8.10526316 L7.53846154,0 L20.4615385,0 Z M16.3333333,0 L7,9.33333333 L11.6666667,9.33333333 L11.6666667,9.33333333 L11.6666667,14 L11.6666667,14 L11.8993536,13.767313 C11.9338258,13.7328409 11.9721282,13.6945385 12.0142608,13.6524059 L12.1521494,13.5145173 C12.3513218,13.3153449 12.611778,13.0548887 12.933518,12.7331487 L13.6085975,12.0580691 C13.7579768,11.9086899 13.9159741,11.7506925 14.0825895,11.5840772 L14.9874833,10.6791833 C15.4432817,10.223385 15.9460005,9.72066619 16.4956397,9.17102698 L17.2281728,8.4384939 C17.3967033,8.26996341 17.569064,8.09760268 17.745255,7.92141172 L18.2853186,7.38134811 C18.46917,7.19749667 18.6568517,7.00981499 18.8483636,6.81830307 L21,4.66666667 L16.3333333,4.66666667 L16.3333333,0 Z" id="Combined-Shape"></path>
            </g>
        </g>
    </IconBase>
);

const CopeBase = styled.svg(({ theme }) => css`
    .fill { fill: ${theme.colors.text_primary};}
    .stroke { stroke: ${theme.colors.text_primary};}
`);

const CopeIcon = () => (
    <CopeBase width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="icon-airdrop-asset-cope" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <circle id="Oval" className="stroke" stroke="#FFFFFF" stroke-width="1.5" cx="14" cy="14" r="10.25"></circle>
            <circle id="Oval" className="fill" fill="#FFFFFF" cx="9.5" cy="13.5" r="1.5"></circle>
            <circle id="Oval-Copy" className="fill" fill="#FFFFFF" cx="14" cy="13.5" r="1.5"></circle>
            <circle id="Oval-Copy-2" className="fill" fill="#FFFFFF" cx="18.5" cy="13.5" r="1.5"></circle>
        </g>
    </CopeBase>
);

const NewsIcon = () => (
    <IconBase width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M43.2144 11.2947V40.2679C43.214 40.5133 43.3054 40.75 43.4708 40.9314C43.6361 41.1128 43.8634 41.2257 44.1078 41.2478C44.3523 41.27 44.5961 41.1999 44.7914 41.0512C44.9867 40.9026 45.1193 40.6862 45.163 40.4447L45.1787 40.2679V13.75H47.6341C48.4968 13.7501 49.3279 14.0745 49.9625 14.6589C50.5971 15.2433 50.9888 16.0449 51.0598 16.9047L51.0716 17.1875V40.759C51.0717 42.3896 50.4478 43.9585 49.3279 45.1437C48.2081 46.329 46.6771 47.0408 45.0491 47.1331L44.6876 47.1429H10.3126C8.68201 47.143 7.11315 46.5191 5.9279 45.3993C4.74265 44.2794 4.03085 42.7484 3.93853 41.1204L3.92871 40.759V11.2947C3.92874 10.432 4.25315 9.60084 4.83755 8.96623C5.42194 8.33162 6.22358 7.93995 7.08335 7.86896L7.36621 7.85718H39.7769C40.6396 7.85721 41.4708 8.18162 42.1054 8.76601C42.74 9.35041 43.1317 10.1521 43.2026 11.0118L43.2144 11.2947V40.2679V11.2947ZM19.146 25.5436H14.2412C13.3785 25.5436 12.5474 25.8681 11.9128 26.4524C11.2782 27.0368 10.8865 27.8385 10.8155 28.6983L10.8037 28.9811V33.884C10.8037 34.7467 11.1282 35.5778 11.7125 36.2124C12.2969 36.847 13.0986 37.2387 13.9584 37.3097L14.2412 37.3215H19.146C20.009 37.3214 20.8404 36.9967 21.4751 36.4119C22.1098 35.8271 22.5012 35.025 22.5717 34.1649L22.5816 33.884V28.9811C22.582 28.1181 22.2578 27.2864 21.6734 26.6514C21.089 26.0164 20.287 25.6244 19.4269 25.5534L19.146 25.5436ZM34.8662 34.375H27.9912L27.7909 34.3888C27.4382 34.4373 27.1151 34.6118 26.8812 34.8801C26.6473 35.1484 26.5184 35.4923 26.5184 35.8483C26.5184 36.2042 26.6473 36.5481 26.8812 36.8164C27.1151 37.0847 27.4382 37.2592 27.7909 37.3077L27.9912 37.3215H34.8662L35.0666 37.3077C35.4192 37.2592 35.7423 37.0847 35.9762 36.8164C36.2101 36.5481 36.339 36.2042 36.339 35.8483C36.339 35.4923 36.2101 35.1484 35.9762 34.8801C35.7423 34.6118 35.4192 34.4373 35.0666 34.3888L34.8662 34.375ZM14.2412 28.49H19.146C19.2564 28.4901 19.3635 28.5274 19.4501 28.5958C19.5367 28.6642 19.5977 28.7598 19.6234 28.8672L19.6371 28.9811V33.884C19.6369 33.9946 19.5994 34.1019 19.5306 34.1886C19.4618 34.2752 19.3657 34.3361 19.258 34.3613L19.146 34.375H14.2412C14.1306 34.3749 14.0232 34.3373 13.9366 34.2685C13.85 34.1997 13.7891 34.1037 13.7639 33.9959L13.7501 33.884V28.9811C13.7499 28.8701 13.7872 28.7624 13.8561 28.6753C13.9249 28.5883 14.0212 28.5271 14.1292 28.5018L14.2412 28.49H19.146H14.2412ZM34.8662 25.5436H27.9912L27.7909 25.5554C27.4368 25.6023 27.1118 25.7763 26.8764 26.045C26.641 26.3136 26.5112 26.6586 26.5112 27.0158C26.5112 27.373 26.641 27.7181 26.8764 27.9867C27.1118 28.2554 27.4368 28.4294 27.7909 28.4763L27.9912 28.49H34.8662L35.0666 28.4763C35.4207 28.4294 35.7457 28.2554 35.9811 27.9867C36.2165 27.7181 36.3462 27.373 36.3462 27.0158C36.3462 26.6586 36.2165 26.3136 35.9811 26.045C35.7457 25.7763 35.4207 25.6023 35.0666 25.5554L34.8662 25.5436ZM34.8662 16.6906H12.2769L12.0766 16.7043C11.724 16.7528 11.4008 16.9274 11.1669 17.1957C10.933 17.464 10.8042 17.8079 10.8042 18.1638C10.8042 18.5197 10.933 18.8636 11.1669 19.1319C11.4008 19.4002 11.724 19.5747 12.0766 19.6233L12.2769 19.637H34.8662L35.0666 19.6233C35.4192 19.5747 35.7423 19.4002 35.9762 19.1319C36.2101 18.8636 36.339 18.5197 36.339 18.1638C36.339 17.8079 36.2101 17.464 35.9762 17.1957C35.7423 16.9274 35.4192 16.7528 35.0666 16.7043L34.8662 16.6906Z" />
    </IconBase>
);

const FaqIcon = () => (
    <IconBase width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.3335 9.37496V40.625C8.3335 42.0063 8.88223 43.3311 9.85898 44.3078C10.8357 45.2846 12.1605 45.8333 13.5418 45.8333H41.146C41.5604 45.8333 41.9578 45.6687 42.2509 45.3757C42.5439 45.0826 42.7085 44.6852 42.7085 44.2708C42.7085 43.8564 42.5439 43.459 42.2509 43.1659C41.9578 42.8729 41.5604 42.7083 41.146 42.7083H13.5418C12.9893 42.7083 12.4594 42.4888 12.0687 42.0981C11.678 41.7074 11.4585 41.1775 11.4585 40.625H41.146C41.5604 40.625 41.9578 40.4603 42.2509 40.1673C42.5439 39.8743 42.7085 39.4769 42.7085 39.0625V9.37496C42.7085 8.69099 42.5738 8.01372 42.312 7.38182C42.0503 6.74991 41.6666 6.17575 41.183 5.69211C40.6994 5.20847 40.1252 4.82483 39.4933 4.56309C38.8614 4.30134 38.1841 4.16663 37.5002 4.16663H13.5418C12.1605 4.16663 10.8357 4.71536 9.85898 5.69211C8.88223 6.66886 8.3335 7.99362 8.3335 9.37496ZM22.9168 16.7041C22.907 17.112 22.7381 17.4999 22.4461 17.7848C22.1542 18.0698 21.7623 18.2292 21.3543 18.2291C19.7918 18.2291 19.7918 16.6645 19.7918 16.6645V16.6458C19.7929 16.5525 19.7985 16.4594 19.8085 16.3666C19.9007 15.5619 20.2024 14.7954 20.6835 14.1437C21.6293 12.8666 23.3293 11.9312 26.0689 11.9791C28.0481 12.0145 29.8043 12.8437 30.9043 14.2083C32.0231 15.5979 32.4002 17.4791 31.6585 19.3312C30.9043 21.2166 29.1981 21.9666 28.2168 22.3958L28.1127 22.4437C27.5293 22.7 27.2522 22.8333 27.0856 22.9666L27.0835 22.9687V24.477C27.0838 24.8914 26.9194 25.289 26.6266 25.5822C26.3338 25.8754 25.9364 26.0403 25.522 26.0406C25.1076 26.0409 24.7101 25.8765 24.4169 25.5837C24.1237 25.2908 23.9588 24.8935 23.9585 24.4791V22.9166C23.9585 21.827 24.4835 21.0479 25.1314 20.527C25.6522 20.1104 26.3085 19.8229 26.7689 19.6187L26.8481 19.5833C27.9772 19.0854 28.5147 18.777 28.7585 18.1687C28.9016 17.8416 28.9505 17.4811 28.8997 17.1277C28.8489 16.7744 28.7004 16.4422 28.471 16.1687C28.0085 15.5958 27.1606 15.1229 26.0147 15.1041C24.0668 15.0708 23.421 15.6979 23.196 16.0041C23.047 16.2064 22.951 16.4427 22.9168 16.6916V16.7041ZM27.6043 30.2083C27.6043 30.7608 27.3848 31.2907 26.9941 31.6814C26.6034 32.0721 26.0735 32.2916 25.521 32.2916C24.9685 32.2916 24.4386 32.0721 24.0479 31.6814C23.6572 31.2907 23.4377 30.7608 23.4377 30.2083C23.4377 29.6558 23.6572 29.1259 24.0479 28.7352C24.4386 28.3445 24.9685 28.125 25.521 28.125C26.0735 28.125 26.6034 28.3445 26.9941 28.7352C27.3848 29.1259 27.6043 29.6558 27.6043 30.2083Z" />
    </IconBase>
);

const DROPTYPE_LATEST = 'latest';
const DROPTYPE_ONGOING = 'ongoing';
const DROPTYPE_UPCOMING = 'upcoming';
const DROPTYPE_ENDED = 'ended';
const DROPTYPE_PARTICIPATED = 'participated';

const AirDropButton = styled.button(({ theme }) => css`
    padding: 7px 0;
    border-radius: 10px;
    border: 0;
    background: ${theme.colors.grey};
    color: ${theme.colors.text_primary};
    width: 100%;

    &.active {
        font-family: 'THICCCBOI-BOLD';
        background-color: ${theme.colors.gradients.grey};
        color: ${theme.colors.actual_white};
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

const AirdropData = [
	{
		'amount': '265,000',
		'asset': 'SOL',
		'ends': '30-01-22',
		'filled': '800/1000',
		'participating': true,
		'project': 'uc.finance',
        'filledPercentage': '80',
        'status': DROPTYPE_ONGOING,
	},
    {
		'amount': '80,000',
		'asset': 'LUMOS',
		'ends': '30-01-22',
		'filled': '350/500',
		'participating': true,
		'project': 'KASGAMES',
        'filledPercentage': '70',
        'status': DROPTYPE_UPCOMING,
	},
    {
		'amount': '678,246',
		'asset': 'KIN',
		'ends': '30-01-22',
		'filled': '1000/5000',
		'participating': false,
		'project': 'rici9761',
        'filledPercentage': '50',
        'status': DROPTYPE_ENDED,
	},
    {
		'amount': '47,282',
		'asset': 'COPE',
		'ends': '30-01-22',
		'filled': '500/2000',
		'participating': false,
		'project': 'CWIN.GB',
        'filledPercentage': '25',
        'status': DROPTYPE_ENDED,
	},
    {
		'amount': '47,282',
		'asset': '',
		'ends': '30-01-22',
		'filled': '500/2000',
		'participating': true,
		'project': 'Unknown',
        'filledPercentage': '25',
        'status': DROPTYPE_ENDED,
	},
];

const AirDropsOngoing = AirdropData.filter(airDrops => airDrops.status === DROPTYPE_ONGOING);
const AirDropsEnded = AirdropData.filter(airDrops => airDrops.status === DROPTYPE_ENDED);
const AirDropsUpcoming = AirdropData.filter(airDrops => airDrops.status === DROPTYPE_UPCOMING);
const AirDropsParticipated = AirdropData.filter(airDrops => airDrops.participating && airDrops.status === DROPTYPE_ENDED);

const AirDropIcon = styled.img`
    width: 28px;
    height: 28px;
    min-width: 28px;
    min-height: 28px;
`;

export const convertAssetToIcon = (asset) => {
    if (asset === 'SOL'){ return <SolIcon /> }
    if (asset === 'LUMOS'){ return <LraIcon /> }
    if (asset === 'KIN'){ return <KinIcon /> }
    if (asset === 'COPE'){ return <CopeIcon /> }
    return <i className="material-icons">token</i>
}

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
										<NewsIcon />
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
										<FaqIcon />
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