import React from 'react';
import styles from './constructor-row.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { IIngredient, SORT } from '../../utils/constants';
import {
  getConstructorDeleteAction,
  getConstructorSortAction,
} from '../../services/actions/constructor';
import { useAppDispatch } from '../../services/redux-hooks';

interface IDragAndDropProp {
  position: number;
}

interface IConstructorRow extends IDragAndDropProp {
  isBun: boolean;
  type?: 'top' | 'bottom';
  ingredient: IIngredient;
}

export const ConstructorRow = React.memo<IConstructorRow>(
  ({ isBun = false, type, ingredient, position }) => {
    const dispatch = useAppDispatch();

    const [, dragRef] = useDrag({
      type: SORT,
      item: { position },
    });

    const [{ isHover }, dropRef] = useDrop({
      accept: SORT,
      drop(item: IDragAndDropProp) {
        dispatch(getConstructorSortAction(item.position, position));
      },
      collect: monitor => ({
        isHover: monitor.isOver(),
      }),
    });

    const handleDelete = () => {
      dispatch(getConstructorDeleteAction(position));
    };

    return isBun ? (
      <div className={`${styles.bun} pl-4 pr-4`}>
        <ConstructorElement
          type={type}
          text={`${ingredient.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
          price={ingredient.price}
          thumbnail={ingredient.image}
          isLocked
        />
      </div>
    ) : (
      <li
        className={`${styles.wrapper} ${isHover ? styles.wrapper_dropHover : ''} mt-4 mb-4`}
        ref={dropRef}>
        <div className={styles.ingredient} draggable ref={dragRef}>
          <DragIcon type={'primary'} />
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={handleDelete}
          />
        </div>
      </li>
    );
  }
);
