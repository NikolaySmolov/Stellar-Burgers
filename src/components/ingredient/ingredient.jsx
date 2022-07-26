import React from 'react';
import styles from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ADD, ingredientPropTypes } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { OPEN_INGREDIENT_DETAILS } from '../../services/actions/burger';
import { useDrag } from 'react-dnd';

export const Ingredient = React.memo(props => {
  const dispatch = useDispatch();

  const [{ isDrag }, dragRef] = useDrag({
    type: ADD,
    item: { id: props._id },
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const handleShowDetails = () => {
    dispatch({ type: OPEN_INGREDIENT_DETAILS, ingredient: props });
  };

  return (
    <article
      className={`${styles.card} ${isDrag ? styles.card_dragged : ''}`}
      onClick={handleShowDetails}
      draggable
      ref={dragRef}>
      <img className={styles.image} src={props.image} alt={props.name} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <p className={`${styles.price__text} text text_type_digits-default mr-2`}>{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}> {props.name} </p>
      {props.qty ? (
        <div className={styles.counter}>
          <Counter count={props.qty} size="default" />
        </div>
      ) : null}
    </article>
  );
});

Ingredient.propTypes = ingredientPropTypes.isRequired;
