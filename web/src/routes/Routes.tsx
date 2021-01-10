import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,

} from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

interface IRouter extends ReactDOMRouteProps{
  isPrivate?:boolean;
  component: React.ComponentType,

}

const Route:React.FC<IRouter> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={() => (isPrivate === !!user ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard' }} />
      ))}
    />
  );
};

export default Route;
