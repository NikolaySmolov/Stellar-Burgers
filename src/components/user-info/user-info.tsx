import React, { ChangeEvent, useCallback, useEffect } from 'react';
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
} from '../../services/actions/user';
import { getCookie } from '../../services/utils';
import { Loader } from '../loader/loader';
import { useAppDispatch, useAppSelector } from '../../services/redux-hooks';
import {
  selectUserInfo,
  selectUserInfoFailed,
  selectUserInfoForm,
  selectUserInfoLoaded,
  selectUserInfoRequest,
} from '../../services/selectors/user';
import { selectProfileFormState } from '../../services/selectors/profile-form';
import {
  getProfileFormSetValueAction,
  setNewProfileData,
} from '../../services/actions/profile-form';
import { TProfileForm } from '../../services/types/data';

export const UserInfo = () => {
  // const userInfo = useAppSelector(selectUserInfo);
  // const userInfoForm = useAppSelector(selectUserInfoForm);
  // const userInfoLoaded = useAppSelector(selectUserInfoLoaded);
  // const userInfoRequest = useAppSelector(selectUserInfoRequest);
  // const userInfoFailed = useAppSelector(selectUserInfoFailed);

  const {
    name: nameValue,
    email: emailValue,
    password: passwordValue,
    request,
    failed,
    error,
  } = useAppSelector(selectProfileFormState);

  const { name: userName, email: userEmail } = useAppSelector(store => store.auth);

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

  const handleSetFieldValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const field = e.currentTarget;
      dispatch(getProfileFormSetValueAction({ [field.name]: field.value }));
    },
    [dispatch]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: TProfileForm = { name: nameValue, email: emailValue };
    if (passwordValue !== FAKE_PASSWORD) {
      formData.password = passwordValue;
    }
    debugger;
    dispatch(setNewProfileData(formData));

    resetFields(); // maybe move in effect
  };

  const handleReset = () => {
    dispatch(setProfileUserInfoFormReset());

    resetFields();
  };

  useEffect(() => {
    debugger;
    dispatch(getProfileFormSetValueAction({ name: userName, email: userEmail }));
    // if (!userInfoLoaded) {
    //   dispatch(getUserProfileInfo(getCookie(ACCESS_TOKEN)));
    // }
    // return () => {
    //   handleReset();
    // }
  }, [dispatch, userName, userEmail]);

  if (request) {
    return <Loader />;
  }
  // if (userInfoFailed) {
  //   return (
  //     <h1 className={'text text_type_main-default text_color_inactive pt-20'}>
  //       Что-то пошло не так... Попробуйте обновить страницу
  //     </h1>
  //   );
  // } else if (!userInfoLoaded || userInfoRequest) {
  //   return <Loader />;
  // }
  return (
    <Form formName={'profile'} onSubmit={handleSubmit} onReset={handleReset}>
      <Input
        {...nameInputLogic}
        name={'name'}
        placeholder={'Имя'}
        value={nameValue}
        onChange={handleSetFieldValue}
        errorText={'Error message'} //delete or in work
      />
      <Input
        {...emailInputLogic}
        name={'email'}
        placeholder={'Логин'}
        value={emailValue}
        onChange={handleSetFieldValue}
        errorText={'Error message'} //delete or in work
      />
      <Input
        {...passwordInputLogic}
        name={'password'}
        placeholder={'Пароль'}
        value={passwordValue}
        onChange={handleSetFieldValue}
        errorText={'Error message'} //delete or in work
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
  );
};
