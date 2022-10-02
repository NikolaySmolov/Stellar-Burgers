import { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { CardOrderDetails } from '../../components/card-order-details/card-order-details';
import { Loader } from '../../components/loader/loader';
import { ModalError } from '../../components/modal-error/modal-error';
import { setSocketConnection, setSocketDisconnect } from '../../services/actions/web-socket';
import { useAppDispatch, useAppSelector } from '../../services/redux-hooks';
import { selectFeedError, selectFeedOrders } from '../../services/selectors/orders';
import { IParamsForId } from '../../services/types';
import style from './card-order-details.module.css';

interface IOrderDetailsPage {
  connectionPayload: string;
}

export const OrderDetailsPage = ({ connectionPayload }: IOrderDetailsPage) => {
  const feedError = useAppSelector(selectFeedError);
  const feedOrders = useAppSelector(selectFeedOrders);

  const dispatch = useAppDispatch();

  const { id: orderId } = useParams<IParamsForId>();

  useEffect(() => {
    dispatch(setSocketConnection(connectionPayload));

    return () => {
      dispatch(setSocketDisconnect());
    };
  }, [dispatch, connectionPayload]);

  if (feedOrders.length === 0 && !feedError) {
    return <Loader />;
  } else if (feedError) {
    return <ModalError />;
  }

  const hasOrder = feedOrders.some(({ _id }) => _id === orderId);

  if (!hasOrder) {
    return <Redirect to={{ pathname: '/order-not-found' }} />;
  }

  return (
    <main className={style.content}>
      <div className={style.detailsWrapper}>
        <CardOrderDetails />
      </div>
    </main>
  );
};
