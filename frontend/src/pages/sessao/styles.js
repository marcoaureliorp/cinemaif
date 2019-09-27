import styled from 'styled-components';
import ReactCalendar from 'react-calendar';

const Container = styled('div')`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledCalendar = styled(ReactCalendar)`    
    .react-calendar__tile--active {
        background-color: white;
        color: black;
    }
    
    .react-calendar__tile--active.react-calendar__month-view__days__day--weekend {
        background-color: white;
        color: #d10000;
    }    
    
    .active {
        background-color: #006edc !important;
        color: white !important;
    }
`;

export { Container, StyledCalendar };
