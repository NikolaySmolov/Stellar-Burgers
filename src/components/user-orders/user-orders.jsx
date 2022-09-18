import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSocketConnection, setSocketDisconnect } from '../../services/actions/web-socket';
import { WS_ENDPOINT_PROFILE } from '../../services/utils';
import { CardOrder } from '../card-order/card-order';
import { Loader } from '../loader/loader';
import style from './user-orders.module.css';

export const UserOrders = () => {
  const { ingredients, ordersData, error } = useSelector(store => ({
    ingredients: store.ingredients.ingredients,
    ...store.orders,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSocketConnection(WS_ENDPOINT_PROFILE));

    return () => {
      dispatch(setSocketDisconnect());
    };
  }, [dispatch]);

  if (ingredients.length === 0 || ordersData.length === 0) {
    return (
      <div className={style.loaderWrapper}>
        <Loader />
      </div>
    );
  } else if (error) {
    return (
      <h2 className={'text text_type_main-medium'}>
        Что-то пошло не так... Попробуйте обновить страницу
      </h2>
    );
  }

  const reversedOrders = [...ordersData.orders].reverse();

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
                ingredients={ingredients}
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
