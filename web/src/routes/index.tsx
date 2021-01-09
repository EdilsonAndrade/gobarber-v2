import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';

const Routes:React.FC = () => (
  <Switch>
    <Route component={Signin} path="/" exact />
    <Route component={Signup} path="/signup" />
  </Switch>
);
export default Routes;
