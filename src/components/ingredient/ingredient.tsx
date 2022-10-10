import React from 'react';
import styles from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ADD } from '../../utils/constants';
import { IIngredient } from '../../utils/types';
import { useDrag } from 'react-dnd';
import { useHistory } from 'react-router';
import { selectCounter } from '../../services/selectors/constructor';
import { useAppSelector } from '../../services/hooks';

export const Ingredient = React.memo<IIngredient>(props => {
  const counter = useAppSelector(selectCounter);
  const history = useHistory();

  const qty = counter?.[props._id] || null;

  const [{ isDrag }, dragRef] = useDrag({
    type: ADD,
    item: { ingredient: props },
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const handleShowDetails = () => {
    history.push({
      pathname: `/ingredients/${props._id}`,
      state: { background: history.location },
    });
  };

  return (
    <article
      className={`${styles.card} ${isDrag ? styles.card_dragged : ''}`}
      onClick={handleShowDetails}
      draggable
      ref={dragRef}>
      <img className={styles.image} src={props.image} alt={props.name} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <p className={`${styles.price__text} text text_type_digits-default mr-2`}>
          {props.price.toLocaleString('ru-RU')}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}> {props.name} </p>
      {qty ? (
        <div className={styles.counter}>
          <Counter count={qty} size="default" />
        </div>
      ) : null}
    </article>
  );
});
