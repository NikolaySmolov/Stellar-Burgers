import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useOrderData } from '../../services/hooks';
import { DONE } from '../../utils/constants';
import { OrderRow } from '../order-row/order-row';
import style from './card-order-details.module.css';

//Mock order
const orderData = {
  createdAt: '2022-08-29T07:55:43.747Z',
  ingredients: [
    '60d3b41abdacab0026a733c6',
    '60d3b41abdacab0026a733cd',
    '60d3b41abdacab0026a733cf',
    '60d3b41abdacab0026a733cd',
    '60d3b41abdacab0026a733cf',
    '60d3b41abdacab0026a733d4',
    '60d3b41abdacab0026a733d4',
    '60d3b41abdacab0026a733d1',
    '60d3b41abdacab0026a733d3',
    '60d3b41abdacab0026a733cc',
    '60d3b41abdacab0026a733d0',
  ],
  name: 'Space антарианский краторный бургер',
  number: 24239,
  status: 'done',
  updatedAt: '2022-08-29T07:55:44.181Z',
  _id: '630c70ff42d34a001c28491d',
};

export const CardOrderDetails = () => {
  const ingredientsMenu = useSelector((store) => store.burger.ingredients);

  const [ingredientsList, orderDate, totalPrice, statusText] = useOrderData(
    orderData.ingredients,
    ingredientsMenu,
    orderData.createdAt,
    orderData.status
  );

  if (!ingredientsList) {
    return null;
  }

  return (
    <section className={style.details}>
      <p className={`${style.number} text text_type_digits-default mb-10`}>#{orderData.number}</p>
      <h1 className={'text text_type_main-medium'}>{orderData.name}</h1>
      <p
        className={`text text_type_main-default mt-3 mb-15 ${
          orderData.status === DONE ? 'text_color_success' : null
        }`}
      >
        {statusText}
      </p>
      <h2 className={'text text_type_main-medium mb-6'}>Состав:</h2>
      <ul className={`${style.list} custom-scroll mb-10 pr-6`}>
        {ingredientsList.map((ingredientData) => {
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
