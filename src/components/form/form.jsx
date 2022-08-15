import styles from './form.module.css';

export const Form = ({ formName, children }) => {
  return (
    <form name={formName} className={styles.form}>
      {children}
    </form>
  );
};
