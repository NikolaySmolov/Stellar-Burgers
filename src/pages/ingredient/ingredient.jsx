import styles from './ingredient.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../services/actions/burger';
import ModalError from '../../components/modal-error/modal-error';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

export const IngredientPage = () => {
  const { ingredients, ingredientsRequest, ingredientsFailed, ingredientsLoaded } = useSelector(
    store => store.burger
  );

  const { id } = useParams();

  const dispatch = useDispatch();

  const ingredientProps = ingredients.find(({ _id }) => _id === id);

  useEffect(() => {
    if (!ingredientsLoaded) dispatch(getIngredients());
  }, [dispatch, ingredientsLoaded]);

  if (!ingredientsLoaded || ingredientsRequest) {
    return null;
  } else if (ingredientsFailed) {
    return <ModalError />;
  }

  return (
    <main className={styles.content}>
      <section className={styles.detailsWrapper}>
        <IngredientDetails {...ingredientProps} />
      </section>
    </main>
  );
};
