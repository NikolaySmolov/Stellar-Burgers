import styles from './header-link.module.css';
import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

interface HeaderLinkProps extends PropsWithChildren {
  to: {pathname: string} | string;
  renderIcon: () => JSX.Element;
  routeMatch: boolean;
}

export const HeaderLink = ({ to, renderIcon, children, routeMatch, ...props }: HeaderLinkProps) => {
  return (
    <NavLink
      to={to}
      className={`${styles.nav__link} ${routeMatch ? styles.nav__link_active : null}`}
      {...props}>
      {renderIcon()}
      <p className={`${styles.nav__text} ml-2 text text_type_main-default`}>{children}</p>
    </NavLink>
  );
};