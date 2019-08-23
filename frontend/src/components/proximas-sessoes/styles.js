import styled from 'styled-components';
import {colors} from "../../config/theme";
import {parse} from "../../util/styled-components/font-size";

const Container = styled('div')`
    width: calc(100% - 60px);
    margin: 0 auto 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${colors.white};
    border-top: 1px solid ${colors.white};
    padding: 0 30px;
`;

const Title = styled('h2')`
    font-size: ${parse(20)};
    font-weight: bold;
    padding-top: 20px;
    white-space: nowrap;
    margin-bottom: 20px;
`;

export {Container, Title};
