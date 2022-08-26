import styles from './ingredient.module.css';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useSelector } from 'react-redux';

export const IngredientPage = () => {
  const { ingredients } = useSelector(store => store.burger);

  const { id } = useParams();

  const ingredientProps = ingredients.find(({ _id }) => _id === id);

  return (
    <main className={styles.content}>
      <section className={styles.detailsWrapper}>
        <IngredientDetails {...ingredientProps} />
      </section>
    </main>
  );
};
