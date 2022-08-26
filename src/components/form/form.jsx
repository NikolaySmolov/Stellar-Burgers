import styles from './form.module.css';
import PropTypes from 'prop-types';

export const Form = ({ formName, children, onSubmit, ...props }) => {
  return (
    <form name={formName} className={styles.form} onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
};

Form.propTypes = {
  formName: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func.isRequired,
};
