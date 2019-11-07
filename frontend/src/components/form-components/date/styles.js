import styled from 'styled-components';
import ReactCalendar from 'react-calendar';
import { parse } from '../../../util/styled-components/font-size';
import { colors } from '../../../config/theme';

const Container = styled('div')`
    border-radius: 13px;
    background: ${colors.white};
    color: ${colors.grey_placeholder};
    padding: 19px;
    font-size: ${parse(18)};
    display: flex;
    max-width: 100%;
    position: relative;
    align-items: center;
    width: 100%;
    font-weight: bold;
    height: 64px;
    border: ${props => (props.error_message && props.error_message !== '' ? `3px solid ${colors.red}` : '3px solid transparent')};
    ${props => (props.margin ? `margin: ${props.margin}` : null)};
`;

const SytledDateRange = styled(ReactCalendar)`
    position: absolute;
    top: 100%;
    z-index: 1;
    left: 0;
    max-width: 100%;
    overflow: hidden;
`;

export { Container, SytledDateRange };
