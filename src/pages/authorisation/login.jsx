import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useHistory } from 'react-router-dom';
//eslint-disable-next-line
import styles from './login.module.css';

export const LoginPage = () => {
  const history = useHistory();

  const handleChangeEmail = () => console.log('fire input email');

  const handleChangePassword = () => console.log('fire input password');

  const handleSignIn = event => {
    event.preventDefault();
    console.log('fire submit form');
  };

  const handleSignUp = () => {
    history.push({ pathname: '/register' });
  };

  const handleRestorePassword = () => {
    history.push({ pathname: '/forgot-password' });
  };

  return (
    <main className={'authentication'}>
      <section className={'authentication__content'}>
        <h1 className={'authentication__title text text_type_main-medium mb-6'}>Вход</h1>
        <Form formName={'login'}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            name={'email'}
            value={'1@'}
            onChange={handleChangeEmail}
            error={false}
            errorText={'Ошибка'}
          />
          <PasswordInput value={'12345'} name={'password'} onChange={handleChangePassword} />
          <Button onClick={handleSignIn}>Войти</Button>
        </Form>
        <div className={'authentication__additional-actions mt-20'}>
          <AdditionalAction
            text={'Вы\xA0\u2014 новый пользователь?'}
            buttonText={'Зарегистрироваться'}
            onClick={handleSignUp}
          />
          <AdditionalAction
            text={'Забыли пароль?'}
            buttonText={'Восстановить пароль'}
            onClick={handleRestorePassword}
          />
        </div>
      </section>
    </main>
  );
};
