import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ordering.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ModalError from '../modal-error/modal-error';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder, setOrderAccessSuccess } from '../../services/actions/order';
import { CLOSE_ORDER_DETAILS } from '../../services/actions/order';
import { CLEAR_CONSTRUCTOR } from '../../services/actions/burger';
import { Loader } from '../loader/loader';
import { Redirect } from 'react-router-dom';

export default function Ordering({ totalPrice, orderList, isDisabled }) {
  const { access, showModal, orderStatus, orderRequest, orderFailed } = useSelector(
    (store) => store.order
  );

  const dispatch = useDispatch();

  const handleSendOrder = () => {
    dispatch(sendOrder(orderList));
  };

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_ORDER_DETAILS });
    dispatch({ type: CLEAR_CONSTRUCTOR });
  };

  const modal = showModal ? (
    !orderFailed ? (
      <Modal onClose={handleCloseModal}>
        <OrderDetails orderId={orderStatus.order.number} />
      </Modal>
    ) : (
      <ModalError />
    )
  ) : null;

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
        <Button type="primary" size="large" onClick={handleSendOrder} disabled={isDisabled}>
          Оформить заказ
        </Button>
        {orderRequest ? <Loader /> : null}
      </div>
      {modal}
    </div>
  );
}

Ordering.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  orderList: PropTypes.arrayOf(PropTypes.string),
};
