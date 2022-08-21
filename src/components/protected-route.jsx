import { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getRefreshToken } from '../services/api';
import { getCookie, setCookie } from '../services/utils';
import { ACCESS_TOKEN, TOKEN } from '../utils/constants';

export const ProtectedRoute = ({ children, ...props }) => {
  const [authStateLoaded, setAuthState] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    const hasAccess = Boolean(getCookie(ACCESS_TOKEN));
    const token = getCookie(TOKEN);

    if (!hasAccess && token) {
      getRefreshToken(token)
        .then(({ accessToken, refreshToken }) => {
          setCookie(ACCESS_TOKEN, accessToken, { 'max-age': 1200 });
          setCookie(TOKEN, refreshToken);
        })
        .catch(() => {
          setAuthFailed(() => true);
        });
    } else if (!token) {
      setAuthFailed(() => true);
    }

    setAuthState(true);
  }, [authStateLoaded, authFailed]);

  if (!authStateLoaded) {
    return null;
  }
  debugger;
  return (
    <Route
      {...props}
      render={renderProps => (authFailed ? <Redirect to={{ pathname: '/login' }} /> : children)}
    />
  );
};
