import { Route, Redirect, RouteProps } from 'react-router-dom';
import React, { useEffect } from 'react';
import { getClientAccessState, getClientTokenState, getCookie } from '../services/utils';
import { TOKEN, USER_ACCESS_FAILED, USER_ACCESS_SUCCESS } from '../utils/constants';
import { getUserAccess } from '../services/actions/profile';
import { Loader } from './loader/loader';
import { useAppDispatch, useAppSelector } from '../services/redux-hooks';
import { selectUserAccessFailed, selectUserAccessRequest } from '../services/selectors/profile';

type TProtectedRoute = RouteProps & React.PropsWithChildren;

export const ProtectedRoute = ({ children, ...props }: TProtectedRoute) => {
  const getUserAccessRequest = useAppSelector(selectUserAccessRequest);
  const getUserAccessFailed = useAppSelector(selectUserAccessFailed);

  const dispatch = useAppDispatch();

  const hasAccessToken = getClientAccessState();
  const hasToken = getClientTokenState();

  useEffect(() => {
    if (!getUserAccessRequest) {
      if (hasAccessToken) {
        dispatch({ type: USER_ACCESS_SUCCESS });
      } else if (hasToken) {
        dispatch(getUserAccess(getCookie(TOKEN)));
      } else {
        dispatch({ type: USER_ACCESS_FAILED });
      }
    }
  }, [dispatch, getUserAccessRequest, hasAccessToken, hasToken]);

  if ((!hasAccessToken && !getUserAccessFailed) || getUserAccessRequest) {
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
        getUserAccessFailed ? (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        ) : (
          children
        )
      }
    />
  );
};
