import { useEffect } from 'react';
import {
  getWSocketConnectionStartAction,
  getWSocketConnectionCloseAction,
} from '../../services/actions/web-socket';
import { useAppDispatch, useAppSelector } from '../../services/redux-hooks';
import { selectFeedError, selectFeedOrders } from '../../services/selectors/feed';
import { getWsProfileEndpoint } from '../../services/utils';
import { CardOrder } from '../card-order/card-order';
import { Loader } from '../loader/loader';
import style from './user-orders.module.css';

export const UserOrders = () => {
  const feedOrders = useAppSelector(selectFeedOrders);

  const feedError = useAppSelector(selectFeedError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const wsProfileEndpoint = getWsProfileEndpoint();

    dispatch(getWSocketConnectionStartAction(wsProfileEndpoint));

    return () => {
      dispatch(getWSocketConnectionCloseAction());
    };
  }, [dispatch]);

  if (feedOrders.length === 0 && !feedError) {
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
        {reversedOrders.map(({ _id, number, createdAt, name, status, ingredients }) => {
          return (
            <li className={style.orderListItem} key={_id}>
              <CardOrder
                withStatus={true}
                number={number}
                name={name}
                burgerIngredientsId={ingredients}
                status={status}
                createdAt={createdAt}
                id={_id}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
