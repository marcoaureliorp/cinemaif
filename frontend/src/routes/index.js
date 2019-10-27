import React from 'react';

import { Switch, Route, Redirect } from 'react-router';

import Sessao from '../pages/sessao';
import Home from '../pages/home';
import Sessoes from '../pages/sessoes';
import Generos from '../pages/generos';
import Tipos from '../pages/tipos';
import Salas from '../pages/salas';
import Filme from '../pages/filme';
import Login from '../pages/login';
import Ingresso from '../pages/ingresso';
import Usuario from '../pages/usuario';

export default props => (
    <Switch>
        <Route path="/tipos" component={Tipos} />
        <Route path="/salas" component={Salas} />
        <Route path="/generos" component={Generos} />
        <Route path="/filme/:id?" component={Filme} />
        <Route path="/sessoes" component={Sessoes} />
        <Route path="/sessao/:id?" component={Sessao} />
        <Route path="/login" component={Login} />
        <Route path="/usuario" component={Usuario} />
        <Route path="/ingresso" component={Ingresso} />
        <Route path="/" component={Home} />
        <Redirect to="/" from="*" />
    </Switch>
);
