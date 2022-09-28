import styles from './constructor.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { ModalError } from '../../components/modal-error/modal-error';
import { setOrderPermissionSuccess } from '../../services/actions/order';
import {
  selectOrderFailed,
  selectOrderingPermission,
  selectOrderStatus,
} from '../../services/selectors/order';

export const ConstructorPage = () => {
  const orderStatus = useSelector(selectOrderStatus);
  const orderingPermission = useSelector(selectOrderingPermission);
  const orderFailed = useSelector(selectOrderFailed);

  const dispatch = useDispatch();
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
