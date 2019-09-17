import React from 'react';

import { Switch, Route, Redirect } from 'react-router';

import Home from '../pages/Home';
import Sessoes from '../pages/Sessoes';
import Generos from '../pages/generos';

export default props => (
    <Switch>
        <Route path="/generos" component={Generos} />
        <Route path="/sessoes" component={Sessoes} />
        <Route path="/" component={Home} />
        <Redirect to="/" from="*" />
    </Switch>
);
