import styled from 'styled-components';
import { colors } from '../../config/theme';
import { parse } from '../../util/styled-components/font-size';
import capa from '../../images/capa.jpg';

const Container = styled('div')`
    width: 271px;
    height: 483px;
    display: flex;
    flex-direction: column;
    margin-right: 22px;
    margin-bottom: 40px;
`;

const Capa = styled('div')`
    width: 100%;
    height: 395px;
    background: url("${props => (props.capa ? props.capa : capa)}") center / cover no-repeat;
    margin: -18px 0 18px;
`;

const Text = styled('p')`
    color: ${props => (props.color ? props.color : colors.white)};
    font-size: ${props => (props.font_size ? parse(props.font_size) : parse(20))};
    margin: ${props => (props.margin ? props.margin : '')};
`;

export { Container, Capa, Text };
