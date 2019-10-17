import styled from 'styled-components';
import { colors } from '../../config/theme';

export const ContainerCadeiras = styled('div')`
    display: flex;
    flex-direction: column;
    padding: 3px;
    width: 400px;
    height: auto;
    border-radius: 6px;
    border: 3px solid ${colors.red};
`;

export const Cadeira = styled('div')`
    border-radius: 7px;
    display: flex;
    width: 55px;
    margin: 5px;
    justify-content: center;
    align-items: center;
    color: ${colors.white};
    height: 40px;
    background-color: ${colors.blue};
`;

export const Line = styled('div')`
    display: flex;
    flex-wrap: nowrap;
`;
