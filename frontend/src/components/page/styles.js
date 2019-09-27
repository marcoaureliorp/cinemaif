import styled from 'styled-components';
import { colors } from '../../config/theme';

const Container = styled('div')`
    padding: 70px;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: auto;
`;

const ContainerTitle = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    
    h2 {
        font-weight: bold;
        font-size: 30px;
        color: ${colors.white}; 
    }
`;

export { Container, ContainerTitle };
