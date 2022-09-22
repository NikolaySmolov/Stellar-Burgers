import { useEffect } from 'react';
import styles from './ordering.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder, setOrderAccessSuccess } from '../../services/actions/order';
import { Loader } from '../loader/loader';
import { Redirect } from 'react-router-dom';
import {
  getBurgerIngredientsIdList,
  getOrderingPermission,
  getTotalPrice,
} from '../../services/selectors/constructor';

export default function Ordering() {
  const { access, orderRequest } = useSelector(store => store.order);
  const totalPrice = useSelector(getTotalPrice);
  const orderPermission = useSelector(getOrderingPermission);
  const burgerIngredientsList = useSelector(getBurgerIngredientsIdList);

  const dispatch = useDispatch();

  const handleSendOrder = () => {
    dispatch(sendOrder(burgerIngredientsList));
  };

  useEffect(() => {
    dispatch(setOrderAccessSuccess());
  }, [dispatch]);

  if (!access) {
    return <Redirect to={{ pathname: '/login' }} />;
  }

  return (
    <div className={`${styles.ordering} mt-10`}>
      <div className={`${styles.total} mr-10`}>
        <p className="text text_type_digits-medium mr-2">{totalPrice.toLocaleString('ru-RU')}</p>
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.button}>
        <Button type="primary" size="large" onClick={handleSendOrder} disabled={!orderPermission}>
          Оформить заказ
        </Button>
        {orderRequest ? <Loader /> : null}
      </div>
    </div>
  );
}
