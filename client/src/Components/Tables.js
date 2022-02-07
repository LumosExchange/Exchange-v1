import styled, { css } from 'styled-components';

const StyledTable = styled.table(({ theme }) => css`
    color: ${theme.colors.text_primary};
    font-size: 18px;
    
    thead th {
        background: ${theme.colors.table_head};
        padding: 20px;
        color: ${theme.colors.actual_white};
        font-family: 'THICCCBOI-BOLD';
    }
    td, tr {
        padding: 20px;
    }

    span {
        color: ${theme.colors.primary_cta};
    }
`);

export default StyledTable;

export const AirDropTable = styled.table(({ theme }) => css`
    color: ${theme.colors.text_primary};
    font-size: 14px;

    thead tr {
        border-top: 1px solid ${theme.colors.secondary_link};
        border-bottom: 1px solid ${theme.colors.secondary_link};
        font-family: 'THICCCBOI-BOLD';
    }
    
    thead th, td, tr {
        padding: 19px;
    }

    span {
        color: ${theme.colors.primary_cta};
    }

    tbody tr {
        &:nth-of-type(even){
            background: ${theme.colors.table_stripe};
        }

        .buttons { width: 140px };
        .icons { width: 75px };
    }
`);