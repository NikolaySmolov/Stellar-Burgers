import React from 'react';
import styles from './ingredients-section.module.css';
import { Ingredient } from '../ingredient/ingredient';
import { IIngredient } from '../../utils/constants';

interface IIngredientsSection {
  menuSection: string;
  ingredientList: ReadonlyArray<IIngredient>;
}

export const IngredientsSection = React.forwardRef<HTMLHeadingElement, IIngredientsSection>(({ menuSection, ingredientList }, ref) => {
  return (
    <li className={styles.section}>
      <h2 ref={ref} className="text text_type_main-medium mb-6 mt-10">
        {menuSection}
      </h2>
      <ul className={`${styles.ingredients} ml-4 mr-2 mb-10`}>
        {ingredientList.map(ingredient => (
          <Ingredient key={ingredient._id} {...ingredient} />
        ))}
      </ul>
    </li>
  );
});

