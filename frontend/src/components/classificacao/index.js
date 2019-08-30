import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

function Classificacao({ classificacao, background }) {
    return (
        <Container background={background}>
            {classificacao}
        </Container>
    );
}

Classificacao.propTypes = {
    classificacao: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
};

export default Classificacao;
