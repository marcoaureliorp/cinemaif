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
    ${props => (props.border ? `border: ${props.border};` : null)}
    ${props => (props.width ? `width: ${props.width}px;` : null)}
    ${props => (props.height ? `height: ${props.height}px;` : null)}
    ${props => (props.z_index ? `z-index: ${props.z_index};` : null)}
`;

export { Container };
