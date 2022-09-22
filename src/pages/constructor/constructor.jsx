import styles from './constructor.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import ModalError from '../../components/modal-error/modal-error';

export const ConstructorPage = () => {
  const order = useSelector(store => store.order);
  const history = useHistory();

  useEffect(() => {
    if (order.orderStatus) {
      history.push({
        pathname: `/order/${order.orderStatus.order.number}`,
        state: { background: history.location },
      });
    }
  }, [order, history]);

  return (
    <>
      <main className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      {order.orderFailed && <ModalError />}
    </>
  );
};
