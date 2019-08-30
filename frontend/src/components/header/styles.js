import styled from 'styled-components';
import { colors } from '../../config/theme';
import { parse } from '../../util/styled-components/font-size';

const Container = styled('header')`
    height: 80px;
    width: 100%;
    color: ${colors.white};
    background-color: ${colors.red};
    display: flex;
`;

const Logo = styled('div')`
    background-color: ${colors.strong_red};
    width: 320px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Bar = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px 0 45px;
    width: calc(100% - 320px);
    
    &::after {
      content: none;
    }
    
    div {
        width: auto;
        height: 100%;
        display: flex;
        align-items: center;
    }
`;

const ContainerBusca = styled('div')`
    display: flex;
`;

const Search = styled('input').attrs({
    placeholder: 'Procurar filmes',
})`
    width: 200px;
    height: 25px;
    background: transparent;
    padding: 5px 20px 5px 10px;
    display: flex;
    align-items: center;
    color: ${colors.white};
    font-size: ${props => (props.font_size ? parse(props.font_size) : parse(16))};
    font-weight: bold;
    
    &::placeholder {
      color: ${colors.white};
    }
`;

const Text = styled('span')`
    font-size: ${props => (props.font_size ? parse(props.font_size) : parse(16))};
    color: ${colors.white};
    font-weight: ${props => (props.weight ? props.weight : 'normal')};
`;

export {
    Container, Logo, Bar, ContainerBusca, Search, Text,
};
