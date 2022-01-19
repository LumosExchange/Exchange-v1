import PropTypes from 'prop-types';
import styled, { css } from "styled-components";

const StyledTable = styled.table(({ theme, color, size, bold }) => css`
	font-family: ${bold ? 'THICCCBOI-BOLD' : 'THICCCBOI-REGULAR'};
	font-size: 18px;
	color: ${theme.colors[color]};

    th { background: ${theme.colors.six9Grey}; }
    th, tr { padding: 16px; }
    td {
        padding: 32px 16px;
        border-bottom: 1px solid ${theme.colors.white}; 
    }
    span { color: ${theme.colors.yellow}; }

`);

StyledTable.propTypes = {
    color: PropTypes.string,
}

StyledTable.defaultProps = {
    color: 'white',
}

export default StyledTable;