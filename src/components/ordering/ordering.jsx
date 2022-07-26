import React from 'react';
import PropTypes from 'prop-types';
import styles from './ordering.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ModalError from '../modal-error/modal-error';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder } from '../../services/actions/order';
import { CLOSE_ORDER_DETAILS } from '../../services/actions/order';
import { CLEAR_CONSTRUCTOR } from '../../services/actions/burger';

export default function Ordering({ totalPrice, orderList, isDisabled }) {
  const { showModal, orderStatus, orderFailed } = useSelector(store => store.order);

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

  return (
    <div className={`${styles.ordering} mt-10`}>
      <div className={`${styles.total} mr-10`}>
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large" onClick={handleSendOrder} disabled={isDisabled}>
        Оформить заказ
      </Button>
      {modal}
    </div>
  );
}

Ordering.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  orderList: PropTypes.arrayOf(PropTypes.string),
};
