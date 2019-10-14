import styled from 'styled-components';

const Container = styled('div')`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const ContainerTable = styled('div')`
    width: 100%;
    max-width: 880px;
    max-height: 620px;
    margin-right: 40px;
    flex-grow: 1;
`;
const ContainerEditor = styled('div')`
    width: 100%;
    max-width: 450px;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

export { Container, ContainerTable, ContainerEditor };
