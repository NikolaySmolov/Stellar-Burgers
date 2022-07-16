import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal-error.module.css';
import errorImage from '../../images/error.jpg';

export default function ModalError() {
  const modalRoot = document.getElementById('modal-root');

  return ReactDOM.createPortal(
    <div className={`${styles.container} pt-10 pr-10 pb-10 pl-10`}>
      <h2 className="text text_type_main-large">Что-то пошло не так</h2>
      <img className={`${styles.image} mt-15 mb-15`} src={errorImage} alt="внимание" />
      <p className="text text_type_main-medium">Попробуйте обновить страницу</p>
    </div>,

    modalRoot
  );
}
