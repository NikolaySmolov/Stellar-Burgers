import { Route, Redirect, RouteProps } from 'react-router-dom';
import React from 'react';
import { Loader } from './loader/loader';
import { useAppSelector } from '../services/hooks';
import { selectAuthState } from '../services/selectors/auth';

type TProtectedRoute = RouteProps & React.PropsWithChildren;

export const ProtectedRoute = ({ children, ...props }: TProtectedRoute) => {
  const { request, failed } = useAppSelector(selectAuthState);

  if (request) {
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
        failed ? <Redirect to={{ pathname: '/login', state: { from: location } }} /> : children
      }
    />
  );
};
