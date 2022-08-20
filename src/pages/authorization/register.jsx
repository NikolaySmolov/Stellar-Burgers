import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRegisterFormValue } from '../../services/actions/register';

export const RegisterPage = () => {
  const { form } = useSelector(store => ({
    form: store.registration.form,
  }));
  const dispatch = useDispatch();

  const history = useHistory();

  const handleChangeName = evt => {
    dispatch(setRegisterFormValue(evt.currentTarget.name, evt.currentTarget.value));
  };

  const handleChangeEmail = () => console.log('fire input email');

  const handleChangePassword = () => console.log('fire input password');

  const handleSignUp = event => {
    event.preventDefault();
    console.log('fire submit form');
  };

  const handleToSignIn = () => {
    history.push({ pathname: '/login' });
  };

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
