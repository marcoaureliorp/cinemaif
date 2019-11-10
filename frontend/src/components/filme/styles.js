import styled from 'styled-components';
import { FaFilm, FaEdit, FaTrash } from 'react-icons/fa';
import { colors } from '../../config/theme';
import { parse } from '../../util/styled-components/font-size';

const IconEditFilm = styled(FaEdit)`
    color: ${props => (props.color ? props.color : colors.black)};
    display: ${props => (props.display ? props.display : 'block')};
    height: 36px;
    right: ${props => (props.position ? '0' : 'unset')};
    margin-top: ${props => (props.position ? '0' : '10px')};
    position: ${props => (props.position ? props.position : 'unset')};
    top: ${props => (props.position ? '0' : 'unset')};
    width: 36px;
    z-index: ${props => (props.z_index ? props.z_index : null)};
`;

const IconEditSession = styled(FaFilm)`
    color: ${props => (props.color ? props.color : colors.black)};
    display: ${props => (props.display ? props.display : 'block')};
    height: 36px;
    left: ${props => (props.position ? '0' : 'unset')};
    margin-top: ${props => (props.position ? '0' : '10px')};
    position: ${props => (props.position ? props.position : 'unset')};
    top: ${props => (props.position ? '0' : 'unset')};
    width: 36px;
    z-index: ${props => (props.z_index ? props.z_index : null)};
`;

const IconDeleteFilm = styled(FaTrash)`
    color: ${props => (props.color ? props.color : colors.black)};
    display: ${props => (props.display ? props.display : 'block')};
    height: 36px;
    right: ${props => (props.position ? '0' : 'unset')};
    margin-top: ${props => (props.position ? '0' : '10px')};
    position: ${props => (props.position ? props.position : 'unset')};
    bottom: ${props => (props.position ? '0' : 'unset')};
    width: 36px;
    z-index: ${props => (props.z_index ? props.z_index : null)};
`;

const Container = styled('div')`
    width: 271px;
    height: 483px;
    display: flex;
    flex-direction: column;
    margin-right: 22px;
    margin-bottom: 40px;
    position: relative;
    
    &:hover > ${IconEditFilm},
    &:hover > ${IconEditSession},
    &:hover > ${IconDeleteFilm} {
        cursor: pointer;
        display: block;
    }
`;

const Capa = styled('img')`
    width: 100%;
    height: 395px;
    object-fit: cover;
    margin: -18px 0 18px;
`;

const Text = styled('p')`
    color: ${props => (props.color ? props.color : colors.white)};
    font-size: ${props => (props.font_size ? parse(props.font_size) : parse(20))};
    margin: ${props => (props.margin ? props.margin : '')};
`;

export { Container, IconEditFilm, IconEditSession, IconDeleteFilm, Capa, Text };
