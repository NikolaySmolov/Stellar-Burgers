import { useSelector } from 'react-redux';
import { CardOrder } from '../../components/card-order/card-order';
import style from './feed.module.css';

const feedCard = {
  createdAt: '2022-08-29T07:55:43.747Z',
  ingredients: [
    '60d3b41abdacab0026a733c6',
    '60d3b41abdacab0026a733cd',
    '60d3b41abdacab0026a733cf',
    '60d3b41abdacab0026a733cd',
  ],
  name: 'Space антарианский краторный бургер',
  number: 24239,
  status: 'done',
  updatedAt: '2022-08-29T07:55:44.181Z',
  _id: '630c70ff42d34a001c28491d',
};

const mockDone = [
  24239, 24565, 23456, 25854, 23659, 24690, 24595, 25456, 22345, 34552, 23456, 31345, 31235, 22152,
  34533, 43123, 34543, 21345, 22653, 21532,
];

const mockInProgress = [24239, 24565, 23456, 25854, 23659];

export const FeedPage = () => {
  const ingredients = useSelector((store) => store.burger.ingredients);

  if (ingredients.length === 0) {
    return;
  }

  return (
    <main className={style.content}>
      <section className={style.orders}>
        <h1 className={'text text_type_main-large mt-10 mb-5 pl-2'}>Лента заказов</h1>
        <ul className={`${style.orderList} pl-2 pr-2 custom-scroll`}>
          <li className={style.orderItem}>
            <CardOrder />
          </li>
          <li className={style.orderItem}>
            <CardOrder />
          </li>
          <li className={style.orderItem}>
            <CardOrder />
          </li>
          <li className={style.orderItem}>
            <CardOrder />
          </li>
          <li className={style.orderItem}>
            <CardOrder />
          </li>
          <li className={style.orderItem}>
            <CardOrder />
          </li>
          <li className={style.orderItem}>
            <CardOrder />
          </li>
          <li className={style.orderItem}>
            <CardOrder />
          </li>
          <li className={style.orderItem}>
            <CardOrder />
          </li>
        </ul>
      </section>
      <section className={`${style.statsWrapper} custom-scroll mt-25`}>
        <div className={style.ordersBoards}>
          <section className={`${style.statsColumn} mr-9`}>
            <h2 className={`${style.statsTitle} text text_type_main-medium`}>Готовы:</h2>
            <ul className={style.statsList}>
              {mockDone.map((order) => (
                <li className={style.statsListItem} key={order}>
                  <p
                    className={`${style.statsListText} text text_type_digits-default text_color_success`}
                  >
                    {order}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          <section className={style.statsColumn}>
            <h2 className={`${style.statsTitle} text text_type_main-medium`}>В&nbsp;работе:</h2>
            <ul className={style.statsList}>
              {mockInProgress.map((order) => (
                <li className={style.statsListItem} key={order}>
                  <p className={`${style.statsListText} text text_type_digits-default`}>{order}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className={`${style.completedAllTimeWrapper} mb-15`}>
          <h2 className={`${style.statsTitle}  text text_type_main-medium`}>
            Выполнено за&nbsp;все время:
          </h2>
          {/* нужен сепаратор для числа 1 000 */}
          <p className={`${style.counterText} text text_type_digits-large`}>28 752</p>{' '}
        </div>
        <div className={style.completedTodayWrapper}>
          <h2 className={`${style.statsTitle}  text text_type_main-medium`}>
            Выполнено за&nbsp;все сегодня:
          </h2>
          <p className={`${style.counterText} text text_type_digits-large`}>138</p>
        </div>
      </section>
    </main>
  );
};
