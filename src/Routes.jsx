import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Application from './views/Application';
import Candidates from './views/Candidates';

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/application">
      <Application />
    </Route>
    <Route path="/candidates">
      <Candidates />
    </Route>
  </Switch>
);

export default Routes;
