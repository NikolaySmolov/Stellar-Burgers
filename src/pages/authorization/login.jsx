import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
//eslint-disable-next-line
import styles from './login.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { resetLoginFormValues, setLoginFormValue, signIn } from '../../services/actions/login';
import { useEffect } from 'react';
import { getCookie } from '../../services/utils';
import { TOKEN } from '../../utils/constants';

export const LoginPage = () => {
  const { form, loginRequest, loginFailed } = useSelector(store => store.login);
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const handleSetFieldValue = evt => {
    const field = evt.currentTarget;
    dispatch(setLoginFormValue(field.name, field.value));
  };

  const handleSignIn = evt => {
    evt.preventDefault();

    dispatch(signIn(form));
  };

  const handleRouteSignUp = () => {
    history.push({ pathname: '/register', state: location.state });
  };

  const handleRouteRestorePassword = () => {
    history.push({ pathname: '/forgot-password', state: location.state });
  };

  useEffect(() => () => dispatch(resetLoginFormValues()), [dispatch]);

  if (getCookie(TOKEN)) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  return (
    <main className={'authentication'}>
      <section className={'authentication__content'}>
        <h1 className={'authentication__title text text_type_main-medium mb-6'}>Вход</h1>
        <Form formName={'login'}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            name={'email'}
            value={form.email}
            onChange={handleSetFieldValue}
            errorText={'Ошибка'}
          />
          <PasswordInput value={form.password} name={'password'} onChange={handleSetFieldValue} />
          <Button onClick={handleSignIn}>Войти</Button>
        </Form>
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
