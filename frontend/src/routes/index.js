import React from 'react';

import { Switch, Route, Redirect } from 'react-router';

import Sessao from '../pages/sessao';
import Home from '../pages/home';
import Sessoes from '../pages/sessoes';
import Generos from '../pages/generos';
import Tipos from '../pages/tipos';
import Filme from '../pages/filme';
import Login from '../pages/login';
import Usuario from '../components/usuario';

export default props => (
    <Switch>
        <Route path="/tipos" component={Tipos} />
        <Route path="/generos" component={Generos} />
        <Route path="/filme/:id?" component={Filme} />
        <Route path="/sessoes" component={Sessoes} />
        <Route path="/sessao" component={Sessao} />
        <Route path="/login" component={Login} />
        <Route path="/usuario" component={Usuario} />
        <Route path="/" component={Home} />
        <Redirect to="/" from="*" />
    </Switch>
);
