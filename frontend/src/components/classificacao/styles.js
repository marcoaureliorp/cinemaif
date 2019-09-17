import styled from 'styled-components';
import { colors } from '../../config/theme';
import { parse } from '../../util/styled-components/font-size';

const Container = styled('span')`
    position: ${props => (props.position ? props.position : 'relative')};
    bottom : ${props => (props.bottom ? props.bottom : 'auto')};
    z-index: 10;
    width: auto;
    height: 37px;
    padding: 7px 23px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    font-weight: bold;
    background: ${props => (props.background ? props.background : colors.yellow)};
    color: ${props => (props.color ? props.color : colors.black)};
    font-size: ${props => (props.font_size ? parse(props.font_size) : parse(16))};
`;

export { Container };
