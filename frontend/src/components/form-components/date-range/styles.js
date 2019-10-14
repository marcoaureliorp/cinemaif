import styled from 'styled-components';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { parse } from '../../../util/styled-components/font-size';
import { colors } from '../../../config/theme';

const SytledDateRange = styled(DateRangePicker)`
    width: 100%;
    height: auto;
    
    .react-daterange-picker__wrapper {
        border-radius: 13px;
        background: ${colors.white};
        color: ${colors.grey_placeholder};
        padding: ${props => (props.padding ? '19px' : '20px')};
        font-size: ${parse(18)};
        display: flex;
        max-width: 100%;
        position: relative;
        align-items: center;
        width: 100%;
        font-weight: bold;
        height: 64px;
        ${props => (props.margin ? `margin: ${props.margin}` : null)};   
    }
`;

export { SytledDateRange };
