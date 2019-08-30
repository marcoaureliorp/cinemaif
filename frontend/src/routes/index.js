import React from 'react';

import { Switch, Route, Redirect } from 'react-router';

import Home from '../pages/Home';

export default props => (
    <Switch>
        <Route path="/" component={Home} />
        <Redirect to="/" from="*" />
    </Switch>
);
