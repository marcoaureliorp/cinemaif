import React from 'react';

import { Switch, Route, Redirect } from 'react-router';

import Home from '../pages/home';
import Sessoes from '../pages/sessoes';
import Generos from '../pages/generos';
import Tipos from '../pages/tipos';
import Filme from '../pages/filme';

export default props => (
    <Switch>
        <Route path="/tipos" component={Tipos} />
        <Route path="/generos" component={Generos} />
        <Route path="/filme" component={Filme} />
        <Route path="/sessoes" component={Sessoes} />
        <Route path="/" component={Home} />
        <Redirect to="/" from="*" />
    </Switch>
);
