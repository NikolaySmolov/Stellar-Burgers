import styles from './index.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useHistory, Redirect } from 'react-router-dom';
import React, { useEffect } from 'react';
import {
  getResetCode,
  resetForgotPasswordFormValues,
  setForgotPasswordFormValue,
} from '../../services/actions/forgot-password';
import { getCookie } from '../../services/utils';
import { TOKEN } from '../../utils/constants';
import { Loader } from '../../components/loader/loader';
import { selectForgotPasswordState } from '../../services/selectors/forgot-password';
import { useAppDispatch, useAppSelector } from '../../services/redux-hooks';
import { useInputLogic } from '../../services/hooks';

export const ForgotPasswordPage = () => {
  const { form, getCodeRequest, getCodeSuccess } = useAppSelector(selectForgotPasswordState);

  const dispatch = useAppDispatch();

  const history = useHistory();

  const { fieldReset, ...emailInputLogic } = useInputLogic({ initType: 'email' });

  const handleSetFieldValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.currentTarget;
    dispatch(setForgotPasswordFormValue(field.name, field.value));
  };

  const handleRestorePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getResetCode(form));
  };

  const handleRouteSignIn = () => {
    history.push({ pathname: '/login' });
  };

  useEffect(() => {
    return () => {
      dispatch(resetForgotPasswordFormValues());
    };
  }, [dispatch]);

  if (getCookie(TOKEN)) {
    return <Redirect to={{ pathname: '/' }} />;
  } else if (getCodeSuccess) {
    return <Redirect push to={{ pathname: '/reset-password' }} />;
  }

  return (
    <main className={styles.authentication}>
      <section className={styles.authentication__content}>
        <h1 className={`${styles.authentication__title} text text_type_main-medium mb-6`}>
          Восстановление пароля
        </h1>
        <Form formName={'forgotPassword'} onSubmit={handleRestorePassword}>
          <Input
            {...emailInputLogic}
            type={'email'}
            placeholder={'Укажите e-mail'}
            name={'email'}
            value={form.email}
            onChange={handleSetFieldValue}
            errorText={'Некорректный e-mail'}
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
