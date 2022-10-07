import styles from './ordering.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../loader/loader';
import { selectTotalPrice, selectBurgerCompleteState } from '../../services/selectors/constructor';
import { useAppDispatch, useAppSelector } from '../../services/redux-hooks';
import { selectOrderState } from '../../services/selectors/order';
import { useHistory } from 'react-router';
import { makeOrderAction } from '../../services/actions/order';

export function Ordering() {
  const totalPrice = useAppSelector(selectTotalPrice);
  const orderButtonState = !useAppSelector(selectBurgerCompleteState);
  const { request } = useAppSelector(selectOrderState);
  const failedAuth = useAppSelector(store => store.auth.failed);

  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleSendOrder = () => {
    if (failedAuth) {
      history.push({ pathname: '/login' });
    } else {
      dispatch(makeOrderAction());
    }
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
        {request ? <Loader /> : null}
      </div>
    </div>
  );
}
