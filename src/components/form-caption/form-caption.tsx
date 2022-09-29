import styles from './form-caption.module.css';
import React from 'react';

export const FormCaption = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={styles.wrapper}>
      <p className={`${styles.text} text text_type_main-default`}>{children}</p>
    </div>
  );
};
