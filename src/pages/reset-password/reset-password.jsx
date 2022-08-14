import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import styles from './reset-password.module.css';

export const ResetPasswordPage = () => {
  const [passwordValue, setPasswordValue] = useState('');

  const handleChangeCode = useCallback(() => console.log('fire input code'));

  const handleChangePassword = useCallback(event => {
    console.log('fire input password');
    setPasswordValue(() => event.target.value);
  });

  const handleSignUp = useCallback(event => {
    event.preventDefault();
    console.log('fire submit form');
  });

  const handleToSignIn = useCallback(() => {
    console.log('fire to sign in');
  });

  useLayoutEffect(() => {
    document.querySelectorAll('label').forEach(label => {
      if (label.textContent === 'Пароль') label.textContent = 'Введите новый пароль';
    });
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.wrapper}>
        <h1 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h1>
        <form name="login" className={`${styles.form} mt-6 mb-20`}>
          <PasswordInput value={passwordValue} name={'password'} onChange={handleChangePassword} />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            name={'name'}
            value={''}
            onChange={handleChangeCode}
            error={false}
            errorText={'Ошибка'}
          />
          <Button htmlType={'submit'} onClick={handleSignUp}>
            Сохранить
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
