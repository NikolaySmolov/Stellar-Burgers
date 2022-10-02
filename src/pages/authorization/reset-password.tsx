import styles from './index.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useInputLogic } from '../../services/hooks';
import { useHistory, Redirect } from 'react-router-dom';
import {
  resetForgotPasswordCode,
  resetForgotPasswordFormValues,
  setForgotPasswordFormValue,
  setPassword,
} from '../../services/actions/forgot-password';
import React, { useEffect } from 'react';
import { TOKEN } from '../../utils/constants';
import { getCookie } from '../../services/utils';
import { FormCaption } from '../../components/form-caption/form-caption';
import { Loader } from '../../components/loader/loader';
import { selectForgotPasswordState } from '../../services/selectors/forgot-password';
import { useAppDispatch, useAppSelector } from '../../services/redux-hooks';

export const ResetPasswordPage = () => {
  const { form, setPasswordRequest, setPasswordFailed, setPasswordSuccess, getCodeSuccess } =
    useAppSelector(selectForgotPasswordState);
  const dispatch = useAppDispatch();

  const history = useHistory();

  const { fieldReset, ...passwordInputLogic } = useInputLogic({
    initType: 'password',
    initIcon: 'ShowIcon',
  });

  const handleSetFieldValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.currentTarget;
    dispatch(setForgotPasswordFormValue(field.name, field.value));
  };

  const handleSetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setPassword(form));
  };

  const handleRouteSignIn = () => {
    history.replace({ pathname: '/login' });
  };

  useEffect(
    () => () => {
      dispatch(resetForgotPasswordCode());
      dispatch(resetForgotPasswordFormValues());
    },
    [dispatch]
  );

  if (getCookie(TOKEN)) {
    return <Redirect to={{ pathname: '/' }} />;
  } else if (!getCodeSuccess) {
    return <Redirect to={{ pathname: '/forgot-password' }} />;
  } else if (setPasswordSuccess) {
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
            value={form.password}
            errorText={'Некорректный пароль'}
            onChange={handleSetFieldValue}
          />
          <Input
            placeholder={'Введите код из письма'}
            name={'token'}
            value={form.token}
            errorText={'Некорректный код'}
            onChange={handleSetFieldValue}
          />
          <div style={{ position: 'relative' }}>
            <Button htmlType={'submit'}>Сохранить</Button>
            {setPasswordRequest ? <Loader /> : null}
          </div>
        </Form>
        {setPasswordFailed ? <FormCaption>Неверный код</FormCaption> : null}
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
