import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, AppThunk } from './types';
import { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { useRef, useState, FocusEvent } from 'react';

export const useAppDispatch: () => AppDispatch | AppThunk = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type TInputType = 'text' | 'email' | 'password';

interface IUseInputLogic {
  initType: TInputType;
  initIcon?: keyof TICons;
  disabledState?: boolean;
}

export const useInputLogic = ({
  initType,
  initIcon = undefined,
  disabledState = false,
}: IUseInputLogic) => {
  const [disabled, setDisabled] = useState(disabledState);
  const [icon, setIcon] = useState(initIcon);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] = useState(initType);

  const inputRef = useRef<HTMLInputElement>(null);

  const validateField = (fieldValue: string) => {
    switch (initType) {
      case 'password':
        if (fieldValue.length > 0 && fieldValue.length < 6 && !disabled) {
          setError(true);
        }
        break;
      case 'email':
        if (
          !fieldValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i) &&
          fieldValue.length > 0
        ) {
          setError(true);
        }
        break;
      default:
        return;
    }
  };

  const onIconClick = () => {
    if (!disabled && initType !== 'password') return;

    if (initType === 'password' && disabled) {
      setIcon('ShowIcon');
    } else if (initType === 'password' && !disabled && !visible) {
      setIcon('HideIcon');
      setVisible(true);
      setType('text');
    } else if (initType !== 'password') {
      setIcon(undefined);
    }

    setDisabled(false);

    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const onFocus = () => {
    setError(false);
  };

  const onBlur = (evt: FocusEvent<HTMLInputElement>) => {
    if (initType === 'password') {
      setType('password');
      setIcon('ShowIcon');
      setVisible(false);
    }
    setTimeout(() => {
      validateField(evt.target.value);
    }, 100);
  };

  const fieldReset = () => {
    setError(false);
    setDisabled(true);
    setIcon(initIcon);
  };

  return { icon, ref: inputRef, onIconClick, onBlur, onFocus, error, type, disabled, fieldReset };
};

export type TLocation<S extends 'from' | 'background'> = {
  [key in S]: {
    hash: string;
    pathname: string;
    search: string;
    state: unknown;
  };
};

export interface IParamsForId {
  id: string;
}
