import styles from './ingredient.module.css';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import { IIngredient } from '../../utils/constants';

export const IngredientPage = ( ingredientData: IIngredient) => {
  return (
    <main className={styles.content}>
      <section className={styles.detailsWrapper}>
        <IngredientDetails {...ingredientData} />
      </section>
    </main>
  );
};
