import React from 'react';
import {Container, Title} from './styles';
import SessoesSidebar from "../sessoes-sidebar";

function ProximasSessoes(props) {
    return (
        <Container>
            <Title>Próximas Sessões</Title>
            <SessoesSidebar/>
        </Container>
    );
}

export default ProximasSessoes;
