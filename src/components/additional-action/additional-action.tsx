import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './additional-action.module.css';

interface AdditionalActionProps {
  text: string;
  buttonText: string;
  onClick: () => void;
}

export const AdditionalAction = ({ text, buttonText, onClick }: AdditionalActionProps) => {
  return (
    <div className={styles.wrapper}>
      <p className={`${styles.text} text text_type_main-default text_color_inactive`}>{text}</p>
      <Button type={'secondary'} onClick={onClick} htmlType={'button'}>
        {buttonText}
      </Button>
    </div>
  );
};
