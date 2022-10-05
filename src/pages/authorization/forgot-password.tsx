import styles from './index.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useHistory, Redirect } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Loader } from '../../components/loader/loader';
import { useAppDispatch, useAppSelector } from '../../services/redux-hooks';
import { useInputLogic } from '../../services/hooks';
import { selectResetPasswordFormState } from '../../services/selectors/reset-password-form';
import {
  getCodeForReset,
  getResetPassFormResetValuesAction,
  getResetPassFormSetValueAction,
} from '../../services/actions/reset-password-form';
import { FormCaption } from '../../components/form-caption/form-caption';

export const ForgotPasswordPage = () => {
  const {
    email: emailValue,
    request,
    codeSuccess,
    failed,
    error,
  } = useAppSelector(selectResetPasswordFormState);

  const authFailed = useAppSelector(store => store.auth.failed);

  const dispatch = useAppDispatch();

  const history = useHistory();

  const { fieldReset, ...emailInputLogic } = useInputLogic({ initType: 'email' });

  const handleSetFieldValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.currentTarget;
    dispatch(getResetPassFormSetValueAction({ [field.name]: field.value }));
  };

  const handleGetCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getCodeForReset({ email: emailValue }));
  };

  const handleRouteSignIn = () => {
    history.push({ pathname: '/login' });
  };

  useEffect(() => {
    return () => {
      dispatch(getResetPassFormResetValuesAction());
    };
  }, [dispatch]);

  if (!authFailed) {
    return <Redirect to={{ pathname: '/' }} />;
  } else if (codeSuccess) {
    return <Redirect push to={{ pathname: '/reset-password' }} />;
  }

  return (
    <main className={styles.authentication}>
      <section className={styles.authentication__content}>
        <h1 className={`${styles.authentication__title} text text_type_main-medium mb-6`}>
          Восстановление пароля
        </h1>
        <Form formName={'forgotPassword'} onSubmit={handleGetCode}>
          <Input
            {...emailInputLogic}
            type={'email'}
            placeholder={'Укажите e-mail'}
            name={'email'}
            value={emailValue}
            onChange={handleSetFieldValue}
            errorText={'Некорректный e-mail'}
          />
          <div style={{ position: 'relative' }}>
            <Button htmlType={'submit'}>Восстановить</Button>
            {request ? <Loader /> : null}
          </div>
        </Form>
        {failed ? <FormCaption>{error}</FormCaption> : null}
        <div className={`${styles['authentication__additional-actions']} mt-20`}>
          <AdditionalAction
            text={'Вспомнили пароль?'}
            buttonText={'Войти'}
            onClick={handleRouteSignIn}
          />
        </div>
      </section>
    </main>
  );
};
