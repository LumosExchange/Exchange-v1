import React from 'react';
import styled, { css } from 'styled-components';

const QuadIconBase = styled.svg(({ theme }) => css`
    min-width: 72px;
    margin: auto;

    &.handshake g {
        polyline, path, polygon, line {
            stroke: ${theme.colors.primary_cta};
        }
        rect {
            fill: ${theme.colors.primary_cta};
        }
    }

    &.moneyjar g {
        rect, circle {
            stroke: ${theme.colors.primary_cta};
        } 
        .fill {
            stroke: initial;
            fill: ${theme.colors.primary_cta};
        }
    }

    &.globe g {
        circle, path, polyline {
            stroke: ${theme.colors.primary_cta};
        }
    }

    &.double-dip g {
        circle, path, polyline {
            stroke: ${theme.colors.primary_cta};
        }
        .fill {
            stroke: initial;
            fill: ${theme.colors.primary_cta};
        }
    }
`);

export const HandShakeIcon = () => (
    <QuadIconBase width="72px" height="72px" viewBox="0 0 72 72" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="handshake">
        <title>handshake-star</title>
        <g id="handshake-star" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polyline id="Path-11" strokeWidth="2" points="1 35 16 35 20 32 30 32"></polyline>
            <path d="M30,37 L32.7074615,33.8412949 C34.7972657,31.40319 37.8481104,30 41.0592841,30 L47.4644661,30 C49.7282304,30 51.8992769,30.8992769 53.5,32.5 L54.8284271,33.8284271 C55.5785726,34.5785726 56.5959883,35 57.6568542,35 L71,35 L71,35" id="Path-12" strokeWidth="2"></path>
            <polyline id="Path-13" strokeWidth="2" points="27 39 24 43 24 45 27 48 29 48 35 43 36 43 37 44 39 44 45 44 51 38"></polyline>
            <polyline id="Path-14" strokeWidth="2" points="71 55 60 55 60 52 56 48"></polyline>
            <polyline id="Path-15" strokeWidth="2" points="60 55 59 56 56 57 55 56 48 49"></polyline>
            <polyline id="Path-15-Copy" strokeWidth="2" points="56 57 55 61 51 62 48 59 41 52"></polyline>
            <polyline id="Path-15-Copy-2" strokeWidth="2" points="49 61 48.2 64.2 45 65 42.6 62.6 37 57"></polyline>
            <path d="M38,67 C37.5075841,68.9696638 35.9696638,70.5075841 34,71 L34,71 L34,71 L31.6,68.6 L26,63" id="Path-15-Copy-3" strokeWidth="2" transform="translate(32.000000, 67.000000) scale(-1, 1) translate(-32.000000, -67.000000) "></path>
            <path d="M33,63 C32.5075841,64.9696638 30.9696638,66.5075841 29,67 L29,67 L29,67 L26.6,64.6 L21,59" id="Path-15-Copy-4" strokeWidth="2" transform="translate(27.000000, 63.000000) scale(-1, 1) translate(-27.000000, -63.000000) "></path>
            <path d="M28,59 C27.5075841,60.9696638 25.9696638,62.5075841 24,63 L24,63 L24,63 L21.6,60.6 L16,55" id="Path-15-Copy-5" strokeWidth="2" transform="translate(22.000000, 59.000000) scale(-1, 1) translate(-22.000000, -59.000000) "></path>
            <path d="M24,55 C23.5075841,56.9696638 21.9696638,58.5075841 20,59 L20,59 L20,59 L17.6,56.6 L12,51" id="Path-15-Copy-6" strokeWidth="2" transform="translate(18.000000, 55.000000) scale(-1, 1) translate(-18.000000, -55.000000) "></path>
            <polyline id="Path-16" strokeWidth="2" points="44 65 43 67 41 69 40 69 38 67 37 66 37 64 20 47 17 47 12 53 12 54 12 57 2 57"></polyline>
            <line x1="49" y1="41" x2="54" y2="46" id="Path-17" strokeWidth="2"></line>
            <polygon id="Star" strokeWidth="2" points="36 21.75 31.0038254 24.3766445 31.9580098 18.8133222 27.9160196 14.8733555 33.5019127 14.0616778 36 9 38.4980873 14.0616778 44.0839804 14.8733555 40.0419902 18.8133222 40.9961746 24.3766445"></polygon>
            <rect id="Rectangle" transform="translate(27.000000, 8.500000) rotate(-49.000000) translate(-27.000000, -8.500000) " x="26" y="6" width="2" height="5" rx="1"></rect>
            <rect id="Rectangle-Copy-2" x="35" y="2" width="2" height="4" rx="1"></rect>
            <rect id="Rectangle-Copy" transform="translate(45.000000, 8.500000) scale(-1, 1) rotate(-49.000000) translate(-45.000000, -8.500000) " x="44" y="6" width="2" height="5" rx="1"></rect>
        </g>
    </QuadIconBase>
);

export const FeeJarIcon = () => (
    <QuadIconBase width="72px" height="72px" viewBox="0 0 72 72" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="moneyjar">
        <title>free-trading</title>
        <g id="free-trading" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <rect id="Rectangle" strokeWidth="2" x="32.5" y="60.5" width="18" height="5" rx="2.5"></rect>
            <rect id="Rectangle-Copy-3" strokeWidth="2" x="38.5" y="54.5" width="18" height="5" rx="2.5"></rect>
            <rect id="Rectangle-Copy-4" strokeWidth="2" x="37.5" y="49.5" width="18" height="5" rx="2.5"></rect>
            <rect id="Rectangle-Copy-5" strokeWidth="2" x="37.5" y="43.5" width="18" height="5" rx="2.5"></rect>
            <rect id="Rectangle-Copy-6" strokeWidth="2" x="33.5" y="38.5" width="18" height="5" rx="2.5"></rect>
            <rect id="Rectangle-Copy-7" strokeWidth="2" transform="translate(27.500000, 38.000000) rotate(-50.000000) translate(-27.500000, -38.000000) " x="18.5" y="35.5" width="18" height="5" rx="2.5"></rect>
            <rect id="Rectangle-Copy-8" strokeWidth="2" transform="translate(22.500000, 54.000000) rotate(50.000000) translate(-22.500000, -54.000000) " x="13.5" y="51.5" width="18" height="5" rx="2.5"></rect>
            <rect id="Rectangle" className="fill"  x="18" y="16" width="3" height="4"></rect>
            <rect id="Rectangle-Copy-2" className="fill"  x="51" y="16" width="3" height="4"></rect>
            <rect id="Base" className="fill"  x="0" y="70" width="72" height="2" rx="2"></rect>
            <rect id="Rectangle" strokeWidth="2" x="12.5" y="20.5" width="47" height="50" rx="8"></rect>
            <rect id="Rectangle-Copy" strokeWidth="2" x="16.5" y="8.5" width="39" height="7" rx="3"></rect>
            <circle id="Oval" strokeWidth="2" cx="5.5" cy="16.5" r="4"></circle>
            <circle id="Oval-Copy" strokeWidth="2" cx="66" cy="6" r="4.5"></circle>
        </g>
    </QuadIconBase>
);

export const GlobeIcon = () => (
    <QuadIconBase width="72px" height="72px" viewBox="0 0 72 72" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="globe">
        <title>globe</title>
        <g id="globe" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <circle id="Oval-Copy-2" strokeWidth="2" cx="5" cy="36" r="3.5"></circle>
            <circle id="Oval-Copy" strokeWidth="2" cx="67" cy="36" r="3.5"></circle>
            <circle id="Oval" strokeWidth="2" cx="36" cy="66" r="3.5"></circle>
            <circle id="Oval-Copy-3"  strokeWidth="2" cx="36" cy="5" r="3.5"></circle>
            <path d="M5,67 C10.8946726,65.7897131 15.6992703,63.2609774 19.4137931,59.4137931 C23.1283159,55.5666088 25.6570515,50.7620111 27,45" id="Path-6-Copy-2"  strokeWidth="2" transform="translate(16.000000, 56.000000) rotate(90.000000) translate(-16.000000, -56.000000) "></path>
            <path d="M45,67 C51.2933996,65.8447261 56.2129398,63.430933 59.7586207,59.7586207 C63.3043015,56.0863084 65.7180946,51.1667681 67,45" id="Path-6-Copy-3"  strokeWidth="2" transform="translate(56.000000, 56.000000) scale(-1, 1) rotate(90.000000) translate(-56.000000, -56.000000) "></path>
            <path d="M5,27 C10.8946726,25.7897131 15.6992703,23.2609774 19.4137931,19.4137931 C23.1283159,15.5666088 25.6570515,10.7620111 27,5" id="Path-6-Copy-5"  strokeWidth="2" transform="translate(16.000000, 16.000000) scale(1, -1) rotate(90.000000) translate(-16.000000, -16.000000) "></path>
            <path d="M45,27 C50.8946726,25.7897131 55.6992703,23.2609774 59.4137931,19.4137931 C63.1283159,15.5666088 65.6570515,10.7620111 67,5" id="Path-6-Copy-4"  strokeWidth="2" transform="translate(56.000000, 16.000000) scale(-1, -1) rotate(90.000000) translate(-56.000000, -16.000000) "></path>
            <g id="Group-2" transform="translate(14.000000, 14.000000)" >
                <circle id="Oval" strokeWidth="2" cx="22" cy="22" r="20.5"></circle>
                <polyline id="Path-7" strokeWidth="2" points="32.195122 37.5609756 32.195122 30.0487805 26.8292683 30.0487805 25.7560976 26.8292683 25.7560976 22.5365854 27.902439 20.3902439 30.0487805 20.3902439 33.2682927 21.4634146 36.4878049 21.4634146 38.6341463 22.5365854 39.7073171 24.6829268 40.7804878 26.8292683"></polyline>
                <polyline id="Path-8" strokeWidth="2" points="16.097561 40.7804878 18.2439024 37.5609756 19.3170732 35.4146341 20.3902439 33.2682927 19.3170732 31.1219512 15.0243902 28.9756098 12.8780488 27.902439 9.65853659 27.902439 9.65853659 31.1219512 9.65853659 33.2682927 11.804878 35.4146341 12.8780488 36.4878049 12.8780488 37.5609756 12.8780488 39.7073171"></polyline>
                <path d="M3.2195122,24.6829268 L5.36585366,24.6829268 L7.51219512,23.6097561 L9.65853659,21.4634146 L11.804878,20.3902439 L13.9512195,18.2439024 L15.0243902,17.1707317 L16.097561,15.0243902 L16.097561,12.8780488 L13.9512195,12.8780488 L12.8780488,12.8780488 L11.804878,12.8780488 L10.7317073,13.9512195 L8.58536585,12.8780488 L8.58536585,11.804878 C9.30081301,11.0894309 9.65853659,10.7317073 9.65853659,10.7317073 C9.65853659,10.7317073 10.3739837,10.3739837 11.804878,9.65853659 L11.804878,8.58536585 L13.9512195,7.51219512 C15.3821138,6.79674797 16.097561,6.43902439 16.097561,6.43902439 C16.097561,6.43902439 16.097561,7.15447154 16.097561,8.58536585 L17.1707317,9.65853659 L17.1707317,4.29268293 L19.3170732,8.58536585 L20.3902439,9.65853659 L22.5365854,9.65853659 L23.6097561,7.51219512 L24.6829268,6.43902439 L24.6829268,5.36585366 C25.398374,4.6504065 25.7560976,4.29268293 25.7560976,4.29268293 C25.7560976,4.29268293 26.1138211,3.93495935 26.8292683,3.2195122" id="Path-9" strokeWidth="2"></path>
                <path d="M36.4878049,8.58536585 L32.195122,11.804878 L30.0487805,12.8780488 L28.9756098,15.0243902 C28.2601626,15.7398374 27.902439,16.097561 27.902439,16.097561 C27.902439,16.097561 30.0487805,17.1707317 30.0487805,17.1707317 C30.0487805,17.1707317 32.195122,17.1707317 33.2682927,17.1707317 C33.9837398,17.1707317 34.699187,17.1707317 35.4146341,17.1707317 C36.8455285,16.4552846 37.5609756,16.4552846 37.5609756,17.1707317 C37.5609756,18.2439024 38.6341463,18.2439024 38.6341463,18.2439024 C38.6341463,18.2439024 40.7804878,19.3170732 40.7804878,19.3170732" id="Path-10" strokeWidth="2"></path>
            </g>
        </g>
    </QuadIconBase>
);

export const DoubleDipIcon = () => (
    <QuadIconBase width="72px" height="72px" viewBox="0 0 72 72" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="double-dip">
        <title>double-dip</title>
        <g id="double-dip" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <circle id="Oval" stroke="#F1DF27" strokeWidth="2" cx="9.5" cy="62.5" r="3"></circle>
            <circle id="Oval-Copy-7" stroke="#F1DF27" strokeWidth="2" cx="65" cy="59" r="2.5"></circle>
            <circle id="Oval-Copy-8" stroke="#F1DF27" strokeWidth="2" cx="65" cy="7" r="2.5"></circle>
            <circle id="Oval-Copy-9" stroke="#F1DF27" strokeWidth="2" cx="11.5" cy="6.5" r="4"></circle>
            <circle id="Oval-Copy" cx="18" cy="66" r="2" className="fill"></circle>
            <circle id="Oval-Copy-2" cx="6" cy="51" r="2" className="fill"></circle>
            <circle id="Oval-Copy-3" cx="2.5" cy="16.5" r="1.5" className="fill"></circle>
            <circle id="Oval-Copy-4" cx="22.5" cy="2.5" r="1.5" className="fill"></circle>
            <circle id="Oval-Copy-5" cx="55.5" cy="5.5" r="1.5" className="fill"></circle>
            <circle id="Oval-Copy-6" cx="55.5" cy="64.5" r="1.5" className="fill"></circle>
            <path d="M36,70 C31.3333333,67.3333333 26,63.3333333 20,58 C12.0497343,50.9330971 8,44.6336553 8,41 C8,25.6666667 8,17 8,15 C14.5914196,15.183168 19.924753,14.183168 24,12 C28.075247,9.81683195 32.075247,6.48349862 36,2 M36,70 C40.6666667,67.3333333 46,63.3333333 52,58 C59.9502657,50.9330971 64,44.6336553 64,41 C64,25.6666667 64,17 64,15 C57.4085804,15.183168 52.075247,14.183168 48,12 C43.924753,9.81683195 39.924753,6.48349862 36,2" id="Combined-Shape" stroke="#F1DF27" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <g id="Group" transform="translate(25.000000, 23.000000)" fillRule="nonzero" stroke="#F1DF27" strokeWidth="2">
                <path d="M11,1.5 C12.243125,1.5 13.3682151,2.00328544 14.1824648,2.81753517 C14.9967146,3.6317849 15.5,4.756875 15.5,6 C15.5,7.243125 14.9967146,8.3682151 14.1824648,9.18246483 C13.3682151,9.99671456 12.243125,10.5 11,10.5 C9.756875,10.5 8.6317849,9.99671456 7.81753517,9.18246483 C7.00328544,8.3682151 6.5,7.243125 6.5,6 C6.5,4.756875 7.00328544,3.6317849 7.81753517,2.81753517 C8.6317849,2.00328544 9.756875,1.5 11,1.5 Z" id="Path"></path>
                <path d="M11,12.5 C12.8540977,12.5 15.7576175,13.5090493 17.8887144,15.4464101 C19.3814295,16.8034238 20.5,18.6477669 20.5,21 L20.5,21 L20.5,23 C20.5,23.4142136 20.3321068,23.7892136 20.0606602,24.0606602 C19.7892136,24.3321068 19.4142136,24.5 19,24.5 L19,24.5 L3,24.5 C2.58578644,24.5 2.21078644,24.3321068 1.93933983,24.0606602 C1.66789322,23.7892136 1.5,23.4142136 1.5,23 L1.5,23 L1.5,21 C1.5,18.6477669 2.61857051,16.8034238 4.11128562,15.4464101 C6.24238246,13.5090493 9.14590234,12.5 11,12.5 L11,12.5 Z" id="Path"></path>
            </g>
            <path d="M36,61 C32.6666667,59.0392157 28.8571429,56.0980392 24.5714286,52.1764706 C18.8926673,46.9802185 16,42.348276 16,39.6764706 C16,28.4019608 16,22.0294118 16,20.5588235 C20.7081569,20.6935059 24.5176807,19.9582118 27.4285714,18.3529412 C30.3394622,16.7476706 33.196605,14.2966902 36,11 M36,61 C39.3333333,59.0392157 43.1428571,56.0980392 47.4285714,52.1764706 C53.1073327,46.9802185 56,42.348276 56,39.6764706 C56,28.4019608 56,22.0294118 56,20.5588235 C51.2918431,20.6935059 47.4823193,19.9582118 44.5714286,18.3529412 C41.6605378,16.7476706 38.803395,14.2966902 36,11" id="Combined-Shape" stroke="#F1DF27" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <rect id="Rectangle" x="45" y="32" width="7" height="2" rx="1" className="fill"></rect>
            <rect id="Rectangle-Copy" x="45" y="29" width="7" height="2" rx="1" className="fill"></rect>
            <rect id="Rectangle-Copy-3" x="20" y="32" width="7" height="2" rx="1" className="fill"></rect>
            <rect id="Rectangle-Copy-2" x="20" y="29" width="7" height="2" rx="1" className="fill"></rect>
        </g>
    </QuadIconBase>
);

const Cope = styled.svg(({ theme }) => css`
    min-width: 90px;
    margin: auto;

    g {
        .fill { fill: ${theme.colors.text_primary} }
        .stroke { stroke: ${theme.colors.text_primary} }
    }
`);

export const CopeIcon = () => (
    <Cope width="90px" height="90px" viewBox="0 0 90 90" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <title>Artboard</title>
        <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <circle id="Oval" className="stroke" strokeWidth="2" cx="45" cy="45" r="44"></circle>
            <circle id="Oval" className="fill" cx="30" cy="45" r="5"></circle>
            <circle id="Oval-Copy" className="fill" cx="45" cy="45" r="5"></circle>
            <circle id="Oval-Copy-2" className="fill" cx="60" cy="45" r="5"></circle>
        </g>
    </Cope>
);