import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
    SolIconAirdrop,
    KinIconAirdrop,
    LraIconAirdrop,
    CopeIconAirdrop,
    NewsIconAirdrop,
    FaqIconAirdrop,
} from "../Components/SVGComponents";

export const DROPTYPE_LATEST = 'latest';
export const DROPTYPE_ONGOING = 'ongoing';
export const DROPTYPE_UPCOMING = 'upcoming';
export const DROPTYPE_ENDED = 'ended';
export const DROPTYPE_PARTICIPATED = 'participated';

export const AirDropButton = styled.button(({ theme }) => css`
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

export const AirDropIcon = styled.img`
    width: 28px;
    height: 28px;
    min-width: 28px;
    min-height: 28px;
`;

export const convertAssetToIcon = (asset) => {
    if (asset === 'SOL'){ return <SolIconAirdrop /> }
    if (asset === 'LUMOS'){ return <LraIconAirdrop /> }
    if (asset === 'KIN'){ return <KinIconAirdrop /> }
    if (asset === 'COPE'){ return <CopeIconAirdrop /> }
    return <i className="material-icons">token</i>
}

export const AirdropData = [
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
		'participating': false,
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