import styled from 'styled-components';
import ReactCalendar from 'react-calendar';
import { colors } from '../../../config/theme';
import { parse } from '../../../util/styled-components/font-size';

const Container = styled('div')`
    border-radius: 13px;
    background: ${colors.white};
    color: ${colors.grey_placeholder};
    padding: ${props => (props.padding ? '19px' : '5px')};
    font-size: ${parse(18)};
    display: flex;
    max-width: 100%;
    position: relative;
    align-items: center;
    width: 100%;
    font-weight: bold;
    height: 64px;
    ${props => (props.margin ? `margin: ${props.margin}` : null)};
`;

const ContainerCards = styled('div')`
    width: 100%;
    display: flex;
    height: 100%;
    max-width: 100%;
    overflow: hidden;
`;


const DateCard = styled('div')`
    width: fit-content;
    padding: 4px;
    margin-right: 4px;
    height: 100%;
    background-color: ${colors.blue};
    color: ${colors.white};
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: ${parse(18)};
    
    &:last-child {
        margin-right: 0;
    }
`;

const StyledCalendar = styled(ReactCalendar)`    
    position: absolute;
    top: 100%;
    z-index: 1;
    left: 0;
    max-width: 100%;
    overflow: hidden;
    
    .react-calendar__tile--active {
        background-color: white;
        color: black;
    }
    
    .react-calendar__tile--active:enabled:focus,
    .react-calendar__tile--active.react-calendar__month-view__days__day--weekend {
        background-color: white;
        color: #d10000;
    }    
    
    .active {
        background-color: #006edc !important;
        color: white !important;
    }
`;

export {
    Container, DateCard, StyledCalendar, ContainerCards,
};
