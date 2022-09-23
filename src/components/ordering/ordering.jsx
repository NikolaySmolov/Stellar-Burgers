import styles from './ordering.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder } from '../../services/actions/order';
import { Loader } from '../loader/loader';
import {
  getBurgerCompleteState,
  getBurgerIngredientsIdList,
  getTotalPrice,
} from '../../services/selectors/constructor';
import { getOrderRequest } from '../../services/selectors/order';

export default function Ordering() {
  const orderRequest = useSelector(getOrderRequest);
  const totalPrice = useSelector(getTotalPrice);
  const orderButtonState = !useSelector(getBurgerCompleteState);
  const burgerIngredientsList = useSelector(getBurgerIngredientsIdList);

  const dispatch = useDispatch();

  const handleSendOrder = () => {
    dispatch(sendOrder(burgerIngredientsList));
  };

  return (
    <div className={`${styles.ordering} mt-10`}>
      <div className={`${styles.total} mr-10`}>
        <p className="text text_type_digits-medium mr-2">{totalPrice.toLocaleString('ru-RU')}</p>
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.button}>
        <Button type="primary" size="large" onClick={handleSendOrder} disabled={orderButtonState}>
          Оформить заказ
        </Button>
        {orderRequest ? <Loader /> : null}
      </div>
    </div>
  );
}
