import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getResetCode,
  resetForgotPasswordFormValues,
  setForgotPasswordFormValue,
} from '../../services/actions/forgot-password';
import { getCookie } from '../../services/utils';
import { TOKEN } from '../../utils/constants';
import { Loader } from '../../components/loader/loader';

export const ForgotPasswordPage = () => {
  const { form, getCodeRequest, getCodeSuccess } = useSelector(store => store.forgotPassword);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleSetFieldValue = evt => {
    const field = evt.currentTarget;
    dispatch(setForgotPasswordFormValue(field.name, field.value));
  };

  const handleRestorePassword = event => {
    event.preventDefault();
    dispatch(getResetCode(form));
  };

  const handleRouteSignIn = () => {
    history.push({ pathname: '/login' });
  };

  useEffect(() => () => dispatch(resetForgotPasswordFormValues()), [dispatch]);

  if (getCookie(TOKEN)) {
    return <Redirect to={{ pathname: '/' }} />;
  } else if (getCodeSuccess) {
    return <Redirect push to={{ pathname: '/reset-password' }} />;
  }

  return (
    <main className={'authentication'}>
      <section className={'authentication__content'}>
        <h1 className={'authentication__title text text_type_main-medium mb-6'}>
          Восстановление пароля
        </h1>
        <Form formName={'forgotPassword'} onSubmit={handleRestorePassword}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            name={'email'}
            value={form.email}
            onChange={handleSetFieldValue}
            errorText={'Ошибка'}
          />
          <div style={{ position: 'relative' }}>
            <Button htmlType={'submit'}>Восстановить</Button>
            {getCodeRequest ? <Loader /> : null}
          </div>
        </Form>
        <div className={'authentication__additional-actions mt-20'}>
          <AdditionalAction
            text={'Вспомнили пароль?'}
            buttonText={'Войти'}
            onClick={handleRouteSignIn}
          />
        </div>
      </section>
    </main>
  );
};
