import React from 'react';
import styles from './app-header.module.css';
import { HeaderLink } from '../header-link/header-link';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRouteMatch, useLocation } from 'react-router-dom';

export const AppHeader = React.memo(() => {
  const location = useLocation();
  const constructorRouteMatch = useRouteMatch('/');
  const profileRouteMatch = useRouteMatch('/profile');
  const ordersRouteMatch = useRouteMatch('/feed');

  const isConstructor =
    constructorRouteMatch?.isExact || location.pathname.includes('/ingredients');
  const isOrders = ordersRouteMatch?.isExact || location.pathname.includes('/feed');
  const isProfile = profileRouteMatch?.isExact || location.pathname.includes('/profile');

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.content}>
        <nav>
          <ul className={styles.nav__list}>
            <li className={`${styles.nav__item} pl-5 pr-5 pt-4 pb-4`}>
              <HeaderLink
                to={{ pathname: '/' }}
                routeMatch={isConstructor}
                renderIcon={() => <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />}>
                Конструктор
              </HeaderLink>
            </li>
            <li className={`${styles.nav__item} pl-5 pr-5 pt-4 pb-4`}>
              <HeaderLink
                to={{ pathname: '/feed' }}
                routeMatch={isOrders}
                renderIcon={() => <ListIcon type={isOrders ? 'primary' : 'secondary'} />}>
                Лента заказов
              </HeaderLink>
            </li>
          </ul>
        </nav>
        <Logo />
        <nav>
          <ul className={styles.nav__list}>
            <li className={`${styles.nav__item} pl-5 pr-5 pt-4 pb-4`}>
              <HeaderLink
                to={{ pathname: '/profile' }}
                routeMatch={isProfile}
                renderIcon={() => <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />}>
                Личный кабинет
              </HeaderLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
});
