import styles from './form-caption.module.css';

export const FormCaption = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <p className={`${styles.text} text text_type_main-default`}>{children}</p>
    </div>
  );
};
