import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getClientAccessState, getClientTokenState, getCookie } from '../services/utils';
import { TOKEN, USER_ACCESS_FAILED, USER_ACCESS_SUCCESS } from '../utils/constants';
import { getUserAccess } from '../services/actions/profile';
import PropTypes from 'prop-types';
import { Loader } from './loader/loader';

export const ProtectedRoute = ({ children, ...props }) => {
  const { getUserAccessRequest, getUserAccessFailed } = useSelector((store) => store.profile);
  const dispatch = useDispatch();

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

ProtectedRoute.propTypes = {
  children: PropTypes.object.isRequired,
};
