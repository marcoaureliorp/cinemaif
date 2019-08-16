import React from 'react';
import {Container} from './styles';
import Menu from '../menu';
import ProximasSessoes from '../proximas-sessoes';

function Sidebar(props) {
    return (
        <Container>
            <Menu />
            <ProximasSessoes />
        </Container>
    );
}

export default Sidebar;
