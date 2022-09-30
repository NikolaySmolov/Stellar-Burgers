import { useEffect, useMemo, useState } from 'react';
import { setTimeFormat } from '../../services/utils';
import { BUN, CREATED, DONE, IIngredient, PENDING, TOrderStatus } from '../../utils/constants';

interface IIngredientData {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

type TStatusText = 'Создан' | 'Готовится' | 'Выполнен';

type TUseOrderData = (
  burgerIngredientsId: Array<string>,
  ingredients: ReadonlyArray<IIngredient>,
  dateString: string,
  status: TOrderStatus
) => [Array<IIngredientData> | null, string | null, string | null, TStatusText | null];

export const useOrderData: TUseOrderData = (
  burgerIngredientsId,
  ingredients,
  dateString,
  status
) => {
  const [ingredientList, setIngredientsList] = useState<Array<IIngredientData> | null>(null);
  const [orderDate, setOrderDate] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<string | null>(null);
  const [statusText, setStatusText] = useState<TStatusText | null>(null);

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

    return `${hours}:${minutes} `;
  };

  const preparedDate = useMemo(() => {
    if (!dateString) {
      return null;
    }

    const result = `${date()}, ${time()} i-GMT+3`;
    return result;
    // eslint-disable-next-line
  }, [dateString]);

  const preparedIngredientsData = useMemo(() => {
    if (!burgerIngredientsId) {
      return null;
    }

    const result: Array<IIngredientData> = burgerIngredientsId.reduce(
      (acc: Array<any> | Array<IIngredientData>, item) => {
        const itemIndex = acc.findIndex(ingredient => ingredient.id === item);

        if (~itemIndex) {
          acc[itemIndex].qty++;
        } else {
          const { name, image, price, type } = ingredients.find(
            ({ _id }) => _id === item
          ) as IIngredient;

          const ingredientData: IIngredientData = { id: item, name, price, image, qty: 1 };

          if (type === BUN) {
            ingredientData.qty = 2;
          }

          acc.push(ingredientData);
        }
        return acc;
      },
      []
    );

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
