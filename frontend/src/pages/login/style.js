import styled, { css } from 'styled-components';
import { colors } from '../../config/theme';

const Container = styled('div')`
    width: 100%;
    height: 100%;
    display: flex;
    background: ${colors.grey};
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ContainerEditor = styled('div')`
    width: 100%;
    max-width: 450px;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    ${props => (props.width ? `width: ${props.width};` : null)}
    ${props => props.width && css`width: ${props.width}`}
    
    a {
        color: white;
        font-size: 18px;
        margin-top: 10px;
        width: 100%;
        text-align: right;
        cursor: pointer;
        
        &:hover {
            color: ${colors.blue_grey};
        }      
    }
`;

export { Container, ContainerEditor };
