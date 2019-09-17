import styled from 'styled-components';

const Container = styled('div')`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
`;
const ContainerTable = styled('div')`
    width: 880px;
    height: 620px;
`;
const ContainerEditor = styled('div')`
    width: 450px;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

export { Container, ContainerTable, ContainerEditor };
