import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetRegisterFormValue,
  setRegisterFormFailed,
  setRegisterFormValue,
  signUp,
} from '../../services/actions/register';
import { useEffect } from 'react';
import { getCookie } from '../../services/utils';
import { TOKEN } from '../../utils/constants';
import { FormCaption } from '../../components/form-caption/form-caption';
import { useInputLogic } from '../../services/hooks';
import { Loader } from '../../components/loader/loader';

export const RegisterPage = () => {
  const { form, registerRequest, registerFailed, failedMessage } = useSelector(
    store => store.registration
  );
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const emailInputLogic = useInputLogic({ initType: 'email', initIcon: null });

  const handleSetFieldValue = evt => {
    const field = evt.currentTarget;
    dispatch(setRegisterFormValue(field.name, field.value));
  };

  const handleSignUp = event => {
    event.preventDefault();
    if (form.password.length < 6) {
      dispatch(setRegisterFormFailed());
    } else {
      dispatch(signUp(form));
    }
  };

  const handleRouteSignIn = () => {
    history.push({ pathname: '/login', state: location.state });
  };

  useEffect(() => () => dispatch(resetRegisterFormValue()), [dispatch]);

  if (getCookie(TOKEN)) {
    return <Redirect to={location.state?.from || '/'} />;
  }

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
            onChange={handleSetFieldValue}
          />
          <Input
            {...emailInputLogic}
            type={'email'}
            placeholder={'E-mail'}
            name={'email'}
            value={form.email}
            onChange={handleSetFieldValue}
            errorText={'Некорректный e-mail'}
          />
          <PasswordInput value={form.password} name={'password'} onChange={handleSetFieldValue} />
          <div style={{ position: 'relative' }}>
            <Button htmlType={'submit'} onClick={handleSignUp} disabled={false}>
              Зарегистрироваться
            </Button>
            {registerRequest ? <Loader /> : null}
          </div>
        </Form>
        {registerFailed ? (
          <FormCaption>
            {failedMessage ? failedMessage : 'Все поля обязательны для заполнения'}
          </FormCaption>
        ) : null}
        <div className={'authentication__additional-actions mt-20'}>
          <AdditionalAction
            text={'Уже зарегистрированы?'}
            buttonText={'Войти'}
            onClick={handleRouteSignIn}
          />
        </div>
      </section>
    </main>
  );
};
