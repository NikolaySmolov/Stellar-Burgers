import { Route, Redirect, RouteProps } from 'react-router-dom';
import React from 'react';
import { Loader } from './loader/loader';
import { useAppSelector } from '../services/redux-hooks';

type TProtectedRoute = RouteProps & React.PropsWithChildren;

export const ProtectedRoute = ({ children, ...props }: TProtectedRoute) => {
  const authRequest = useAppSelector(store => store.auth.request);
  const authFailed = useAppSelector(store => store.auth.failed);

  if (authRequest) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <Route
      {...props}
      render={({ location }) =>
        authFailed ? <Redirect to={{ pathname: '/login', state: { from: location } }} /> : children
      }
    />
  );
};
