import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import styles from './register.module.css';

export const RegisterPage = () => {
  const handleChangeName = useCallback(() => console.log('fire input name'));

  const handleChangeEmail = useCallback(() => console.log('fire input email'));

  const handleChangePassword = useCallback(() => console.log('fire input password'));

  const handleSignUp = useCallback(event => {
    event.preventDefault();
    console.log('fire submit form');
  });

  const handleToSignIn = useCallback(() => {
    console.log('fire to sign in');
  });

  return (
    <main className={styles.main}>
      <section className={styles.wrapper}>
        <h1 className={`${styles.title} text text_type_main-medium`}>Регистрация</h1>
        <form name="login" className={`${styles.form} mt-6 mb-20`}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            name={'name'}
            value={''}
            onChange={handleChangeName}
            error={false}
            errorText={'Ошибка'}
          />
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
          <Button htmlType={'submit'} onClick={handleSignUp}>
            Зарегистрироваться
          </Button>
        </form>
        <AdditionalAction
          text={'Уже зарегистрированы?'}
          buttonText={'Войти'}
          onClick={handleToSignIn}
        />
      </section>
    </main>
  );
};
