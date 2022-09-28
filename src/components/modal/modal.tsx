import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

interface IModal extends React.PropsWithChildren {
  onClose: () => void
}

const modalRoot = document.getElementById('modal-root') as HTMLElement;


export function Modal({ onClose, children }: IModal) {
  
  
  const closeOnEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeOnEsc);

    return () => document.removeEventListener('keydown', closeOnEsc);
  });

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.container}`}>
        {children}
        <button className={styles.close} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
      </div>
      <ModalOverlay onClick={onClose} />
    </>,

    modalRoot
  );
}
