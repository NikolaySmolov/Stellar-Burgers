import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Form } from '../form/form';
import { useInputLogic } from '../../services/hooks';
import { ACCESS_TOKEN } from '../../utils/constants';
import styles from './user-info.module.css';
import { getUserProfileInfo, setProfileUserInfoFormValue } from '../../services/actions/profile';
import { getCookie } from '../../services/utils';

export const UserInfo = () => {
  const {
    userInfoForm,
    userInfoLoaded,
    getUserInfoRequest,
    getUserInfoFailed,
    setUserInfoRequest,
    setUserInfoFailed,
  } = useSelector(store => store.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfileInfo(getCookie(ACCESS_TOKEN)));
  }, [dispatch]);

  const [inputState, setInputState] = useState(1);

  const nameInputLogic = useInputLogic({ initType: 'text', disabledState: true });
  const emailInputLogic = useInputLogic({ initType: 'email', disabledState: true });
  const passwordInputLogic = useInputLogic({ initType: 'password', disabledState: true });

  const handleSetFieldValue = useCallback(
    evt => {
      const field = evt.currentTarget;
      dispatch(setProfileUserInfoFormValue(field.name, field.value));
    },
    [dispatch]
  );

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log('submit form');
  };

  const handleReset = () => {
    setInputState(2);
  };

  const userProfileForm = useMemo(() => {
    if (getUserInfoRequest || setUserInfoRequest) {
      return null;
    } else if (userInfoLoaded) {
      return (
        <Form formName={'profile'} key={inputState}>
          <Input
            // {...nameInputLogic}
            icon={'EditIcon'}
            disabled={true}
            onIconClick={() => console.log()}
            name={'name'}
            placeholder={'Имя'}
            value={userInfoForm.name}
            onChange={handleSetFieldValue}
            errorText={'Error message'}
          />
          {/* <Input
            {...nameInputLogic}
            name={'name'}
            placeholder={'Имя'}
            value={userInfoForm.name}
            onChange={handleSetFieldValue}
            errorText={'Error message'}
          /> */}
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
            <Button type={'primary'} htmlType={'submit'} disabled={false} onClick={handleSubmit}>
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
