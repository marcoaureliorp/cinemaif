import styled from 'styled-components';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';
import { colors } from '../../../config/theme';
import { parse } from '../../../util/styled-components/font-size';

const StyledSelect = styled(ReactSelect)`
    input {
        font-weight: bold;
    }
`;
const StyledAsyncSelect = styled(AsyncSelect)`
    input {
        font-weight: bold;
    }
`;

const Container = styled('div')`
    border-radius: 13px;
    background: ${colors.white};
    color: ${colors.black};
    font-size: ${parse(18)};
    width: 100%;
    font-weight: bold;
    ${props => (props.height ? `height: ${props.height}` : null)};
    ${props => (props.margin ? `margin: ${props.margin}` : null)};
`;

export { StyledSelect, StyledAsyncSelect, Container };
