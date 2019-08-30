import styled from 'styled-components';
import { colors } from '../../config/theme';
import { parse } from '../../util/styled-components/font-size';

const Container = styled('div')`
    display: flex;
    width: 100%;
    height: 60px;
`;

const TextContainer = styled('div')`
    display: flex;
    flex-direction: column;
    width: calc(100% - 73px);
    margin-left: 13px;
`;

const Sala = styled('div')`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${colors.red};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: ${colors.white};
    font-size: ${parse(18)};
`;

const Text = styled('div')`
    color: ${props => (props.color ? props.color : colors.red)};
    font-size: ${props => (props.font_size ? parse(props.font_size) : parse(16))};
    font-weight: ${props => (props.font_weight ? props.font_weight : 'regular')};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: ${props => (props.margin ? props.margin : '')};
`;

export {
    Text, Sala, Container, TextContainer,
};
