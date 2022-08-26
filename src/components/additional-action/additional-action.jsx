import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import styles from './additional-action.module.css';

export const AdditionalAction = ({ text, buttonText, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <p className={`${styles.text} text text_type_main-default text_color_inactive`}>{text}</p>
      <Button type={'secondary'} onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
};

AdditionalAction.propTypes = {
  text: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
