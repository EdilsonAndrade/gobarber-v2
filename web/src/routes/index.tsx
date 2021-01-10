import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Routes';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';

const Routes:React.FC = () => (
  <Switch>
    <Route component={Signin} path="/" exact />
    <Route component={Signup} path="/signup" />

    <Route component={Dashboard} path="/dashboard" isPrivate />
  </Switch>
);
export default Routes;
