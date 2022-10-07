import styles from './index.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import React, { useEffect } from 'react';
import { FormCaption } from '../../components/form-caption/form-caption';
import { useInputLogic } from '../../services/hooks';
import { Loader } from '../../components/loader/loader';
import { useAppDispatch, useAppSelector } from '../../services/redux-hooks';
import { TLocation } from '../../services/hooks';
import { selectRegistrationFormState } from '../../services/selectors/registration-form';
import {
  getRegistrationFormResetValuesAction,
  getRegistrationFormSetValueAction,
  setUserSignUp,
} from '../../services/actions/registration-form';
import { selectAuthState } from '../../services/selectors/auth';

export const RegisterPage = () => {
  const {
    email: emailValue,
    name: nameValue,
    password: passwordValue,
    request,
    failed,
    error,
  } = useAppSelector(selectRegistrationFormState);

  const { failed: authFailed } = useAppSelector(selectAuthState);

  const dispatch = useAppDispatch();

  const history = useHistory();
  const location = useLocation<TLocation<'from'>>();

  const { fieldReset, ...emailInputLogic } = useInputLogic({ initType: 'email' });

  const handleSetFieldValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.currentTarget;
    dispatch(getRegistrationFormSetValueAction({ [field.name]: field.value }));
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setUserSignUp({ name: nameValue, email: emailValue, password: passwordValue }));
  };

  const handleRouteSignIn = () => {
    history.push({ pathname: '/login', state: location.state });
  };

  useEffect(() => {
    return () => {
      dispatch(getRegistrationFormResetValuesAction());
    };
  }, [dispatch]);

  if (!authFailed) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  return (
    <main className={styles.authentication}>
      <section className={styles.authentication__content}>
        <h1 className={`${styles.authentication__title} text text_type_main-medium mb-6`}>
          Регистрация
        </h1>
        <Form formName={'registration'} onSubmit={handleSignUp}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            name={'name'}
            value={nameValue}
            onChange={handleSetFieldValue}
          />
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
            <Button htmlType={'submit'}>Зарегистрироваться</Button>
            {request ? <Loader /> : null}
          </div>
        </Form>
        {failed ? <FormCaption>{error}</FormCaption> : null}
        <div className={`${styles['authentication__additional-actions']} mt-20`}>
          <AdditionalAction
            text={'Уже зарегистрированы?'}
            buttonText={'Войти'}
            onClick={handleRouteSignIn}
          />
        </div>
      </section>
    </main>
  );
};
