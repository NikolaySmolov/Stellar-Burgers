import React from 'react';
import PropTypes from 'prop-types';
import styles from './nav-link.module.css';

export default function NavLink(props) {
  return (
    <li className={`${styles.item} pl-5 pr-5 pt-4 pb-4`}>
      <a
        href={props.href}
        className={`${styles.link} ${props.isActive && styles.active}`}
        onClick={props.handleOnClick}>
        {props.children}
        <p className={`${styles.text} ml-2 text text_type_main-default`}>{props.text}</p>
      </a>
    </li>
  );
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
};
