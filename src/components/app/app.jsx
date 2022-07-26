import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import ModalError from '../modal-error/modal-error';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../services/actions/burger';

export default function App() {
  const { ingredientsRequest, ingredientsFailed } = useSelector(store => store.burger);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return ingredientsRequest ? null : ingredientsFailed ? (
    <ModalError />
  ) : (
    <>
      <AppHeader />
      <main className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  );
}
