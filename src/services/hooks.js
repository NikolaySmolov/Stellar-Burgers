import { useRef, useState } from 'react';

export const useInputLogic = ({ initType, initIcon = 'EditIcon', disabledState = false }) => {
  const [disabled, setDisabled] = useState(disabledState);
  const [icon, setIcon] = useState(initIcon);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] = useState(initType);

  const inputRef = useRef(null);

  const validateField = fieldValue => {
    switch (initType) {
      case 'password':
        if (fieldValue.length < 6) {
          setError(true);
        }
        break;
      case 'text':
        break;
      case 'email':
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
      setIcon(null);
    }

    setDisabled(false);

    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const onFocus = () => {
    setError(false);
  };

  const onBlur = evt => {
    if (initType === 'password') {
      setType('password');
      setIcon('ShowIcon');
      setVisible(false);
    }
    validateField(evt.target.value);
  };

  return { icon, ref: inputRef, onIconClick, onBlur, onFocus, error, type, disabled };
};
