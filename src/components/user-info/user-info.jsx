import { useCallback, useEffect } from 'react';
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
import { Loader } from '../loader/loader';

export const UserInfo = () => {
  const {
    userInfo,
    userInfoForm,
    userInfoLoaded,
    getUserInfoRequest,
    getUserInfoFailed,
    setUserInfoFailed,
  } = useSelector((store) => store.profile);

  const dispatch = useDispatch();

  const nameInputLogic = useInputLogic({ initType: 'text', disabledState: true });
  const emailInputLogic = useInputLogic({ initType: 'email', disabledState: true });
  const passwordInputLogic = useInputLogic({ initType: 'password', disabledState: true });

  const fieldsProps = [nameInputLogic, emailInputLogic, passwordInputLogic];

  const canSubmit =
    fieldsProps.every(({ error }) => error === false) &&
    (userInfo.name !== userInfoForm.name ||
      userInfo.email !== userInfoForm.email ||
      userInfoForm.password !== FAKE_PASSWORD);

  const someEnabled = fieldsProps.some(({ disabled }) => disabled === false);

  const resetFields = () => {
    fieldsProps.forEach((field) => field.fieldReset());
  };

  const handleSetFieldValue = useCallback(
    (evt) => {
      const field = evt.currentTarget;
      dispatch(setProfileUserInfoFormValue(field.name, field.value));
    },
    [dispatch]
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = { ...userInfoForm };
    if (formData.password === FAKE_PASSWORD) {
      delete formData.password;
    }
    dispatch(setUserProfileInfo(getCookie(ACCESS_TOKEN), formData));

    resetFields();
  };

  const handleReset = () => {
    dispatch(setProfileUserInfoFormReset());

    resetFields();
  };

  useEffect(() => {
    if (!userInfoLoaded) {
      console.log('user-info - get user profile info');
      dispatch(getUserProfileInfo(getCookie(ACCESS_TOKEN)));
    }
    return () => handleReset();
    // eslint-disable-next-line
  }, [dispatch, userInfoLoaded]);

  if (!userInfoLoaded && getUserInfoRequest) {
    return <Loader />;
  } else if (!userInfoLoaded) {
    return null;
  } else if (getUserInfoFailed || setUserInfoFailed) {
    return (
      <h1 className={'text text_type_main-default text_color_inactive pt-20'}>
        Что-то пошло не так... Попробуйте обновить страницу
      </h1>
    );
  }

  return (
    <Form formName={'profile'} onSubmit={handleSubmit} onReset={handleReset}>
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
