import styled from 'styled-components';
import CurrencyFormat from 'react-number-format';
import { colors } from '../../../config/theme';
import { parse } from '../../../util/styled-components/font-size';

const StyledCurrencyFormat = styled(CurrencyFormat)`
    border-radius: 13px;
    background: ${colors.white};
    padding: 20px 19px;
    color: ${colors.black};
    font-size: ${parse(18)};
    width: 100%;
    font-weight: bold;
    height: 64px;
    border: ${props => (props.error_message && props.error_message !== '' ? `3px solid ${colors.red}` : '3px solid transparent')};
    ${props => (props.margin ? `margin: ${props.margin}` : null)};
`;

export { StyledCurrencyFormat };
