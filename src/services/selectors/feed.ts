import { createSelector } from 'reselect';
import { BUN, CREATED, PENDING } from '../../utils/constants';
import { IIngredientDataInOrder } from '../../utils/types';
import { RootState } from '../types';
import { setTimeFormat } from '../utils';
import { selectIngreditntsList } from './ingredients';

export const selectFeedOrdersState = (store: RootState) => ({
  connected: store.feed.connected,
  connecting: store.feed.connecting,
  error: store.feed.error,
  total: store.feed.total,
  totalToday: store.feed.totalToday,
});

const selectInitFeedOrders = (store: RootState) => store.feed.orders;

export const selectFeedOrders = createSelector(
  [selectInitFeedOrders, selectIngreditntsList],
  (initFeedOrders, ingredientsList) => {
    const preparedOrders = initFeedOrders.map(order => {
      //prepare order ingredients
      const preparedOrderIngredients = order.ingredients.reduce(
        (preparingList: Array<IIngredientDataInOrder>, orderIngredientId) => {
          const repeatedItemIndex = preparingList.findIndex(item => item.id === orderIngredientId);

          if (Boolean(~repeatedItemIndex)) {
            preparingList[repeatedItemIndex].qty++;
          } else {
            const ingredientProps = ingredientsList.find(({ _id }) => _id === orderIngredientId);

            if (ingredientProps) {
              const { _id: id, name, price, image } = ingredientProps;

              const ingredientDataInOrder = {
                id,
                name,
                price,
                image,
                qty: 1,
              };

              if (ingredientProps.type === BUN) {
                ingredientDataInOrder.qty = 2;
              }

              preparingList.push(ingredientDataInOrder);
            }
          }

          return preparingList;
        },
        []
      );

      //prepare date
      const getDate = () => {
        const today = new Date();
        today.setHours(24, 0, 0, 0);
        const createdAt = new Date(Date.parse(order.createdAt));

        const difference = Math.floor(
          (today.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
        );

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
        } else if (
          defineNumber(difference) > 1 &&
          defineNumber(difference) < 5 &&
          difference < 10
        ) {
          return `${difference} дня назад`;
        } else if (
          defineNumber(difference) > 1 &&
          defineNumber(difference) < 5 &&
          difference > 20
        ) {
          return `${difference} дня назад`;
        } else {
          return `${difference} дней назад`;
        }
      };

      const getTime = () => {
        const createdAt = new Date(Date.parse(order.createdAt));

        const hours = setTimeFormat(createdAt.getHours());
        const minutes = setTimeFormat(createdAt.getMinutes());

        return `${hours}:${minutes}`;
      };

      const preparedOrderDate = `${getDate()}, ${getTime()} i-GMT+3`;

      //prepare total price
      const preparedTotalPrice = preparedOrderIngredients
        .reduce((acc, ing) => {
          acc += ing.price * ing.qty;
          return acc;
        }, 0)
        .toLocaleString('ru-RU');

      //prepare status text
      const preparedStatusText =
        order.status === CREATED ? 'Создан' : order.status === PENDING ? 'Готовится' : 'Выполнен';

      const preparedOrder: {
        _id: string;
        number: number;
        name: string;
        ingredients: IIngredientDataInOrder[];
        status: typeof preparedStatusText;
        createdAt: string;
        totalPrice: string;
      } = {
        _id: order._id,
        number: order.number,
        name: order.name,
        ingredients: preparedOrderIngredients,
        status: preparedStatusText,
        createdAt: preparedOrderDate,
        totalPrice: preparedTotalPrice,
      };

      return preparedOrder;
    });

    return preparedOrders;
  }
);
