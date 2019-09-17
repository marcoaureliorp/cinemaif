import React from 'react';
import {
    ContainerSessao, Container, ContainerCapa, Capa, ContainerInfo, Title,
} from './styles';
import Classificacao from '../classificacao';
import SessoesSala from '../sessoes-sala';

const Sessao = () => (
    <ContainerSessao>
        <Container>
            <ContainerCapa>
                <Capa />
                <Classificacao position="absolute" bottom="0" background="yellow" classificacao="16" />
            </ContainerCapa>
            <ContainerInfo>
                <Title>Avengers: End Game</Title>
                <SessoesSala sala="Sala 2" tipos={['3D', 'XD']} horarios={['16:00']} />
            </ContainerInfo>
        </Container>
        <Container>
            <ContainerCapa>
                <Capa />
                <Classificacao position="absolute" bottom="0" background="yellow" classificacao="16" />
            </ContainerCapa>
            <ContainerInfo>
                <Title>Avengers: End Game</Title>
                <SessoesSala sala="Sala 2" tipos={['3D', 'XD']} horarios={['16:00']} />
            </ContainerInfo>
        </Container>
    </ContainerSessao>
);

export default Sessao;
