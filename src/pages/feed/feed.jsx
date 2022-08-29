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

export const FeedPage = () => {
  const ingredients = useSelector(store => store.burger.ingredients);

  if (ingredients.length === 0) {
    return;
  }

  return (
    <main className={style.content}>
      <section className={style.orders}>
        <h1 className={'text text_type_main-large mt-10 mb-5 pl-2'}>Лента заказов</h1>
        <ul className={`${style.orderList} pl-2 pr-2`}>
          <li className={style.orderItem}>
            <CardOrder />
          </li>
        </ul>
      </section>
      <section className={style.stats}></section>
    </main>
  );
};
