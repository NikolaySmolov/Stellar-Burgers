import { useEffect, useMemo } from 'react';
import { CardOrder } from '../../components/card-order/card-order';
import { Loader } from '../../components/loader/loader';
import { ModalError } from '../../components/modal-error/modal-error';
import {
  getWSocketConnectionStartAction,
  getWSocketConnectionCloseAction,
} from '../../services/actions/web-socket';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { selectFeedOrders, selectFeedOrdersState } from '../../services/selectors/feed';
import { WS_URL } from '../../utils/constants';
import style from './feed.module.css';

export const FeedPage = () => {
  const {
    total: feedTotal,
    totalToday: feedToday,
    connecting: feedConnecting,
    error: feedError,
  } = useAppSelector(selectFeedOrdersState);

  const feedOrders = useAppSelector(selectFeedOrders);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWSocketConnectionStartAction(`${WS_URL}/all`));

    return () => {
      dispatch(getWSocketConnectionCloseAction());
    };
  }, [dispatch]);

  const ordersStats = useMemo(() => {
    const preparedStats = feedOrders.reduce(
      (acc: { done: number[]; inProgress: number[] }, curr) => {
        if (curr.status === 'Выполнен' && acc.done.length < 20) {
          acc.done.push(curr.number);
        } else if (curr.status === 'Готовится' && acc.inProgress.length < 20) {
          acc.inProgress.push(curr.number);
        }

        return acc;
      },
      {
        done: [],
        inProgress: [],
      }
    );

    return preparedStats;
  }, [feedOrders]);

  if ((feedOrders.length === 0 && !feedError) || feedConnecting) {
    return <Loader />;
  } else if (feedError) {
    return <ModalError />;
  }

  return (
    <main className={style.content}>
      <section>
        <h1 className={'text text_type_main-large mt-10 mb-5 pl-2'}>Лента заказов</h1>
        <ul className={`${style.orderList} pl-2 pr-2 custom-scroll`}>
          {feedOrders.map(({ _id, number, createdAt, name, status, ingredients, totalPrice }) => {
            return (
              <li className={style.orderListItem} key={_id}>
                <CardOrder
                  withStatus={false}
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
      </section>
      <section className={`${style.statsWrapper} custom-scroll mt-25`}>
        <div className={style.ordersBoards}>
          <section className={`${style.statsColumn} mr-9`}>
            <h2 className={`${style.statsTitle} text text_type_main-medium`}>Готовы:</h2>
            <ul className={style.statsList}>
              {ordersStats.done.map(orderNumber => (
                <li className={style.statsListItem} key={orderNumber}>
                  <p
                    className={`${style.statsListText} text text_type_digits-default text_color_success`}>
                    {orderNumber}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          <section className={style.statsColumn}>
            <h2 className={`${style.statsTitle} text text_type_main-medium`}>В&nbsp;работе:</h2>
            <ul className={style.statsList}>
              {ordersStats.inProgress.map(orderNumber => (
                <li className={style.statsListItem} key={orderNumber}>
                  <p className={`${style.statsListText} text text_type_digits-default`}>
                    {orderNumber}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className={`${style.completedAllTimeWrapper} mb-15`}>
          <h2 className={`${style.statsTitle}  text text_type_main-medium`}>
            Выполнено за&nbsp;все время:
          </h2>
          <p className={`${style.counterText} text text_type_digits-large`}>
            {feedTotal ? feedTotal.toLocaleString('ru-RU') : 0}
          </p>
        </div>
        <div className={style.completedTodayWrapper}>
          <h2 className={`${style.statsTitle}  text text_type_main-medium`}>
            Выполнено за&nbsp;сегодня:
          </h2>
          <p className={`${style.counterText} text text_type_digits-large`}>
            {feedToday ? feedToday.toLocaleString('ru-RU') : 0}
          </p>
        </div>
      </section>
    </main>
  );
};
