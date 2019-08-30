import React from 'react';
import { Container, MenuItem, Icon } from './styles';

function Menu(props) {
    return (
        <Container>
            <MenuItem>Filmes</MenuItem>
            <MenuItem active>
Sessões
                <Icon size={17} />
            </MenuItem>
            <MenuItem>Lançamentos</MenuItem>
        </Container>
    );
}

export default Menu;
