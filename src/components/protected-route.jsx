import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCookie } from '../services/utils';
import { ACCESS_TOKEN, TOKEN, USER_ACCESS_FAILED, USER_ACCESS_SUCCESS } from '../utils/constants';
import { getUserAccess } from '../services/actions/profile';

export const ProtectedRoute = ({ children, ...props }) => {
  const { getUserAccessRequest, getUserAccessFailed } = useSelector(store => store.profile);
  const dispatch = useDispatch();

  const accessExpired = getCookie(ACCESS_TOKEN) ? false : true;

  useEffect(() => {
    if (getCookie(ACCESS_TOKEN)) {
      dispatch({ type: USER_ACCESS_SUCCESS });
    } else if (getCookie(TOKEN)) {
      dispatch(getUserAccess(getCookie(TOKEN)));
    } else {
      dispatch({ type: USER_ACCESS_FAILED });
    }
  }, [dispatch, accessExpired]);

  if (getUserAccessRequest) {
    return <h1>LOADER</h1>;
  } else if (accessExpired && !getUserAccessFailed) {
    return null;
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
