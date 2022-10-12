import styles from './modal-overlay.module.css';

interface IModalOrevlay {
  onClick: () => void
}

export function ModalOverlay({ onClick }: IModalOrevlay) {
  return <div className={styles.overlay} onClick={onClick}></div>;
}
