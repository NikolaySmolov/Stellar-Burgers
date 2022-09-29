import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
//eslint-disable-next-line
import styles from './index.module.css';
import { useAppDispatch, useAppSelector } from '../../services/redux-hooks';
import { resetLoginFormValues, setLoginFormValue, signIn } from '../../services/actions/login';
import React, { useEffect } from 'react';
import { getCookie } from '../../services/utils';
import { TOKEN } from '../../utils/constants';
import { FormCaption } from '../../components/form-caption/form-caption';
import { useInputLogic } from '../../services/hooks';
import { Loader } from '../../components/loader/loader';
import { setOrderPermissionSuccess } from '../../services/actions/order';
import { selectLoginState } from '../../services/selectors/login';
import { TLocation } from '../../services/types';

export const LoginPage = () => {
  const { form, loginRequest, loginFailed } = useAppSelector(selectLoginState);
  const dispatch = useAppDispatch();

  const history = useHistory();
  const location = useLocation<TLocation<'from'>>();

  const { fieldReset, ...emailInputLogic } = useInputLogic({ initType: 'email' });

  const handleSetFieldValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const field = evt.currentTarget;
    dispatch(setLoginFormValue(field.name, field.value));
  };

  const handleSignIn = (evt: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    evt.preventDefault();

    dispatch(signIn(form));
  };

  const handleRouteSignUp = () => {
    history.push({ pathname: '/register', state: location.state });
  };

  const handleRouteRestorePassword = () => {
    history.push({ pathname: '/forgot-password', state: location.state });
  };

  useEffect(() => {
    dispatch(setOrderPermissionSuccess());
    return () => {
      dispatch(resetLoginFormValues());
    };
  }, [dispatch]);

  if (getCookie(TOKEN)) {
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
            value={form.email}
            onChange={handleSetFieldValue}
            errorText={'Некорректный e-mail'}
          />
          <PasswordInput value={form.password} name={'password'} onChange={handleSetFieldValue} />
          <div style={{ position: 'relative' }}>
            <Button htmlType={'submit'}>Войти</Button>
            {loginRequest ? <Loader /> : null}
          </div>
        </Form>
        {loginFailed ? <FormCaption>Неверные имя пользователя или пароль</FormCaption> : null}
        <div className={'authentication__additional-actions mt-20'}>
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
