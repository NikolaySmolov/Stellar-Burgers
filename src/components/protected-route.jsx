import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCookie } from '../services/utils';
import { ACCESS_TOKEN, TOKEN, USER_ACCESS_FAILED, USER_ACCESS_SUCCESS } from '../utils/constants';
import { getUserAccess } from '../services/actions/profile';
import PropTypes from 'prop-types';
import { Loader } from './loader/loader';

export const ProtectedRoute = ({ children, ...props }) => {
  const { getUserAccessRequest, getUserAccessFailed } = useSelector((store) => store.profile);
  const dispatch = useDispatch();

  const accessExpired = getCookie(ACCESS_TOKEN) ? false : true;

  useEffect(() => {
    if (getCookie(ACCESS_TOKEN)) {
      dispatch({ type: USER_ACCESS_SUCCESS });
    } else if (getCookie(TOKEN)) {
      console.log('dispatch get UserAccess'); //иногда срабатывает два раза подряд при вызове страницы через адрес и дублирует токен
      dispatch(getUserAccess(getCookie(TOKEN)));
    } else {
      dispatch({ type: USER_ACCESS_FAILED });
    }
  }, [dispatch, accessExpired]);

  if (getUserAccessRequest) {
    return (
      <div>
        <Loader />
      </div>
    );
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

ProtectedRoute.propTypes = {
  children: PropTypes.object.isRequired,
};
