import styled from 'styled-components';
import { colors } from '../../config/theme';

const Container = styled('div')`
    padding: 70px;
    display: flex;
    flex-direction: column;
    width: 100%;
    
    h2 {
        font-weight: bold;
        font-size: 30px;
        color: ${colors.white}; 
        margin-bottom: 40px;
    }
`;

export { Container };
