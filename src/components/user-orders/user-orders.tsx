import { useEffect } from 'react';
import {
  getWSocketConnectionStartAction,
  getWSocketConnectionCloseAction,
} from '../../services/actions/web-socket';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { selectFeedOrders, selectFeedOrdersState } from '../../services/selectors/feed';
import { getWsProfileEndpoint } from '../../services/utils';
import { WS_URL } from '../../utils/constants';
import { CardOrder } from '../card-order/card-order';
import { Loader } from '../loader/loader';
import style from './user-orders.module.css';

export const UserOrders = () => {
  const { connecting: feedConnecting, error: feedError } = useAppSelector(selectFeedOrdersState);

  const feedOrders = useAppSelector(selectFeedOrders);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWSocketConnectionStartAction(WS_URL + getWsProfileEndpoint()));

    return () => {
      dispatch(getWSocketConnectionCloseAction());
    };
  }, [dispatch]);

  if ((feedOrders.length === 0 && !feedError) || feedConnecting) {
    return (
      <div className={style.loaderWrapper}>
        <Loader />
      </div>
    );
  } else if (feedError) {
    return (
      <h2 className={'text text_type_main-medium'}>
        {`Что-то пошло не так... Попробуйте обновить страницу. Ошибка: ${feedError}`}
      </h2>
    );
  }

  const reversedOrders = [...feedOrders].reverse();

  return (
    <div className={`${style.ordersWrapper} custom-scroll`}>
      <ul className={`${style.orderList} pl-2 pr-2`}>
        {reversedOrders.map(({ _id, number, createdAt, name, status, ingredients, totalPrice }) => {
          return (
            <li className={style.orderListItem} key={_id}>
              <CardOrder
                withStatus={true}
                number={number}
                name={name}
                burgerIngredients={ingredients}
                status={status}
                createdAt={createdAt}
                totalPrice={totalPrice}
                id={_id}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
