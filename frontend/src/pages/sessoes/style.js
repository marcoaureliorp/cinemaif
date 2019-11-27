import styled from 'styled-components';

const Container = styled('div')`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
`;

const ContainerTable = styled('div')`
    width: 100%;
    max-width: 880px;
    max-height: 620px;
    margin-right: 40px;
    flex-grow: 1;
`;

export { Container, ContainerTable };
