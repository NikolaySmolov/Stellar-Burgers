import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Form } from '../form/form';
import { useInputLogic } from '../../services/hooks';
import { ACCESS_TOKEN, FAKE_PASSWORD } from '../../utils/constants';
import styles from './user-info.module.css';
import {
  getUserProfileInfo,
  setProfileUserInfoFormReset,
  setProfileUserInfoFormValue,
  setUserProfileInfo,
} from '../../services/actions/profile';
import { getCookie } from '../../services/utils';

export const UserInfo = () => {
  const {
    userInfo,
    userInfoForm,
    userInfoLoaded,
    getUserInfoRequest,
    getUserInfoFailed,
    setUserInfoRequest,
    setUserInfoFailed,
  } = useSelector(store => store.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfoLoaded) {
      dispatch(getUserProfileInfo(getCookie(ACCESS_TOKEN)));
    }
  }, [dispatch, userInfoLoaded]);

  const nameInputLogic = useInputLogic({ initType: 'text', disabledState: true });
  const emailInputLogic = useInputLogic({ initType: 'email', disabledState: true });
  const passwordInputLogic = useInputLogic({ initType: 'password', disabledState: true });

  const canSubmit =
    [nameInputLogic.error, emailInputLogic.error, passwordInputLogic.error].every(
      item => item === false
    ) &&
    (userInfo.name !== userInfoForm.name ||
      userInfo.email !== userInfoForm.email ||
      userInfoForm.password !== FAKE_PASSWORD);

  const resetInputProps = () => {
    nameInputLogic.fieldReset();
    emailInputLogic.fieldReset();
    passwordInputLogic.fieldReset();
  };

  const handleSetFieldValue = useCallback(
    evt => {
      const field = evt.currentTarget;
      dispatch(setProfileUserInfoFormValue(field.name, field.value));
    },
    [dispatch]
  );

  const handleSubmit = evt => {
    evt.preventDefault();
    const formData = { ...userInfoForm };
    if (formData.password === FAKE_PASSWORD) {
      delete formData.password;
    }
    dispatch(setUserProfileInfo(getCookie(ACCESS_TOKEN), formData));

    resetInputProps();
  };

  const handleReset = () => {
    dispatch(setProfileUserInfoFormReset());

    resetInputProps();
  };

  const userProfileForm = useMemo(() => {
    if (getUserInfoRequest || setUserInfoRequest) {
      return null;
    } else if (userInfoLoaded) {
      return (
        <Form formName={'profile'}>
          <Input
            {...nameInputLogic}
            name={'name'}
            placeholder={'Имя'}
            value={userInfoForm.name}
            onChange={handleSetFieldValue}
            errorText={'Error message'}
          />
          <Input
            {...emailInputLogic}
            name={'email'}
            placeholder={'Логин'}
            value={userInfoForm.email}
            onChange={handleSetFieldValue}
            errorText={'Error message'}
          />
          <Input
            {...passwordInputLogic}
            name={'password'}
            placeholder={'Пароль'}
            value={userInfoForm.password}
            onChange={handleSetFieldValue}
            errorText={'Error message'}
          />
          <div className={styles.formActions}>
            <Button type={'secondary'} htmlType={'reset'} disabled={false} onClick={handleReset}>
              Отмена
            </Button>
            <Button
              type={'primary'}
              htmlType={'submit'}
              disabled={!canSubmit}
              onClick={handleSubmit}>
              Сохранить
            </Button>
          </div>
        </Form>
      );
    } else if (getUserInfoFailed || setUserInfoFailed) {
      return <h1>something wrong</h1>;
    } else {
      return null;
    }
  }, [
    userInfoForm,
    emailInputLogic,
    nameInputLogic,
    passwordInputLogic,
    setUserInfoFailed,
    setUserInfoRequest,
    userInfoLoaded,
    getUserInfoFailed,
    getUserInfoRequest,
    handleSetFieldValue,
  ]);

  return userProfileForm;
};
