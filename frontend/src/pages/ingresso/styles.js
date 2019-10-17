import styled from 'styled-components';
import { colors } from '../../config/theme';

export const ContainerCadeiras = styled('div')`
    display: flex;
    flex-wrap: wrap;
`;

export const Cadeira = styled('div')`
    border-radius: 15px;
    background-color: ${colors.blue};
`;
