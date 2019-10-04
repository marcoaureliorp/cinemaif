import styled from 'styled-components';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { colors } from '../../../config/theme';
import { parse } from '../../../util/styled-components/font-size';

const StyledTimeRangePicker = styled(TimeRangePicker)`
    .react-timerange-picker__wrapper {
        border-radius: 13px;
        background: ${colors.white};
        padding: 20px 19px;
        color: ${colors.black};
        font-size: ${parse(18)};
        width: 100%;
        font-weight: bold;
        height: 64px;
        ${props => (props.margin ? `margin: ${props.margin}` : null)};
        
        .react-timerange-picker__range-divider {
            margin: 0 10px;
        }
    }
`;

export { StyledTimeRangePicker };
