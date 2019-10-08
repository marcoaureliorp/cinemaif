import styled, {createGlobalStyle} from 'styled-components';
import RCTimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { colors } from '../../../config/theme';
import { parse } from '../../../util/styled-components/font-size';

const StyledRCTimePicker = styled(RCTimePicker)`
    width: 100%;
    z-index: 0;
    .rc-time-picker-input {
        border-radius: 13px;
        background: ${colors.white};
        padding: 20px 19px;
        color: ${colors.black};
        z-index: 0;
        font-size: ${parse(18)};
        width: 100%;
        font-weight: bold;
        height: 64px;
        ${props => (props.margin ? `margin: ${props.margin}` : null)};
    }
`;

const InputStyle = createGlobalStyle`
    .rc-time-picker-panel-input-wrap {
        padding: 0 !important;
        
        input { 
            padding: 20px 19px;
            font-size: ${parse(18)};
        }
    }
`;


export { StyledRCTimePicker,InputStyle };