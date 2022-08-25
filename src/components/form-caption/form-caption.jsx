import styles from './form-caption.module.css';
import PropTypes from 'prop-types';

export const FormCaption = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <p className={`${styles.text} text text_type_main-default`}>{children}</p>
    </div>
  );
};

FormCaption.propTypes = {
  children: PropTypes.string.isRequired,
};
