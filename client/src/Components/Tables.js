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
    font-size: 18px;
    
    thead th, td, tr {
        padding: 20px;
    }

    span {
        color: ${theme.colors.yellow};
    }
`);