import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetRegisterFormValue,
  setRegisterFormValue,
  signUp,
} from '../../services/actions/register';
import { useEffect } from 'react';
import { getCookie } from '../../services/utils';
import { TOKEN } from '../../utils/constants';

export const RegisterPage = () => {
  const form = useSelector(store => store.registration.form);
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const handleChangeName = evt => {
    const field = evt.currentTarget;
    dispatch(setRegisterFormValue(field.name, field.value));
  };

  const handleChangeEmail = evt => {
    const field = evt.currentTarget;
    dispatch(setRegisterFormValue(field.name, field.value));
  };

  const handleChangePassword = evt => {
    const field = evt.currentTarget;
    dispatch(setRegisterFormValue(field.name, field.value));
  };

  const handleSignUp = event => {
    event.preventDefault();
    dispatch(signUp(form));
  };

  const handleRouteSignIn = () => {
    history.push({ pathname: '/login', state: location.state });
  };

  useEffect(() => () => dispatch(resetRegisterFormValue()), [dispatch]);

  if (getCookie(TOKEN)) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  return (
    <main className={'authentication'}>
      <section className={'authentication__content'}>
        <h1 className={'authentication__title text text_type_main-medium mb-6'}>Регистрация</h1>
        <Form formName={'registration'}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            name={'name'}
            value={form.name}
            onChange={handleChangeName}
            errorText={'Ошибка'}
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            name={'email'}
            value={form.email}
            onChange={handleChangeEmail}
            errorText={'Ошибка'}
          />
          <PasswordInput value={form.password} name={'password'} onChange={handleChangePassword} />
          <Button htmlType={'submit'} onClick={handleSignUp}>
            Зарегистрироваться
          </Button>
        </Form>
        <div className={'authentication__additional-actions mt-20'}>
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
