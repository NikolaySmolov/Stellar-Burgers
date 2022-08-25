import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useInputLogic } from '../../services/hooks';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetForgotPasswordCode,
  resetForgotPasswordFormValues,
  setForgotPasswordFormValue,
  setPassword,
} from '../../services/actions/forgot-password';
import { useEffect } from 'react';
import { TOKEN } from '../../utils/constants';
import { getCookie } from '../../services/utils';

export const ResetPasswordPage = () => {
  const { form, setPasswordRequest, setPasswordFailed, setPasswordSuccess, getCodeSuccess } =
    useSelector(store => store.forgotPassword);
  const dispatch = useDispatch();

  const history = useHistory();

  const passwordInputLogic = useInputLogic({ initType: 'password', initIcon: 'ShowIcon' });

  const handleSetFieldValue = evt => {
    const field = evt.currentTarget;
    dispatch(setForgotPasswordFormValue(field.name, field.value));
  };

  const handleSetPassword = event => {
    event.preventDefault();
    dispatch(setPassword(form));
  };

  const handleRouteSignIn = () => {
    history.replace({ pathname: '/login' });
  };

  useEffect(
    () => () => {
      dispatch(resetForgotPasswordCode());
      dispatch(resetForgotPasswordFormValues());
    },
    [dispatch]
  );

  if (getCookie(TOKEN)) {
    return <Redirect to={{ pathname: '/' }} />;
  } else if (!getCodeSuccess) {
    return <Redirect to={{ pathname: '/forgot-password' }} />;
  } else if (setPasswordSuccess) {
    return <Redirect to={{ pathname: '/login' }} />;
  }

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
            value={form.password}
            errorText={'Error message'}
            onChange={handleSetFieldValue}
          />
          <Input
            placeholder={'Введите код из письма'}
            name={'token'}
            value={form.token}
            errorText={'Error message'}
            onChange={handleSetFieldValue}
          />
          <Button htmlType={'submit'} onClick={handleSetPassword}>
            Сохранить
          </Button>
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
