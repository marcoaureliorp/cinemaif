import styled from 'styled-components';
import {colors} from "../../config/theme";
import {FaArrowRight} from 'react-icons/fa';

const Container = styled('div')`
    width: 100%;
    display: flex;
    flex-direction: column;
    color: ${colors.white};
    margin-top: 70px;
`;

const MenuItem = styled('div')`
    width: 100%;
    padding: 9px 55px;
    background-color: ${props => props.active ? colors.grey : 'transparent'};
    position: relative;
    font-size: 18px;
    font-weight: bold;
    
    &:hover {
       background-color: ${colors.grey};
       cursor: pointer;
    }
`;

const Icon = styled(FaArrowRight)`
    position: absolute;
    top: calc(50% - ${props => props.size}px  / 2);
    right: 20px;
`;

export {Container, MenuItem, Icon};
