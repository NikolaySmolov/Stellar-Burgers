import { useMemo } from 'react';
import { Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import styles from './profile.module.css';
import { setUserLogout } from '../../services/actions/auth';
import { UserInfo } from '../../components/user-info/user-info';
import { UserOrders } from '../../components/user-orders/user-orders';
import { useAppDispatch, useAppSelector } from '../../services/redux-hooks';
import { Loader } from '../../components/loader/loader';

export const ProfilePage = () => {
  const { request } = useAppSelector(store => store.auth);

  const dispatch = useAppDispatch();

  const { path, url, isExact: isProfile } = useRouteMatch();

  const sidebarCaption = useMemo(() => {
    const captionText = isProfile
      ? 'В\xA0этом разделе вы\xA0можете изменить свои персональные данные'
      : 'В\xA0этом разделе вы\xA0можете просмотреть свою историю заказов';

    return (
      <p className={`${styles.caption} text text_type_main-default text_color_inactive mt-20`}>
        {captionText}
      </p>
    );
  }, [isProfile]);

  const handleLogout = () => {
    dispatch(setUserLogout());
  };

  const contentStyle = isProfile
    ? `${styles.contentProfile} mt-30`
    : `${styles.contentOrders} mt-10`;

  if (request) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      <section className={`${styles.sidebar} mt-30`}>
        <ul className={styles.navLinkList}>
          <li className={styles.navLinkWrapper}>
            <NavLink
              to={{ pathname: url }}
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
            <button
              className={`${styles.logoutButton} text text_type_main-medium`}
              onClick={handleLogout}>
              Выход
            </button>
          </li>
        </ul>
        {sidebarCaption}
      </section>
      <section className={contentStyle}>
        <Switch>
          <Route path={path} exact>
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
