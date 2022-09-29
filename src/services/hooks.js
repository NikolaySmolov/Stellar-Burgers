import { useRef, useState, useMemo, useEffect } from 'react';
import { BUN, CREATED, DONE, PENDING } from '../utils/constants';
import { setTimeFormat } from './utils';

export const useInputLogic = ({ initType, initIcon = undefined, disabledState = false }) => {
  const [disabled, setDisabled] = useState(disabledState);
  const [icon, setIcon] = useState(initIcon);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] = useState(initType);

  const inputRef = useRef(null);

  const validateField = fieldValue => {
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
      inputRef.current.value = '';
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

export const useOrderData = (burgerIngredientsId, ingredients, dateString, status) => {
  const [ingredientList, setIngredientsList] = useState(null);
  const [orderDate, setOrderDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [statusText, setStatusText] = useState(null);
  const date = () => {
    const today = new Date();
    today.setHours(24, 0, 0, 0);
    const createdAt = new Date(Date.parse(dateString));

    const difference = Math.floor((today - createdAt) / (1000 * 60 * 60 * 24));

    const defineNumber = number => {
      const lastDigit = Number(String(number).split('').at(-1));
      return lastDigit;
    };

    if (difference === 0) {
      return 'Сегодня';
    } else if (difference === 1) {
      return 'Вчера';
    } else if (defineNumber(difference) === 1 && difference !== 1 && difference > 20) {
      return `${difference} день назад`;
    } else if (defineNumber(difference) > 1 && defineNumber(difference) < 5 && difference < 10) {
      return `${difference} дня назад`;
    } else if (defineNumber(difference) > 1 && defineNumber(difference) < 5 && difference > 20) {
      return `${difference} дня назад`;
    } else {
      return `${difference} дней назад`;
    }
  };

  const time = () => {
    const createdAt = new Date(Date.parse(dateString));

    const hours = setTimeFormat(createdAt.getHours());
    const minutes = setTimeFormat(createdAt.getMinutes());

    return `${hours}:${minutes} `;
  };

  const preparedDate = useMemo(() => {
    if (!dateString) {
      return null;
    }

    const result = `${date(dateString)}, ${time(dateString)} i-GMT+3`;
    return result;
    // eslint-disable-next-line
  }, [dateString]);

  const preparedIngredientsData = useMemo(() => {
    if (!burgerIngredientsId) {
      return null;
    }

    const result = burgerIngredientsId.reduce((acc, item) => {
      const itemIndex = acc.findIndex(ingredient => ingredient.id === item);

      if (~itemIndex) {
        acc[itemIndex].qty++;
      } else {
        const { name, image, price, type } = ingredients.find(({ _id }) => _id === item);

        const ingredientData = { id: item, name, price, image, qty: 1 };

        if (type === BUN) {
          ingredientData.qty = 2;
        }

        acc.push(ingredientData);
      }
      return acc;
    }, []);

    return result;
  }, [burgerIngredientsId, ingredients]);

  const preparedTotalPrice = useMemo(() => {
    if (!preparedIngredientsData) {
      return null;
    }

    const sum = preparedIngredientsData.reduce((acc, ing) => {
      acc += ing.price * ing.qty;
      return acc;
    }, 0);
    return sum.toLocaleString('ru-RU');
  }, [preparedIngredientsData]);

  const preparedStatusText = useMemo(() => {
    if (!status) {
      return null;
    }

    switch (status) {
      case CREATED:
        return 'Создан';
      case PENDING:
        return 'Готовится';
      case DONE:
        return 'Выполнен';
      default:
        return status;
    }
  }, [status]);

  useEffect(() => {
    setIngredientsList(preparedIngredientsData);
    setOrderDate(preparedDate);
    setTotalPrice(preparedTotalPrice);
    setStatusText(preparedStatusText);
  }, [preparedIngredientsData, preparedDate, preparedTotalPrice, preparedStatusText]);

  return [ingredientList, orderDate, totalPrice, statusText];
};
