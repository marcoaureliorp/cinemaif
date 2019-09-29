import styled from 'styled-components';

const Container = styled('div')`
    width: 100%;
    height: 100%;
    display: flex;
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
`;

export { Container, ContainerEditor };
