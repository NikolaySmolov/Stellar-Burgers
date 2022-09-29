import React from 'react';
import styles from './form.module.css';

interface IForm extends React.PropsWithChildren {
  formName: string;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => void;
}

export const Form = ({ formName, children, onSubmit, ...props }: IForm) => {
  return (
    <form name={formName} className={styles.form} onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
};
