import React, { ChangeEvent, useEffect } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Form } from '../form/form';
import { useInputLogic } from '../../services/hooks';
import { FAKE_PASSWORD } from '../../utils/constants';
import styles from './user-info.module.css';
import { Loader } from '../loader/loader';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { selectProfileFormState } from '../../services/selectors/profile-form';
import {
  getProfileFormResetValuesAction,
  getProfileFormSetValueAction,
  setNewProfileData,
} from '../../services/actions/profile-form';
import { TProfileForm } from '../../services/types/data';
import { FormCaption } from '../form-caption/form-caption';
import { selectAuthState } from '../../services/selectors/auth';

export const UserInfo = () => {
  const {
    name: nameValue,
    email: emailValue,
    password: passwordValue,
    request,
    failed,
    error,
  } = useAppSelector(selectProfileFormState);

  const { name: userName, email: userEmail } = useAppSelector(selectAuthState);

  const dispatch = useAppDispatch();

  const { fieldReset: nameFieldReset, ...nameInputLogic } = useInputLogic({
    initType: 'text',
    initIcon: 'EditIcon',
    disabledState: true,
  });
  const { fieldReset: emailFieldReset, ...emailInputLogic } = useInputLogic({
    initType: 'email',
    initIcon: 'EditIcon',
    disabledState: true,
  });
  const { fieldReset: passwordFieldReset, ...passwordInputLogic } = useInputLogic({
    initType: 'password',
    initIcon: 'EditIcon',
    disabledState: true,
  });

  const fieldsProps = [nameInputLogic, emailInputLogic, passwordInputLogic];

  const canSubmit =
    fieldsProps.every(({ error }) => error === false) &&
    (userName !== nameValue || userEmail !== emailValue || passwordValue !== FAKE_PASSWORD);

  const someEnabled = fieldsProps.some(({ disabled }) => disabled === false);

  const resetFields = () => {
    nameFieldReset();
    emailFieldReset();
    passwordFieldReset();
  };

  const handleSetFieldValue = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.currentTarget;
    dispatch(getProfileFormSetValueAction({ [field.name]: field.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: TProfileForm = { name: nameValue, email: emailValue };
    if (passwordValue !== FAKE_PASSWORD) {
      formData.password = passwordValue;
    }
    dispatch(setNewProfileData(formData));
  };

  const handleReset = () => {
    dispatch(getProfileFormResetValuesAction({ name: userName, email: userEmail }));

    resetFields();
  };

  useEffect(() => {
    dispatch(getProfileFormSetValueAction({ name: userName, email: userEmail }));
    resetFields();
    // eslint-disable-next-line
  }, [dispatch, userName, userEmail]);

  if (request) {
    return <Loader />;
  }

  return (
    <>
      <Form formName={'profile'} onSubmit={handleSubmit} onReset={handleReset}>
        <Input
          {...nameInputLogic}
          name={'name'}
          placeholder={'Имя'}
          value={nameValue}
          onChange={handleSetFieldValue}
        />
        <Input
          {...emailInputLogic}
          name={'email'}
          placeholder={'Логин'}
          value={emailValue}
          onChange={handleSetFieldValue}
        />
        <Input
          {...passwordInputLogic}
          name={'password'}
          placeholder={'Пароль'}
          value={passwordValue}
          onChange={handleSetFieldValue}
          errorText={'Минимум 6 символов'}
        />
        {someEnabled ? (
          <div className={styles.formActions}>
            <Button type={'secondary'} htmlType={'reset'}>
              Отмена
            </Button>
            <Button type={'primary'} htmlType={'submit'} disabled={!canSubmit}>
              Сохранить
            </Button>
          </div>
        ) : null}
      </Form>
      {failed ? <FormCaption>{error}</FormCaption> : null}
    </>
  );
};
