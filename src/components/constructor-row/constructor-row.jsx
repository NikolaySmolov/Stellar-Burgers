import React from 'react';
import PropTypes from 'prop-types';
import { ingredientPropTypes, SORT } from '../../utils/constants';
import styles from './constructor-row.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { DECREASE_INGREDIENT, SORT_INGREDIENT } from '../../services/actions/burger';
import { useDrag, useDrop } from 'react-dnd';

export const ConstructorRow = React.memo(({ isBun = false, type, data, position }) => {
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: SORT,
    item: { position },
  });

  const [{ isHover }, dropRef] = useDrop({
    accept: SORT,
    drop(item) {
      dispatch({
        type: SORT_INGREDIENT,
        payload: { dragItemPos: item.position, dropTargetPos: position },
      });
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  });

  const handleDelete = () => {
    dispatch({ type: DECREASE_INGREDIENT, payload: { itemId: data._id, itemPos: position } });
  };

  return isBun ? (
    <div className={`${styles.bun} pl-4 pr-4`}>
      <ConstructorElement
        type={type}
        text={`${data.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
        price={data.price}
        thumbnail={data.image}
        isLocked="true"
      />
    </div>
  ) : (
    <li
      className={`${styles.wrapper} ${isHover ? styles.wrapper_dropHover : ''} mt-4 mb-4`}
      ref={dropRef}>
      <div className={styles.ingredient} draggable ref={dragRef}>
        <DragIcon />
        <ConstructorElement
          text={data.name}
          price={data.price}
          thumbnail={data.image}
          handleClose={handleDelete}
        />
      </div>
    </li>
  );
});

ConstructorRow.propTypes = {
  isBun: PropTypes.bool.isRequired,
  type: PropTypes.string,
  data: ingredientPropTypes.isRequired,
  position: PropTypes.number.isRequired,
};
