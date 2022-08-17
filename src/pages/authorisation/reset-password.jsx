import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useInputLogic } from '../../utils/hooks';

export const ResetPasswordPage = () => {
  const passwordInputLogic = useInputLogic({ initType: 'password', initIcon: 'ShowIcon' });
  const inputCodeLogic = useInputLogic({ initType: 'text', initIcon: null });

  const handleChangeCode = useCallback(() => console.log('fire input code'));

  const handleChangePassword = useCallback(event => {
    console.log('fire input password');
  });

  const handleSignUp = useCallback(event => {
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
          <Input
            {...passwordInputLogic}
            name={'password'}
            placeholder={'Введите новый пароль'}
            value={''}
            errorText={'Error message'}
            onChange={handleChangePassword}
          />
          <Input
            {...inputCodeLogic}
            placeholder={'Введите код из письма'}
            name={'name'}
            value={''}
            onChange={handleChangeCode}
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
