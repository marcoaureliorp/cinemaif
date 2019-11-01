import styled from 'styled-components';
import { colors } from '../../../config/theme';
import { parse } from '../../../util/styled-components/font-size';

const StyledInput = styled('input')`
    border-radius: 13px;
    background: ${colors.white};
    color:${colors.black};
    padding: 20px 19px;
    font-size: ${parse(18)};
    width: 100%;
    border: ${props => (props.error_message && props.error_message !== '' ? `3px solid ${colors.red}` : '3px solid transparent')};
    font-weight: bold;
    ${props => (props.height ? `height: ${props.height}` : null)};
    ${props => (props.margin ? `margin: ${props.margin}` : null)};
    
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
`;

export { StyledInput };
