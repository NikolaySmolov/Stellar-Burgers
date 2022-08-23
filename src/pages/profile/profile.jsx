import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useMemo } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
  NavLink,
  Link,
} from 'react-router-dom';
import { Form } from '../../components/form/form';
import styles from './profile.module.css';
import { useInputLogic } from '../../services/hooks';
import { setlogout } from '../../services/api';
import { deleteCookie, getCookie } from '../../services/utils';
import { ACCESS_TOKEN, TOKEN } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileInfo, setProfileUserInfoFormValue } from '../../services/actions/profile';
import { UserInfo } from '../../components/user-info/user-info';

export const ProfilePage = () => {
  const {
    userInfoForm,
    userInfoLoaded,
    getUserInfoRequest,
    getUserInfoFailed,
    setUserInfoRequest,
    setUserInfoFailed,
  } = useSelector(store => store.profile);

  const dispatch = useDispatch();

  const location = useLocation();
  const { path, url } = useRouteMatch();

  const sidebarCaption = useMemo(() => {
    const captionText =
      location.pathname === '/profile'
        ? 'В\xA0этом разделе вы\xA0можете изменить свои персональные данные'
        : 'В\xA0этом разделе вы\xA0можете просмотреть свою историю заказов';

    return (
      <p className={`${styles.caption} text text_type_main-default text_color_inactive mt-20`}>
        {captionText}
      </p>
    );
  }, [location]);

  // useEffect(() => {
  //   dispatch(getUserProfileInfo(getCookie(ACCESS_TOKEN)));
  // }, [dispatch]);

  const handleLogout = () => {
    setlogout(getCookie(TOKEN)).then(() => {
      deleteCookie(TOKEN);
      deleteCookie(ACCESS_TOKEN);
    });
  };

  const contentStyle =
    location.pathname === '/profile'
      ? `${styles.contentProfile} mt-30`
      : `${styles.contentOrders} mt-10`;

  return (
    <main className={styles.main}>
      <section className={`${styles.sidebar} mt-30`}>
        <ul className={styles.navLinkList}>
          <li className={styles.navLinkWrapper}>
            <NavLink
              to={{ pathname: path }}
              className={`${styles.navLink} text text_type_main-medium`}
              activeClassName={styles.navLinkActive}
              exact>
              Профиль
            </NavLink>
          </li>
          <li className={styles.navLinkWrapper}>
            <NavLink
              to={{ pathname: `${url}/orders` }}
              className={`${styles.navLink} text text_type_main-medium`}
              activeClassName={styles.navLinkActive}
              exact>
              История заказов
            </NavLink>
          </li>
          <li className={styles.navLinkWrapper}>
            <Link
              to={{ pathname: '/' }}
              className={`${styles.navLink} text text_type_main-medium`}
              onClick={handleLogout}>
              Выход
            </Link>
          </li>
        </ul>
        {sidebarCaption}
      </section>
      <section className={contentStyle}>
        <Switch>
          <Route path={'/profile'} exact>
            <UserInfo />
          </Route>
          <Route path={`${path}/orders`}>
            <div></div>
          </Route>
        </Switch>
      </section>
    </main>
  );
};
