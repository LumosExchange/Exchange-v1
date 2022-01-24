import styled, { css } from 'styled-components';

const StyledTable = styled.table(({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 18px;
    
    thead th {
        background: ${theme.colors.six9Grey};
        padding: 20px;
    }
    td, tr {
        padding: 20px;
    }

    span {
        color: ${theme.colors.yellow};
    }
`);

export default StyledTable;

export const AirDropTable = styled.table(({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 14px;

    thead tr {
        border-top: 1px solid ${theme.colors.six9Grey};
        border-bottom: 1px solid ${theme.colors.six9Grey};
        font-family: 'THICCCBOI-BOLD';
    }
    
    thead th, td, tr {
        padding: 19px;
    }

    span {
        color: ${theme.colors.yellow};
    }

    tbody tr {
        &:nth-of-type(even){
            background: ${theme.colors.tableGrey};
        }
    }
`);