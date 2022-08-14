import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import styles from './login.module.css';

export const LoginPage = () => {
  const handleChangeEmail = useCallback(() => console.log('fire input email'));

  const handleChangePassword = useCallback(() => console.log('fire input password'));

  const handleSignIn = useCallback(event => {
    event.preventDefault();
    console.log('fire submit form');
  });

  const handleSignUp = useCallback(() => {
    console.log('fire sing up');
  });

  const handleRestorePassword = useCallback(() => {
    console.log('fire restore password');
  });

  return (
    <main className={styles.main}>
      <section className={styles.wrapper}>
        <h1 className={`${styles.title} text text_type_main-medium`}>Вход</h1>
        <form name="login" className={`${styles.form} mt-6 mb-20`}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            name={'email'}
            value={''}
            onChange={handleChangeEmail}
            error={false}
            errorText={'Ошибка'}
          />
          <PasswordInput value={''} name={'password'} onChange={handleChangePassword} />
          <Button htmlType={'submit'} onClick={handleSignIn}>
            Войти
          </Button>
        </form>
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
      </section>
    </main>
  );
};
