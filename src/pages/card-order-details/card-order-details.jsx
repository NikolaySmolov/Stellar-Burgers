import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { CardOrderDetails } from '../../components/card-order-details/card-order-details';
import { Loader } from '../../components/loader/loader';
import ModalError from '../../components/modal-error/modal-error';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../../services/actions/web-socket';
import style from './card-order-details.module.css';

export const OrderDetailsPage = () => {
  const { ordersData, connected, error } = useSelector((store) => ({
    ingredients: store.burger.ingredients,
    ...store.orders,
  }));
  debugger;
  const dispatch = useDispatch();

  const { id: orderId } = useParams();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    };
  }, [dispatch]);

  if (!ordersData.orders && !error) {
    debugger;
    return <Loader />;
  } else if (error) {
    return <ModalError />;
  }

  const hasOrder = ordersData.orders.some(({ _id }) => _id === orderId);

  if (!hasOrder) {
    return <Redirect to={{ pathname: 'notFound' }} />;
  }

  return (
    <main className={style.content}>
      <div className={style.detailsWrapper}>
        <CardOrderDetails />
      </div>
    </main>
  );
};
