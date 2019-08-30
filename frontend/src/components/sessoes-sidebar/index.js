import React from 'react';
import {
    Text, Sala, Container, TextContainer,
} from './styles';
import { colors } from '../../config/theme';

function SessoesSidebar(props) {
    return (
        <Container>
            <Sala>C1</Sala>
            <TextContainer>
                <Text
                    font_size={20}
                    margin="0 0 5px 0"
                    font_weight="bold"
                    color={colors.white}
                >
                    O Senhor dos anéis
                </Text>
                <Text>Sala 3d</Text>
                <Text color={colors.blue_grey}>15:45</Text>
            </TextContainer>
        </Container>
    );
}

export default SessoesSidebar;
