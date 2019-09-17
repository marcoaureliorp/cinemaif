import styled from 'styled-components';
import { FaFilm } from 'react-icons/fa';
import { colors } from '../../../config/theme';
import { parse } from '../../../util/styled-components/font-size';

const Container = styled('div')`
    width: 100%;
    height: 396px;
    border: 3px dashed ${colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    ${props => (props.margin ? `margin: ${props.margin};` : null)}
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

export { Container, IconCapa, Desc };
