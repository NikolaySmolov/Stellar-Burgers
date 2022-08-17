import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { Switch, Route, useRouteMatch, useLocation, NavLink } from 'react-router-dom';
import { Form } from '../../components/form/form';
import styles from './profile.module.css';
import { useInputLogic } from '../../utils/hooks';

export const ProfilePage = () => {
  const nameInputLogic = useInputLogic({ initType: 'text', disabledState: true });
  const emailInputLogic = useInputLogic({ initType: 'email', disabledState: true });
  const passwordInputLogic = useInputLogic({ initType: 'password', disabledState: true });

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

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log('submit form');
  };

  const handleReset = () => {
    console.log('reset form');
  };

  const contentStyle =
    location.pathname === '/profile'
      ? `${styles.contentProfile} mt-30`
      : `${styles.contentOrders} mt-10`;

  const profileChanged = true;

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
                {...nameInputLogic}
                name={'name'}
                placeholder={'Имя'}
                value={'Марк'}
                errorText={'Error message'}
              />
              <Input
                {...emailInputLogic}
                name={'email'}
                placeholder={'Логин'}
                value={'mail@stellar.burgers'}
                errorText={'Error message'}
              />
              <Input
                {...passwordInputLogic}
                name={'password'}
                placeholder={'Пароль'}
                value={''}
                errorText={'Error message'}
              />
              <div className={styles.formActions}>
                <Button
                  type={'secondary'}
                  htmlType={'reset'}
                  disabled={!profileChanged}
                  onClick={handleReset}>
                  Отмена
                </Button>
                <Button
                  type={'primary'}
                  htmlType={'submit'}
                  disabled={!profileChanged}
                  onClick={handleSubmit}>
                  Сохранить
                </Button>
              </div>
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
