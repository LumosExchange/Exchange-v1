import React, { useState } from "react";
import styled, { css } from "styled-components";
import { PageBody, StyledDropdown } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import GradientButton from "../Components/GradientButton";
import PrimaryButton from "../Components/Buttons";
import Paragraph from "../Components/Paragraph";

const TAB_TITLE_BASIC = 'basic';
const TAB_TITLE_SECURITY = 'security';
const TAB_TITLE_KYC = 'kyc';

const ContentTab = styled.div(({ theme }) => css`
    background: ${theme.colors.grey};
    border-radius: 3px;
    border: 2px solid ${theme.colors.yellow};

    .bronze { color: ${theme.colors.bronze}; };
    .silver { color: ${theme.colors.silver}; };
    .gold { color: ${theme.colors.gold}; };
`);

const EditableOption = styled.div(({ theme }) => css`
    background: ${theme.colors.white};
    border-radius: 3px;
`);

const ProfileInitials = styled.div(({ theme }) => css`
    width: 75px;
    height: 75px;
    border-radius: 50px;
    background: ${theme.colors.yellow};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.black};
    font-size: 30px;
    font-family: 'THICCCBOI-BOLD';
`);

const ProfileTab = styled.button(({ theme }) => css`
    background: ${theme.colors.white};
    padding: 10px 30px;
    border-radius: 5px 5px 0 0; 
    border: 0;
    margin-right: 16px;

    &.active {
        background: ${theme.colors.yellow};
        font-family: 'THICCCBOI-BOLD';
    }
`);

const AccountTierCard = styled.div(({ theme, tier }) => css`
    background-color: ${theme.colors.white};
    background-image: linear-gradient(150deg,
            ${theme.colors[tier]} 0%,
            ${theme.colors[tier]} 20%,
            ${theme.colors[tier]} 50%,
            rgba(255,255,255,0.6) 100%
        );
    color: ${theme.colors.white};

    .inner {
        background-color: ${theme.colors.white};
    }
`);

const AccountTier = ({ tier, children }) => (
    <AccountTierCard tier={tier} className="d-flex flex-column p-2 rounded mb-3">
        <div className="inner rounded p-3">
            {children}
        </div>
    </AccountTierCard>
);

const BasicTab = () => {
    const [selectedTheme, selectTheme] = useState('');
    const [selectedTimezone, selectTimezone] = useState('');
    const [selectedCurrency, selectCurrency] = useState('');

    console.log('selected theme is', selectedTheme);
    console.log('time zone is', selectedTimezone);
    console.log('currency is', selectedCurrency);

    return (
        <ContentTab>
            <div className="d-flex p-4 row">
                <div className="col-10 d-flex">
                    <ProfileInitials>KC</ProfileInitials>
                    <div className="d-flex ms-3 flex-column justify-content-center">
                        <Paragraph size="20px" className="mb-0">mekeirc@gmail.com</Paragraph>
                        <Paragraph size="20px" className="mb-0">UTC - London</Paragraph>
                    </div>
                </div>
                <div className="col-2 d-flex bronze">
                    <i className="material-icons me-2">emoji_events</i>
                    <Paragraph>Bronze Account</Paragraph>
                </div>
            </div>
            <div className="d-flex p-4 row">
                    <div className="col-12 col-lg-4">
                        <EditableOption className="p-4">
                            <Heading color="black" size="20px" bold>Theme</Heading>
                            <StyledDropdown
                                className="w-100"
                                value={selectedTheme}
                                onChange={e => selectTheme(e.currentTarget.value)}
                            >
                                <option>Dark</option>
                                <option>Light</option>
                            </StyledDropdown>
                        </EditableOption>
                    </div>
                    <div className="col-12 col-lg-4 my-3 my-lg-0">
                        <EditableOption className="p-4">
                            <Heading color="black" size="20px" bold>Timezone</Heading>
                            <StyledDropdown
                                className="w-100"
                                value={selectedTimezone}
                                onChange={e => selectTimezone(e.currentTarget.value)}
                            >
                                <option>UTC+0</option>
                                <option>UTC+1</option>
                            </StyledDropdown>
                        </EditableOption>
                    </div>
                    <div className="col-12 col-lg-4">
                        <EditableOption className="p-4">
                            <Heading color="black" size="20px" bold>Local Currency</Heading>
                            <StyledDropdown
                                className="w-100"
                                value={selectedCurrency}
                                onChange={e => selectCurrency(e.currentTarget.value)}
                            >
                                <option>British Pounds (GBP)</option>
                                <option>Didgeridollars (AUS)</option>
                            </StyledDropdown>
                        </EditableOption>
                    </div>
            </div>
            <div className="d-flex px-4 row">
                <div className="col-12 col-lg-2 pb-4">
                    <PrimaryButton text="Save" className="w-100" />
                </div>
            </div>
            <div className="d-flex px-4 row py-4">
                <div className="col-12">
                    <Heading size="18px">Account Limits</Heading>
                </div>
                <div className="col-12 col-lg-4">
                    <AccountTier tier="bronze">
                        <Heading size="20px" color="black" bold>Bronze</Heading>
                        <Paragraph size="20px" color="black" className="mb-0">Trade Limit: 5 SOL</Paragraph>
                    </AccountTier>
                </div>
                <div className="col-12 col-lg-4">
                    <AccountTier tier="silver">
                        <Heading size="20px" color="black" bold>Silver</Heading>
                        <Paragraph size="20px" color="black" className="mb-0">Trade Limit: 10 SOL</Paragraph>
                    </AccountTier>
                </div>
                <div className="col-12 col-lg-4">
                    <AccountTier tier="gold">
                        <Heading size="20px" color="black" bold>Gold</Heading>
                        <Paragraph size="20px" color="black" className="mb-0">Trade Limit: 25 SOL</Paragraph>
                    </AccountTier>
                </div>
                <div className="col-12 col-lg-4">
                    <AccountTier tier="diamond">
                        <Heading size="20px" color="black" bold>Diamond</Heading>
                        <Paragraph size="20px" color="black" className="mb-0">Trade Limit: 50 SOL</Paragraph>
                    </AccountTier>
                </div>
            </div>
        </ContentTab>
    );
}

const SecurityTab = () => (
    <ContentTab className="text-white">Security Goes here</ContentTab>
);

const KycTab = () => (
    <ContentTab className="text-white">KYC Goes here</ContentTab>
);

const Profile = () => {
    const [selectedProfileTab, selectProfileTab] = useState(TAB_TITLE_BASIC);

    return(
        <PageBody>
            <div className="container pt-5">
                <div className="row">
                    <div className="col-12 d-flex justify-content-start">
                        <ProfileTab
                            onClick={ () => selectProfileTab(TAB_TITLE_BASIC) }
                            className={ selectedProfileTab === TAB_TITLE_BASIC && 'active'}
                        >
                            Basic Info
                        </ProfileTab>
                        <ProfileTab
                            onClick={ () => selectProfileTab(TAB_TITLE_SECURITY) }
                            className={ selectedProfileTab === TAB_TITLE_SECURITY && 'active'}
                        >
                            Security
                        </ProfileTab>
                        <ProfileTab
                            onClick={ () => selectProfileTab(TAB_TITLE_KYC) }
                            className={ selectedProfileTab === TAB_TITLE_KYC && 'active'}
                        >
                            KYC
                        </ProfileTab>
                    </div>
                    {selectedProfileTab === 'basic' && <BasicTab />}
                    {selectedProfileTab === 'security' && <SecurityTab />}
                    {selectedProfileTab === 'kyc' && <KycTab />}
                </div>
            </div>
        </PageBody>
    );
}

export default Profile;
