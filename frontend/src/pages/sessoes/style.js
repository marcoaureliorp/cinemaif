import styled from 'styled-components';
import { parse } from '../../util/styled-components/font-size';
import { colors } from '../../config/theme';

const Container = styled('div')`
    width: 100%;
    display: flex;
    flex-flow: column;
`;

const ContainerTable = styled('div')`
    width: 100%;
    max-width: 880px;
    max-height: 620px;
    margin-right: 40px;
    flex-grow: 1;
`;

const Row = styled('div')`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const Exportar = styled('div')`
    padding: 18px 20px;
    font-size: ${parse(18)};
    font-weight: bold;
    min-width: 200px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 13px;
    background-color: ${colors.green};
    cursor: pointer;
    color: white;
`;

export {
    Container, ContainerTable, Row, Exportar,
};
