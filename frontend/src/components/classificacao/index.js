import React from 'react';
import {Container} from './styles';

function Classificacao(props) {
    return (
        <Container background={props.background} >
            {props.classificacao}
        </Container>
    );
}

export default Classificacao;
