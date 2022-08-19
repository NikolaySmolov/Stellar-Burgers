import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useHistory } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  const history = useHistory();

  const handleChangeEmail = () => console.log('fire input email');

  const handleRestorePassword = event => {
    event.preventDefault();

    history.push({ pathname: '/reset-password' });
  };

  const handleToSignIn = () => {
    history.push({ pathname: '/login' });
  };

  return (
    <main className={'authentication'}>
      <section className={'authentication__content'}>
        <h1 className={'authentication__title text text_type_main-medium mb-6'}>
          Восстановление пароля
        </h1>
        <Form formName={'forgotPassword'}>
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
