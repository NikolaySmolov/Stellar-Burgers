import React from 'react';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/constants';
import styles from './ingredients-section.module.css';
import { Ingredient } from '../ingredient/ingredient';

export const IngredientsSection = React.forwardRef(({ menuSection, ingredientList }, ref) => {
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

IngredientsSection.propTypes = {
  menuSection: PropTypes.string.isRequired,
  ingredientList: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};
