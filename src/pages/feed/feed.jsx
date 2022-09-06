import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardOrder } from '../../components/card-order/card-order';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../../services/actions/web-socket';
import { DONE, PENDING } from '../../utils/constants';
import style from './feed.module.css';

export const FeedPage = () => {
  const { ingredients, ordersData, connected, error } = useSelector((store) => ({
    ingredients: store.burger.ingredients,
    ...store.orders,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    };
  }, [dispatch]);

  const ordersStats = useMemo(() => {
    if (ordersData.orders) {
      const preparedStats = ordersData.orders.reduce(
        (acc, curr) => {
          if (curr.status === DONE && acc.done.length < 20) {
            acc.done.push(curr.number);
          } else if (curr.status === PENDING && acc.inProgress < 20) {
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
    }

    return null;
  }, [ordersData]);

  if (ingredients.length === 0 || ordersData.length === 0) {
    return;
  }

  return (
    <main className={style.content}>
      <section className={style.orders}>
        <h1 className={'text text_type_main-large mt-10 mb-5 pl-2'}>Лента заказов</h1>
        <ul className={`${style.orderList} pl-2 pr-2 custom-scroll`}>
          {ordersData.orders.map(({ _id, number, createdAt, name, status, ingredients }) => {
            return (
              <li className={style.orderItem} key={_id}>
                <CardOrder
                  withStatus={false}
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
      </section>
      <section className={`${style.statsWrapper} custom-scroll mt-25`}>
        <div className={style.ordersBoards}>
          <section className={`${style.statsColumn} mr-9`}>
            <h2 className={`${style.statsTitle} text text_type_main-medium`}>Готовы:</h2>
            <ul className={style.statsList}>
              {ordersStats.done.map((orderNumber) => (
                <li className={style.statsListItem} key={orderNumber}>
                  <p
                    className={`${style.statsListText} text text_type_digits-default text_color_success`}
                  >
                    {orderNumber}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          <section className={style.statsColumn}>
            <h2 className={`${style.statsTitle} text text_type_main-medium`}>В&nbsp;работе:</h2>
            <ul className={style.statsList}>
              {ordersStats.inProgress.map((orderNumber) => (
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
            {ordersData.total.toLocaleString('ru-RU')}
          </p>
        </div>
        <div className={style.completedTodayWrapper}>
          <h2 className={`${style.statsTitle}  text text_type_main-medium`}>
            Выполнено за&nbsp;все сегодня:
          </h2>
          <p className={`${style.counterText} text text_type_digits-large`}>
            {ordersData.totalToday.toLocaleString('ru-RU')}
          </p>
        </div>
      </section>
    </main>
  );
};
