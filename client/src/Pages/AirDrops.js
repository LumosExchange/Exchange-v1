import React, { useState } from "react";
import styled, { css } from "styled-components";
import { PageBody } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import Card from "../Components/Card";
import IconNews from "../Images/icon-news.svg";
import IconFaq from "../Images/icon-faq.svg";
import { Link } from "react-router-dom";
import EmailTemplate from "../Emails/EmailTemplate";

const AirDropButton = styled.button(({ theme }) => css`
    padding: 7px 0;
    border-radius: 10px;
    border: 0;
    background: ${theme.colors.grey};
    color: ${theme.colors.white};
    width: 100%;

    &:focus, &:hover {
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
                                <AirDropButton onClick={() => selectAirdrop('latest')}>Latest</AirDropButton>
                            </div>
                            <div className="col-4 col-md-2">
                                <AirDropButton onClick={() => selectAirdrop('ongoing')}>Ongoing</AirDropButton>
                            </div>
                            <div className="col-4 col-md-2">
                                <AirDropButton onClick={() => selectAirdrop('upcoming')}>Upcoming</AirDropButton>
                            </div>
                            <div className="col-4 col-md-2">
                                <AirDropButton onClick={() => selectAirdrop('ended')} className="mt-2 mt-md-0">Ended</AirDropButton>
                            </div>
                            <div className="col-4 col-md-2">
                                <AirDropButton onClick={() => selectAirdrop('participated')} className="mt-2 mt-md-0">Participated</AirDropButton>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        {selectedAirdrop === 'latest' && <div>latest</div>}
                    </div>
                </div>
            </div>
        </PageBody>
    );
}

export default AirDrops;