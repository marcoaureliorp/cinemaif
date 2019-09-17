import React from 'react';
import PropTypes from 'prop-types';
import {
    Container, ContainerTipo, Sala, ContainerHorarios, TipoSala, Horario,
} from './styles';

const SessoesSala = ({ sala, tipos, horarios }) => (
    <Container>
        <ContainerTipo>
            <Sala>{sala}</Sala>
            {tipos.map(item => <TipoSala>{item}</TipoSala>)}
        </ContainerTipo>
        <ContainerHorarios>
            {horarios.map(item => <Horario>{item}</Horario>)}
        </ContainerHorarios>
    </Container>
);

SessoesSala.propTypes = {
    sala: PropTypes.string.isRequired,
    tipos: PropTypes.array.isRequired,
    horarios: PropTypes.array.isRequired,
};

export default SessoesSala;
