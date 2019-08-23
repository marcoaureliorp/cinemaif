import styled from 'styled-components';
import {colors} from "../../config/theme";

const Container = styled('aside')`
    min-width: 320px;
    background-color: ${colors.light_black};
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export {Container};
