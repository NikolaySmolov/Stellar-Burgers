import { useParams } from 'react-router';
import { useAppSelector } from '../../services/hooks';
import { selectIngredientsState } from '../../services/selectors/ingredients';
import { IParamsForId } from '../../services/hooks';
import styles from './ingredient-details.module.css';

export function IngredientDetails() {
  const { ingredients } = useAppSelector(selectIngredientsState);
  const { id: ingredientId } = useParams<IParamsForId>();

  const ingredientData = ingredients.find(({ _id }) => _id === ingredientId)!;

  return (
    <div className={`${styles.wrapper} pt-10 pr-10 pb-15 pl-10`}>
      <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
      <img
        className={`${styles.image} noselect`}
        alt={ingredientData.name}
        src={ingredientData.image_large}
      />
      <p className={`${styles.name} text text_type_main-medium mt-4 mb-8`}>{ingredientData.name}</p>
      <ul className={styles['nutritional-list']}>
        <li className={`${styles['nutritional-item']}`}>
          <p
            className={`${styles['nutritional-text']} text text_type_main-default text_color_inactive mb-2`}>
            Калории,ккал
          </p>
          <p
            className={`${styles['nutritional-text']} text text_type_digits-default text_color_inactive`}>
            {ingredientData.calories}
          </p>
        </li>
        <li className={`${styles['nutritional-item']}`}>
          <p
            className={`${styles['nutritional-text']} text text_type_main-default text_color_inactive mb-2`}>
            Белки, г
          </p>
          <p
            className={`${styles['nutritional-text']} text text_type_digits-default text_color_inactive`}>
            {ingredientData.proteins}
          </p>
        </li>
        <li className={`${styles['nutritional-item']}`}>
          <p
            className={`${styles['nutritional-text']} text text_type_main-default text_color_inactive mb-2`}>
            Жиры, г
          </p>
          <p
            className={`${styles['nutritional-text']} text text_type_digits-default text_color_inactive`}>
            {ingredientData.fat}
          </p>
        </li>
        <li className={`${styles['nutritional-item']}`}>
          <p
            className={`${styles['nutritional-text']} text text_type_main-default text_color_inactive mb-2`}>
            Углеводы, г
          </p>
          <p
            className={`${styles['nutritional-text']} text text_type_digits-default text_color_inactive`}>
            {ingredientData.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}
