import React from "react";
import styled, { css } from "styled-components";
import { PageBody } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import GradientButton from "../Components/GradientButton";
import { SecondaryButton, LinkButton } from "../Components/Buttons";
import Paragraph from "../Components/Paragraph";

// Images
import ShowCaseMobile from '../Images/showcase-mobile.svg';
import IconSolana from '../Images/icon-circle-solana.svg';
import IconLumosRewards from '../Images/icon-circle-lumos-rewards.svg';
import IconKin from '../Images/icon-circle-kin.svg';
import IconCope from '../Images/icon-circle-cope.svg';
import {
    HandShakeIcon,
    GlobeIcon,
    DoubleDipIcon,
    FeeJarIcon
} from '../Components/SVGComponents';


const ShowcaseBase = styled.div(({ theme }) => css`
    min-height: 600px;

    .tablet {
        position: absolute;
        z-index: 2;
        left: 0px;
        bottom: 0;
    }
    .laptop {
        position: absolute;
        z-index: 1;
        left: 70px; 
    }
`);

const Card = styled.div(({ theme }) => css`
    background: ${theme.colors.card_bg};
    border-radius: 20px;
`);

const IconCard = ({ icon, title, text, children }) => (
    <div className="col-10 col-sm-6 col-md-6 col-xl-3 mb-4 mb-xl-0">
        <Card className="p-4 text-center mb-4 mb-xl-0 h-100">
            {children}
            {/* Make these icons tomorrow */}
            <Heading size="24px" bold>{title}</Heading>
            <Paragraph size="14px">
                {text}
            </Paragraph>
        </Card>
    </div>
);

const GradientHeading = styled(Heading)(({ theme }) => css`
	@supports (-webkit-background-clip: text){
		background: -webkit-linear-gradient(300deg, #FCE608, #FF7586, #B372CE, #6F86FF);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
`);

const Showcase = () => (
    <ShowcaseBase className="position-relative mb-5 w-100 d-flex justify-content-center">
        <img className="img-fluid" src={ShowCaseMobile} alt="Showcase" />
    </ShowcaseBase>
);

const Home = () => (
    <PageBody className="container-fluid">
        <div className="row pt-5 d-flex justify-content-center container m-auto">
            <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                <div className="my-5">
                    <Heading size="48px" bold>
                        Non-Custodial,<br />
                        Peer-to-Peer Trading
                    </Heading>
					<GradientHeading size="48px" bold>For Solana</GradientHeading>
                    <div className="row mt-5 pt-5">
                        <div className="col-12 col-md-6">
                            <GradientButton
                                text="Sign Up"
                                className="w-100 mb-3"
                                fontSize="20px"
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <SecondaryButton
                                className="w-100"
                                round
                                color="navyGrey"
                                textColor="white"
                                text="How it Works"
                                boldText={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-11 col-lg-6">
                <Showcase />
            </div>
        </div>
        <div className="container">
            <div className="row justify-content-center mb-4">
                <IconCard
                    title="Solana"
                    icon={IconSolana}
                    text="The open-source crypto with the fastest responsive speed and rapidly growing ecosystem."
                />
                <IconCard
                    title="Lumos Rewards"
                    icon={IconLumosRewards}
                    text="Our SPL asset focused on providing users an incentive to trade regularly, event participation & referrals."
                />
                <IconCard
                    title="KIN"
                    icon={IconKin}
                    text="The open-source crypto with the fastest responsive speed and rapidly growing ecosystem."
                />
                <IconCard
                    title="COPE"
                    icon={IconCope}
                    text="The open-source crypto with the fastest responsive speed and rapidly growing ecosystem."
                />
            </div>
            <div className="row justify-content-between align-items-center py-6">
                <div className="col-12 col-xl-4 mb-5 mb-xl-0">
                    <Heading size="48px">
                        Your Coins <br />
                        In Your Seize
                    </Heading>
                    <Paragraph size="22px">Lumos Exchange is the first non-custodial peer-to-peer platform for Solana. We allow users trade with each other in safety, and protects your wallet from theft.</Paragraph>
                    <LinkButton
                        text="View The Marketplace"
                        className="mt-5 p-0"
                        color="black"
                        textColor="yellow"
                        onClick={null}
                        hasIcon
                        fontSize="28px"
                    />
                </div>
                <div className="col-12 col-xl-8">
                    <div className="row">
                        <div className="col-12 col-lg-6 mb-3">
                            <Card className="d-flex p-4 h-100">
                                <HandShakeIcon alt="Non Custodial" />
                                <div className="ms-4 d-flex flex-column justify-content-center">
                                    <Heading size="24px">Non-custodial</Heading>
                                    <Paragraph size="18px">
                                        You exchange directly with another person, fast and easy. Say goodbye to slow middleman.
                                    </Paragraph>
                                </div>
                            </Card>
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <Card className="d-flex p-4 h-100">
                                <FeeJarIcon alt="No Trading Fee" />
                                <div className="ms-4 d-flex flex-column justify-content-center">
                                    <Heading size="24px">No Trading Fee</Heading>
                                    <Paragraph size="18px">
                                    No more handling fee and custody. You have full control over your wallet.
                                    </Paragraph>
                                </div>
                            </Card>
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <Card className="d-flex p-4 h-100">
                                <GlobeIcon alt="Worldwide" />
                                <div className="ms-4 d-flex flex-column justify-content-center">
                                    <Heading size="24px">Trade the Network</Heading>
                                    <Paragraph size="18px">
                                        Our service is available around the world with 30+ ways to pay, including bank transfer, PayPal and more.
                                    </Paragraph>
                                </div>
                            </Card>
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <Card className="d-flex p-4 h-100">
                                <DoubleDipIcon alt="Secured" />
                                <div className="ms-4 d-flex flex-column justify-content-center">
                                    <Heading size="24px">Double Dip Income</Heading>
                                    <Paragraph size="18px">
                                        All users are protected by end-to-end encrypted message and escrow accounts. Trade safely!
                                    </Paragraph>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PageBody>
);

export default Home;
