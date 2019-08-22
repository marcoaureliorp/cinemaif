import styled from 'styled-components';
import {colors} from "../../config/theme";
import {parse} from "../../util/styled-components/font-size";

const Container = styled('div')`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${colors.white};
    padding: 0 30px;
`;

const Title = styled('h2')`
    font-size: ${parse(20)};
    font-weight: bold;
    border-top: 1px solid ${colors.white};
    padding-top: 20px;
`;

export {Container, Title};
