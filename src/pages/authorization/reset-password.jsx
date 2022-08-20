import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useInputLogic } from '../../services/hooks';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetForgotPasswordFormValues,
  setForgotPasswordFormValue,
  setPassword,
} from '../../services/actions/forgot-password';
import { useEffect } from 'react';

export const ResetPasswordPage = () => {
  const { form, setPasswordRequest, setPasswordFailed, updatePassword } = useSelector(
    store => store.forgotPassword
  );
  const dispatch = useDispatch();

  const history = useHistory();

  const passwordInputLogic = useInputLogic({ initType: 'password', initIcon: 'ShowIcon' });

  const onChangeCode = evt => {
    const field = evt.currentTarget;
    dispatch(setForgotPasswordFormValue(field.name, field.value));
  };

  const onChangePassword = evt => {
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

  useEffect(() => () => dispatch(resetForgotPasswordFormValues()), [dispatch]);

  //сделать нормальный редирект
  if (updatePassword) {
    history.replace({ pathname: '/login' });
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
            onChange={onChangePassword}
          />
          <Input
            placeholder={'Введите код из письма'}
            name={'token'}
            value={form.token}
            errorText={'Error message'}
            onChange={onChangeCode}
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
