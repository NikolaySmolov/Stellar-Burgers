import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import styles from './index.module.css';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import React, { useEffect } from 'react';
import { FormCaption } from '../../components/form-caption/form-caption';
import { useInputLogic } from '../../services/hooks';
import { Loader } from '../../components/loader/loader';
import { selectLoginFormState } from '../../services/selectors/login-form';
import { TLocation } from '../../services/hooks';
import {
  getLoginFormResetValuesAction,
  getLoginFormSetValueAction,
  setUserSignIn,
} from '../../services/actions/login-form';
import { selectAuthState } from '../../services/selectors/auth';

export const LoginPage = () => {
  const {
    email: emailValue,
    password: passwordValue,
    request,
    failed,
    error,
  } = useAppSelector(selectLoginFormState);

  const { failed: authFailed } = useAppSelector(selectAuthState);

  const dispatch = useAppDispatch();

  const history = useHistory();
  const location = useLocation<TLocation<'from'>>();

  const { fieldReset, ...emailInputLogic } = useInputLogic({ initType: 'email' });

  const handleSetFieldValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const field = evt.currentTarget;
    dispatch(getLoginFormSetValueAction({ [field.name]: field.value }));
  };

  const handleSignIn = (evt: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    evt.preventDefault();

    dispatch(setUserSignIn({ email: emailValue, password: passwordValue }));
  };

  const handleRouteSignUp = () => {
    history.push({ pathname: '/register', state: location.state });
  };

  const handleRouteRestorePassword = () => {
    history.push({ pathname: '/forgot-password', state: location.state });
  };

  useEffect(() => {
    return () => {
      dispatch(getLoginFormResetValuesAction());
    };
  }, [dispatch]);

  if (!authFailed) {
    return <Redirect to={location.state?.from.pathname || '/'} />;
  }

  return (
    <main className={styles.authentication}>
      <section className={styles.authentication__content}>
        <h1 className={`${styles.authentication__title} text text_type_main-medium mb-6`}>Вход</h1>
        <Form formName={'login'} onSubmit={handleSignIn}>
          <Input
            {...emailInputLogic}
            type={'email'}
            placeholder={'E-mail'}
            name={'email'}
            value={emailValue}
            onChange={handleSetFieldValue}
            errorText={'Некорректный e-mail'}
          />
          <PasswordInput value={passwordValue} name={'password'} onChange={handleSetFieldValue} />
          <div style={{ position: 'relative' }}>
            <Button htmlType={'submit'}>Войти</Button>
            {request ? <Loader /> : null}
          </div>
        </Form>
        {failed ? <FormCaption>{error}</FormCaption> : null}
        <div className={`${styles['authentication__additional-actions']} mt-20`}>
          <AdditionalAction
            text={'Вы\xA0\u2014 новый пользователь?'}
            buttonText={'Зарегистрироваться'}
            onClick={handleRouteSignUp}
          />
          <AdditionalAction
            text={'Забыли пароль?'}
            buttonText={'Восстановить пароль'}
            onClick={handleRouteRestorePassword}
          />
        </div>
      </section>
    </main>
  );
};
