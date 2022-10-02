import styles from './constructor.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { useHistory, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { ModalError } from '../../components/modal-error/modal-error';
import { setOrderPermissionSuccess } from '../../services/actions/order';
import {
  selectOrderFailed,
  selectOrderingPermission,
  selectOrderStatus,
} from '../../services/selectors/order';
import { useAppDispatch, useAppSelector } from '../../services/redux-hooks';

export const ConstructorPage = () => {
  const orderStatus = useAppSelector(selectOrderStatus);
  const orderingPermission = useAppSelector(selectOrderingPermission);
  const orderFailed = useAppSelector(selectOrderFailed);

  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    if (orderStatus) {
      history.push({
        pathname: `/order/${orderStatus.order.number}`,
        state: { background: history.location },
      });
    }
  }, [orderStatus, history]);

  useEffect(() => {
    dispatch(setOrderPermissionSuccess());
  }, [dispatch]);

  if (!orderingPermission) {
    return <Redirect to={{ pathname: '/login' }} />;
  }

  return (
    <>
      <main className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      {orderFailed && <ModalError />}
    </>
  );
};
