import React from 'react';
import {
    Container, IconEditFilm, IconEditSession, Capa, Text,
} from './styles';
import { colors } from '../../config/theme';
import { classificacaoBackgroundList } from '../../util/classificacao-list';

import Classificacao from '../classificacao';

function Filme({
    history, id, titulo, generos, capa, classificacao,
}) {
    const get_classificacao = classificacaoBackgroundList.find(item => item.id === classificacao);

    return (
        <Container>
            <IconEditFilm
                position="absolute"
                color={colors.white}
                onClick={() => history.push(`/filme/${id}`)}
                display="none"
            />
            <IconEditSession
                position="absolute"
                color={colors.white}
                onClick={() => history.push(`/sessao/${id}`)}
                display="none"
            />
            <Classificacao classificacao={get_classificacao.id} background={get_classificacao.backgroundColor} />
            <Capa src={capa} />
            <Text margin="0 0 9px">{titulo}</Text>
            <Text color={colors.blue_grey} font_size="16">{generos}</Text>
        </Container>
    );
}

export default Filme;
