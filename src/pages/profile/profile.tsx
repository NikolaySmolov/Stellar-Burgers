import { useMemo } from 'react';
import { Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import styles from './profile.module.css';
import { getCookie } from '../../services/utils';
import { TOKEN } from '../../utils/constants';
import { setUserLogout } from '../../services/actions/user';
import { UserInfo } from '../../components/user-info/user-info';
import { ModalError } from '../../components/modal-error/modal-error';
import { UserOrders } from '../../components/user-orders/user-orders';
import { useAppDispatch, useAppSelector } from '../../services/redux-hooks';
import { selectUserLogoutFailed, selectUserLogoutRequest } from '../../services/selectors/user';
import { Loader } from '../../components/loader/loader';

export const ProfilePage = () => {
  const userLogoutRequest = useAppSelector(selectUserLogoutRequest);
  const userLogoutFailed = useAppSelector(selectUserLogoutFailed);

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
    dispatch(setUserLogout(getCookie(TOKEN)));
  };

  const contentStyle = isProfile
    ? `${styles.contentProfile} mt-30`
    : `${styles.contentOrders} mt-10`;

  if (userLogoutRequest) {
    return <Loader />;
  } else if (userLogoutFailed) {
    return <ModalError />;
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
