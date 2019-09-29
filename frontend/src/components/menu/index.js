import React from 'react';
import { withRouter } from 'react-router';
import { Container, MenuItem, Icon } from './styles';

// eslint-disable-next-line react/prop-types
function Menu({ history }) {
    return (
        <Container>
            {/* eslint-disable-next-line react/prop-types */}
            <MenuItem active onClick={() => history.push('/')}>
                Filmes
                <Icon size={17} />
            </MenuItem>
            {/* eslint-disable-next-line react/prop-types */}
            <MenuItem onClick={() => history.push('/sessoes')}>
                Sessões
            </MenuItem>
            {/* eslint-disable-next-line react/prop-types */}
            <MenuItem onClick={() => history.push('/generos')}>
                Gêneros
            </MenuItem>
            {/* eslint-disable-next-line react/prop-types */}
            <MenuItem onClick={() => history.push('/tipos')}>
                Tipos
            </MenuItem>
            {/* eslint-disable-next-line react/prop-types */}
            <MenuItem onClick={() => history.push('/login')}>
                Login
            </MenuItem>
            {/* eslint-disable-next-line react/prop-types */}
            <MenuItem onClick={() => history.push('/usuario')}>
                Cadastrar Usuário
            </MenuItem>
            <MenuItem>Lançamentos</MenuItem>
        </Container>
    );
}

export default withRouter(Menu);
