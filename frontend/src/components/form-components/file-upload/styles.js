import styled from 'styled-components';
import { FaFilm, FaTimesCircle } from 'react-icons/fa';
import { colors } from '../../../config/theme';
import { parse } from '../../../util/styled-components/font-size';

const Container = styled('div')`
    width: 100%;
    height: 396px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${props => (props.margin ? `margin: ${props.margin};` : null)}
`;

const Icon = styled(FaTimesCircle)`
    color: ${props => (props.color ? props.color : colors.black)};
    display: ${props => (props.display ? props.display : 'block')};
    height: 36px;
    right: ${props => (props.position ? 'calc(-36px / 2)' : 'unset')};
    margin-top: ${props => (props.position ? '0' : '10px')};
    position: ${props => (props.position ? props.position : 'unset')};
    top: ${props => (props.position ? 'calc(-36px / 2)' : 'unset')};
    width: 36px;
    z-index: ${props => (props.z_index ? props.z_index : null)};
`;

const ImageContainer = styled('div')`
    width: 100%;
    height: 100%;
    position:relative;
    
    &:hover > ${Icon} {
        cursor: pointer;
        display: block;
    }
`;

const Image = styled('img')`
    height: 100%;
    object-fit: cover;
    width: 100%;
`;

const AddPhoto = styled('div')`
    width: 100%;
    height: 396px;
    border: 3px dashed ${colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
`;

const IconCapa = styled(FaFilm)`
    color: ${colors.white};
    width: 69px;
    height: 67px;
`;

const Desc = styled('div')`
    font-size: ${parse(16)};
    color: ${colors.white};
`;

export {
    Container, Icon, ImageContainer, Image, AddPhoto, IconCapa, Desc,
};
