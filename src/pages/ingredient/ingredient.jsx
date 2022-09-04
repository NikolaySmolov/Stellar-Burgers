import styles from './ingredient.module.css';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

export const IngredientPage = () => {
  return (
    <main className={styles.content}>
      <section className={styles.detailsWrapper}>
        <IngredientDetails />
      </section>
    </main>
  );
};
