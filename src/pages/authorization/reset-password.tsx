import styles from './index.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useInputLogic } from '../../services/hooks';
import { useHistory, Redirect } from 'react-router-dom';
import React, { useEffect } from 'react';
import { FormCaption } from '../../components/form-caption/form-caption';
import { Loader } from '../../components/loader/loader';
import { useAppDispatch, useAppSelector } from '../../services/redux-hooks';
import {
  getResetPassFormResetStateAction,
  getResetPassFormSetValueAction,
  setNewPassword,
} from '../../services/actions/reset-password-form';
import { selectResetPasswordFormState } from '../../services/selectors/reset-password-form';

export const ResetPasswordPage = () => {
  const {
    password: passwordValue,
    token: codeValue,
    request,
    codeSuccess,
    savedPass,
    failed,
    error,
  } = useAppSelector(selectResetPasswordFormState);

  const authFailed = useAppSelector(store => store.auth.failed);

  const dispatch = useAppDispatch();

  const history = useHistory();

  const { fieldReset, ...passwordInputLogic } = useInputLogic({
    initType: 'password',
    initIcon: 'ShowIcon',
  });

  const handleSetFieldValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.currentTarget;
    dispatch(getResetPassFormSetValueAction({ [field.name]: field.value }));
  };

  const handleSetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setNewPassword({ password: passwordValue, token: codeValue }));
  };

  const handleRouteSignIn = () => {
    history.replace({ pathname: '/login' });
  };

  useEffect(() => {
    return () => {
      dispatch(getResetPassFormResetStateAction());
    };
  }, [dispatch]);

  if (!codeSuccess && authFailed) {
    return <Redirect to={{ pathname: '/forgot-password' }} />;
  } else if (!authFailed) {
    return <Redirect to={{ pathname: '/' }} />;
  } else if (savedPass) {
    return <Redirect to={{ pathname: '/login' }} />;
  }

  return (
    <main className={styles.authentication}>
      <section className={styles.authentication__content}>
        <h1 className={`${styles.authentication__title} text text_type_main-medium mb-6`}>
          Восстановление пароля
        </h1>
        <Form formName={'reset-password'} onSubmit={handleSetPassword}>
          <Input
            {...passwordInputLogic}
            name={'password'}
            placeholder={'Введите новый пароль'}
            value={passwordValue}
            errorText={'Некорректный пароль'}
            onChange={handleSetFieldValue}
          />
          <Input
            placeholder={'Введите код из письма'}
            name={'token'}
            value={codeValue}
            errorText={'Некорректный код'}
            onChange={handleSetFieldValue}
          />
          <div style={{ position: 'relative' }}>
            <Button htmlType={'submit'}>Сохранить</Button>
            {request ? <Loader /> : null}
          </div>
        </Form>
        {failed ? <FormCaption>{error}</FormCaption> : null}
        <div className={'authentication__additional-actions mt-20'}>
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
