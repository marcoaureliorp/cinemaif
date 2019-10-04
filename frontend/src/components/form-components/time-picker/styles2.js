import styled from 'styled-components';
import RCTimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { colors } from '../../../config/theme';
import { parse } from '../../../util/styled-components/font-size';

const StyledRCTimePicker = styled(RCTimePicker)`
    .rc-time-picker-input {
        border-radius: 13px;
        background: ${colors.white};
        padding: 20px 19px;
        color: ${colors.black};
        font-size: ${parse(18)};
        width: 100%;
        font-weight: bold;
        height: 64px;
        ${props => (props.margin ? `margin: ${props.margin}` : null)};
        
        .rc-time-picker-panel-input-wrap {
            padding: 0;
            
            input { 
                padding: 20px 19px;
                font-size: ${parse(18)};
            }
        }
    }
`;

export { StyledRCTimePicker };
