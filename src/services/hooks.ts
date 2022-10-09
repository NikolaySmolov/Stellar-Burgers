import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, AppThunk } from './types';
import { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { useRef, useState, useMemo, useEffect, FocusEvent } from 'react';
import { BUN, CREATED, DONE, PENDING } from '../utils/constants';
import { IIngredient, IIngredientDataInOrder, TOrderStatus } from '../utils/types';
import { setTimeFormat } from './utils';

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

type TStatusText = 'Создан' | 'Готовится' | 'Выполнен';

type TUseOrderData = (
  burgerIngredientsId: ReadonlyArray<string>,
  ingredients: ReadonlyArray<IIngredient>,
  dateString: string,
  status: TOrderStatus
) => [Array<IIngredientDataInOrder>, string, string, TStatusText];

export const useOrderData: TUseOrderData = (
  burgerIngredientsId,
  ingredients,
  dateString,
  status
) => {
  const [ingredientList, setIngredientsList] = useState<Array<IIngredientDataInOrder>>([]);
  const [orderDate, setOrderDate] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<string>('');
  const [statusText, setStatusText] = useState<TStatusText>('Выполнен');

  const date = () => {
    const today = new Date();
    today.setHours(24, 0, 0, 0);
    const createdAt = new Date(Date.parse(dateString));

    const difference = Math.floor((today.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

    const defineNumber = (num: number) => {
      const lastDigit = Number(String(num).split('').at(-1));
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

    return `${hours}:${minutes}`;
  };

  const preparedDate = useMemo(() => {
    const result = `${date()}, ${time()} i-GMT+3`;
    return result;
    // eslint-disable-next-line
  }, [dateString]);

  const preparedIngredientsData = useMemo(() => {
    const result: Array<IIngredientDataInOrder> = burgerIngredientsId.reduce(
      (acc: Array<IIngredientDataInOrder>, item) => {
        const itemIndex = acc.findIndex(ingredient => ingredient.id === item);

        if (~itemIndex) {
          acc[itemIndex].qty++;
        } else {
          const ingredient = ingredients.find(({ _id }) => _id === item);

          if (ingredient) {
            const { name, image, price, type } = ingredient;

            const renderingIngredient: IIngredientDataInOrder = {
              id: item,
              name,
              price,
              image,
              qty: 1,
            };
            if (type === BUN) {
              renderingIngredient.qty = 2;
            }

            acc.push(renderingIngredient);
          }
        }
        return acc;
      },
      []
    );

    return result;
  }, [burgerIngredientsId, ingredients]);

  const preparedTotalPrice = useMemo(() => {
    const sum = preparedIngredientsData.reduce((acc, ing) => {
      acc += ing.price * ing.qty;
      return acc;
    }, 0);
    return sum.toLocaleString('ru-RU');
  }, [preparedIngredientsData]);

  const preparedStatusText = useMemo(() => {
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
