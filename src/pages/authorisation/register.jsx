import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';

export const RegisterPage = () => {
  const handleChangeName = useCallback(() => console.log('fire input name'));

  const handleChangeEmail = useCallback(() => console.log('fire input email'));

  const handleChangePassword = useCallback(() => console.log('fire input password'));

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
        <h1 className={'authentication__title text text_type_main-medium mb-6'}>Регистрация</h1>
        <Form formName={'registration'}>
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
        </Form>
        <div className={'authentication__additional-actions mt-20'}>
          <AdditionalAction
            text={'Уже зарегистрированы?'}
            buttonText={'Войти'}
            onClick={handleToSignIn}
          />
        </div>
      </section>
    </main>
  );
};
