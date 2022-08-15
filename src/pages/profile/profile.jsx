import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { Switch, Route, useRouteMatch, useLocation, NavLink } from 'react-router-dom';
import { Form } from '../../components/form/form';
import styles from './profile.module.css';

export const ProfilePage = () => {
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

  const contentStyle =
    location.pathname === '/profile'
      ? `${styles.contentProfile} mt-30`
      : `${styles.contentOrders} mt-10`;

  console.log(contentStyle);

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
            <NavLink
              to={{ pathname: '/logout' }}
              className={`${styles.navLink} text text_type_main-medium`}
              activeClassName={styles.navLinkActive}
              exact>
              Выход
            </NavLink>
          </li>
        </ul>
        {sidebarCaption}
      </section>
      <section className={contentStyle}>
        <Switch>
          <Route path={'/profile'} exact={true}>
            <Form formName={'profile'}>
              <Input
                type={'text'}
                disabled={true}
                name={'name'}
                placeholder={'Имя'}
                value={'Марк'}
                icon={'EditIcon'}
                onIconClick={() => console.log('click')}
              />
              <Input
                type={'email'}
                disabled={true}
                name={'email'}
                placeholder={'Логин'}
                value={'mail@stellar.burgers'}
                icon={'EditIcon'}
                onIconClick={() => console.log('click')}
              />
              <Input
                type={'password'}
                disabled={true}
                name={'password'}
                placeholder={'Пароль'}
                value={'123456'}
                icon={'EditIcon'}
                onIconClick={() => console.log('click')}
              />
            </Form>
          </Route>
          <Route path={`${path}/orders`}>
            <div></div>
          </Route>
        </Switch>
      </section>
    </main>
  );
};
