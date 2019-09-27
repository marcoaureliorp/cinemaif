import React from 'react';

import { Switch, Route, Redirect } from 'react-router';

import Home from '../pages/Home';
import Sessoes from '../pages/Sessoes';
import Sessao from '../pages/sessao';
import Generos from '../pages/generos';
import Filme from '../pages/filme';

export default props => (
    <Switch>
        <Route path="/generos" component={Generos} />
        <Route path="/filme" component={Filme} />
        <Route path="/sessoes" component={Sessoes} />
        <Route path="/sessao" component={Sessao} />
        <Route path="/" component={Home} />
        <Redirect to="/" from="*" />
    </Switch>
);
