import styles from './ingredient-details.module.css';
import { ingredientDetails } from '../../utils/constants';

export default function IngredientDetails({
  name,
  image_large,
  calories,
  proteins,
  fat,
  carbohydrates,
}) {
  return (
    <div className={`${styles.wrapper} pt-10 pr-10 pb-15 pl-10`}>
      <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
      <img className={`${styles.image} noselect`} alt={name} src={image_large} />
      <p className={`${styles.name} text text_type_main-medium mt-4 mb-8`}>{name}</p>
      <ul className={styles['nutritional-list']}>
        <li className={`${styles['nutritional-item']}`}>
          <p
            className={`${styles['nutritional-text']} text text_type_main-default text_color_inactive mb-2`}>
            Калории,ккал
          </p>
          <p
            className={`${styles['nutritional-text']} text text_type_digits-default text_color_inactive`}>
            {calories}
          </p>
        </li>
        <li className={`${styles['nutritional-item']}`}>
          <p
            className={`${styles['nutritional-text']} text text_type_main-default text_color_inactive mb-2`}>
            Белки, г
          </p>
          <p
            className={`${styles['nutritional-text']} text text_type_digits-default text_color_inactive`}>
            {proteins}
          </p>
        </li>
        <li className={`${styles['nutritional-item']}`}>
          <p
            className={`${styles['nutritional-text']} text text_type_main-default text_color_inactive mb-2`}>
            Жиры, г
          </p>
          <p
            className={`${styles['nutritional-text']} text text_type_digits-default text_color_inactive`}>
            {fat}
          </p>
        </li>
        <li className={`${styles['nutritional-item']}`}>
          <p
            className={`${styles['nutritional-text']} text text_type_main-default text_color_inactive mb-2`}>
            Углеводы, г
          </p>
          <p
            className={`${styles['nutritional-text']} text text_type_digits-default text_color_inactive`}>
            {carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = ingredientDetails.isRequired;
