import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Redirect, useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';
import { selectFeedOrders, selectFeedOrdersState } from '../../services/selectors/feed';
import { IParamsForId } from '../../services/hooks';
import { OrderRow } from '../order-row/order-row';
import style from './card-order-details.module.css';
import { Loader } from '../loader/loader';

export const CardOrderDetails = () => {
  const feedOrders = useAppSelector(selectFeedOrders);
  const { connecting: feedConnecting } = useAppSelector(selectFeedOrdersState);

  const { id: orderId } = useParams<IParamsForId>();

  if (feedOrders.length === 0 || feedConnecting) {
    return <Loader />;
  }

  const orderData = feedOrders.find(({ _id }) => _id === orderId);

  if (!orderData) {
    return <Redirect to={{ pathname: '/order-not-found' }} />;
  }

  return (
    <section className={style.details}>
      <p className={`${style.number} text text_type_digits-default mb-10`}>#{orderData.number}</p>
      <h1 className={'text text_type_main-medium'}>{orderData.name}</h1>
      <p
        className={`text text_type_main-default mt-3 mb-15 ${
          orderData.status === 'Выполнен' ? 'text_color_success' : null
        }`}>
        {orderData.status}
      </p>
      <h2 className={'text text_type_main-medium mb-6'}>Состав:</h2>
      <ul className={`${style.list} custom-scroll mb-10 pr-6`}>
        {orderData.ingredients.map(ingredientData => {
          return (
            <li className={`${style.listItem}`} key={ingredientData.id}>
              <OrderRow {...ingredientData} />
            </li>
          );
        })}
      </ul>
      <div className={style.footer}>
        <p className={'text text_type_main-default text_color_inactive'}>{orderData.createdAt}</p>
        <div className={style.totalWrapper}>
          <p className={'text text_type_digits-default mr-2'}>{orderData.totalPrice}</p>
          <CurrencyIcon type={'primary'} />
        </div>
      </div>
    </section>
  );
};
