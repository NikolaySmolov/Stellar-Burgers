import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useLayoutEffect, useState } from 'react';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';

export const ResetPasswordPage = () => {
  const [passwordValue, setPasswordValue] = useState('');

  const handleChangeCode = useCallback(() => console.log('fire input code'));

  const handleChangePassword = useCallback((event) => {
    console.log('fire input password');
    setPasswordValue(() => event.target.value);
  });

  const handleSignUp = useCallback((event) => {
    event.preventDefault();
    console.log('fire submit form');
  });

  const handleToSignIn = useCallback(() => {
    console.log('fire to sign in');
  });

  return (
    <main className={'authentication'}>
      <section className={'authentication__content'}>
        <h1 className={'authentication__title text text_type_main-medium mb-6'}>
          Восстановление пароля
        </h1>
        <Form formName={'reset-password'}>
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
        </Form>
        <div className={'authentication__additional-actions mt-20'}>
          <AdditionalAction
            text={'Вспомнили пароль?'}
            buttonText={'Войти'}
            onClick={handleToSignIn}
          />
        </div>
      </section>
    </main>
  );
};
