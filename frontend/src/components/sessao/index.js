import React from 'react';
import {
    Container, ContainerCapa, Capa, ContainerInfo, Title,
} from './styles';
import Classificacao from '../classificacao';
import SessoesSala from '../sessoes-sala';
import { classificacaoBackgroundList } from '../../util/classificacao-list';

const Sessao = ({
    history, id, filme_id, capa, classificacao, titulo, horarios, sala, tipo,
}) => {
    const get_classificacao = classificacaoBackgroundList.find(item => item.id === classificacao);

    return (
        <Container
            onClick={() => history.push(`/sessao/${filme_id}`)}
        >
            <ContainerCapa>
                <Capa src={capa} />
                <Classificacao
                    classificacao={get_classificacao.id}
                    background={get_classificacao.backgroundColor}
                    bottom="0"
                    position="absolute"
                />
            </ContainerCapa>
            <ContainerInfo>
                <Title>{titulo}</Title>
                <SessoesSala sala={`Sala ${sala}`} tipos={tipo} horarios={horarios} />
            </ContainerInfo>
        </Container>
    );
};

export default Sessao;
