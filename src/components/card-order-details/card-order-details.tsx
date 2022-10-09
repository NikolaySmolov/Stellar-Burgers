import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useOrderData } from '../../services/hooks';
import { useAppSelector } from '../../services/hooks';
import { selectIngredientsState } from '../../services/selectors/ingredients';
import { selectFeedOrdersState } from '../../services/selectors/feed';
import { IParamsForId } from '../../services/hooks';
import { DONE } from '../../utils/constants';
import { OrderRow } from '../order-row/order-row';
import style from './card-order-details.module.css';

export const CardOrderDetails = () => {
  const { ingredients: ingredientsMenu } = useAppSelector(selectIngredientsState);
  const { orders: feedOrders } = useAppSelector(selectFeedOrdersState);

  const { id: orderId } = useParams<IParamsForId>();

  const orderData = useMemo(() => {
    return feedOrders.find(({ _id }) => _id === orderId);
  }, [feedOrders, orderId]);

  const [ingredientsList, orderDate, totalPrice, statusText] = useOrderData(
    orderData.ingredients,
    ingredientsMenu,
    orderData.createdAt,
    orderData.status
  );

  return (
    <section className={style.details}>
      <p className={`${style.number} text text_type_digits-default mb-10`}>#{orderData.number}</p>
      <h1 className={'text text_type_main-medium'}>{orderData.name}</h1>
      <p
        className={`text text_type_main-default mt-3 mb-15 ${
          orderData.status === DONE ? 'text_color_success' : null
        }`}>
        {statusText}
      </p>
      <h2 className={'text text_type_main-medium mb-6'}>Состав:</h2>
      <ul className={`${style.list} custom-scroll mb-10 pr-6`}>
        {ingredientsList.map(ingredientData => {
          return (
            <li className={`${style.listItem}`} key={ingredientData.id}>
              <OrderRow {...ingredientData} />
            </li>
          );
        })}
      </ul>
      <div className={style.footer}>
        <p className={'text text_type_main-default text_color_inactive'}>{orderDate}</p>
        <div className={style.totalWrapper}>
          <p className={'text text_type_digits-default mr-2'}>{totalPrice}</p>
          <CurrencyIcon type={'primary'} />
        </div>
      </div>
    </section>
  );
};
