import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import styles from './forgot-password.module.css';

export const ForgotPasswordPage = () => {
  const handleChangeEmail = useCallback(() => console.log('fire input email'));

  const handleRestorePassword = useCallback(event => {
    event.preventDefault();
    console.log('fire submit form');
  });

  const handleToSignIn = useCallback(() => {
    console.log('fire to sign in');
  });

  return (
    <main className={styles.main}>
      <section className={styles.wrapper}>
        <h1 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h1>
        <form name="login" className={`${styles.form} mt-6 mb-20`}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            name={'email'}
            value={''}
            onChange={handleChangeEmail}
            error={false}
            errorText={'Ошибка'}
          />
          <Button htmlType={'submit'} onClick={handleRestorePassword}>
            Восстановить
          </Button>
        </form>
        <AdditionalAction
          text={'Вспомнили пароль?'}
          buttonText={'Войти'}
          onClick={handleToSignIn}
        />
      </section>
    </main>
  );
};
