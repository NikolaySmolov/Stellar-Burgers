import { useMemo } from 'react';
import { Switch, Route, useRouteMatch, useLocation, NavLink, Link } from 'react-router-dom';
import styles from './profile.module.css';
import { getCookie } from '../../services/utils';
import { TOKEN } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogout } from '../../services/actions/profile';
import { UserInfo } from '../../components/user-info/user-info';
import { ModalError } from '../../components/modal-error/modal-error';
import { UserOrders } from '../../components/user-orders/user-orders';

export const ProfilePage = () => {
  const { setUserLogoutRequest, setUserLogoutFailed } = useSelector(store => store.profile);

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

  const handleLogout = () => {
    dispatch(setUserLogout(getCookie(TOKEN)));
  };

  const contentStyle =
    location.pathname === '/profile'
      ? `${styles.contentProfile} mt-30`
      : `${styles.contentOrders} mt-10`;

  if (setUserLogoutRequest) {
    return null;
  } else if (setUserLogoutFailed) {
    return <ModalError />;
  }

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
              to={{ pathname: '/login', state: { from: location } }}
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
          <Route path={`${path}/orders`} exact>
            <UserOrders />
          </Route>
        </Switch>
      </section>
    </main>
  );
};
