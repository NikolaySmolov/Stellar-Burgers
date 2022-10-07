import styles from './constructor.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { Redirect, useLocation } from 'react-router-dom';

import { ModalError } from '../../components/modal-error/modal-error';

import { useAppSelector } from '../../services/redux-hooks';
import { selectOrderState } from '../../services/selectors/order';
import { selectBun, selectFillings } from '../../services/selectors/constructor';

export const ConstructorPage = () => {
  const filling = useAppSelector(selectFillings);
  const bun = useAppSelector(selectBun);
  const { details: orderDetails, request, failed } = useAppSelector(selectOrderState);

  const location = useLocation();

  return (
    <>
      <main className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor bun={bun} filling={filling} blocked={request} />
        </DndProvider>
      </main>
      {orderDetails && (
        <Redirect
          to={{ pathname: `/order/${orderDetails}`, state: { background: location } }}
          push
        />
      )}
      {failed && <ModalError />}
    </>
  );
};
