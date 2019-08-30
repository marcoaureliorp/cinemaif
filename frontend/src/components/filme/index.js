import React from 'react';
import { Container, Capa, Text } from './styles';
import { colors } from '../../config/theme';

import Classificacao from '../classificacao';

function Filme(props) {
    return (
        <Container>
            <Classificacao classificacao="Livre" background="green" />
            <Capa />
            <Text margin="0 0 9px">Vingadores Ultimato</Text>
            <Text color={colors.blue_grey} font_size="16">Ficção, Ação</Text>
        </Container>
    );
}

export default Filme;
