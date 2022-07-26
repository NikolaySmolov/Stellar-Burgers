import React from 'react';
import styles from './app-header.module.css';
import NavLink from '../nav-link/nav-link';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = React.memo(() => {
  const [showContent, switchContent] = React.useState({
    constructor: true,
    orders: false,
    profile: false,
  });

  const handleShowConstructor = () => {
    !showContent.constructor && switchContent({ constructor: true, orders: false, profile: false });
  };

  const handleShowOrders = () => {
    !showContent.orders && switchContent({ constructor: false, orders: true, profile: false });
  };

  const handleShowProfile = () => {
    !showContent.profile && switchContent({ constructor: false, orders: false, profile: true });
  };

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.content}>
        <nav>
          <ul className={styles.nav__list}>
            <NavLink
              href="#"
              isActive={showContent.constructor}
              text="Конструктор"
              handleOnClick={handleShowConstructor}>
              <BurgerIcon type={showContent.constructor ? 'primary' : 'secondary'} />
            </NavLink>
            <NavLink
              href="#"
              isActive={showContent.orders}
              text="Лента заказов"
              handleOnClick={handleShowOrders}>
              <ListIcon type={showContent.orders ? 'primary' : 'secondary'} />
            </NavLink>
          </ul>
        </nav>
        <Logo />
        <nav>
          <ul className={styles.nav__list}>
            <NavLink
              href="#"
              isActive={showContent.profile}
              text="Личный кабинет"
              handleOnClick={handleShowProfile}>
              <ProfileIcon type={showContent.profile ? 'primary' : 'secondary'} />
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
});
