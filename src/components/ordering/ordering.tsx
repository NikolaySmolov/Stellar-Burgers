import styles from './ordering.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder } from '../../services/actions/order';
import { Loader } from '../loader/loader';
import {
  selectConstructorIngredientsIdList,
  selectTotalPrice,
  selectBurgerCompleteState,
} from '../../services/selectors/constructor';
import { selectOrderRequest } from '../../services/selectors/order';
import { useAppDispatch} from '../../services/redux-hooks';

export function Ordering() {
  const orderRequest = useSelector(selectOrderRequest);
  const totalPrice = useSelector(selectTotalPrice);
  const orderButtonState = !useSelector(selectBurgerCompleteState);
  const burgerIngredientsList = useSelector(selectConstructorIngredientsIdList);

  const dispatch = useAppDispatch();

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
        <Button
          type="primary"
          size="large"
          onClick={handleSendOrder}
          disabled={orderButtonState}
          htmlType={'button'}>
          Оформить заказ
        </Button>
        {orderRequest ? <Loader /> : null}
      </div>
    </div>
  );
}
