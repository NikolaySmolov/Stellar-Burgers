import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorRow } from '../constructor-row/constructor-row';
import Ordering from '../ordering/ordering';
import { ADD, BUN } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { SET_TOTALPRICE } from '../../services/actions/order';
import { useDrop } from 'react-dnd';
import { INCREASE_INGREDIENT } from '../../services/actions/burger';

export default function BurgerConstructor() {
  const { constructor, totalPrice } = useSelector(store => ({
    constructor: store.burger.constructor,
    totalPrice: store.order.totalPrice,
  }));

  const flatConstructor = React.useMemo(
    () => [...constructor.bun, ...constructor.filling],
    [constructor]
  );

  const dispatch = useDispatch();

  const [, dropRef] = useDrop({
    accept: ADD,
    drop({ id }) {
      dispatch({ type: INCREASE_INGREDIENT, itemId: id });
    },
  });

  React.useEffect(() => {
    const total = flatConstructor.reduce((prev, curr) => {
      curr.type === BUN ? (prev += curr.price * 2) : (prev += curr.price);
      return prev;
    }, 0);

    dispatch({ type: SET_TOTALPRICE, total });
  }, [flatConstructor, dispatch]);

  const orderList = React.useMemo(() => {
    return flatConstructor.map(item => item._id);
  }, [flatConstructor]);

  const includesBun = !!constructor.bun.length;

  const incluedesFilling = !!constructor.filling.length;

  const canOrder = includesBun && incluedesFilling;

  return (
    <section className={styles.constructor}>
      <div className={styles.elements} ref={dropRef}>
        {includesBun ? <ConstructorRow isBun={true} type="top" data={constructor.bun[0]} /> : null}
        {incluedesFilling ? (
          <ul className={`${styles.fills} custom-scroll`}>
            {constructor.filling.map((item, index) => (
              <ConstructorRow key={item.tempId} data={item} position={index} />
            ))}
          </ul>
        ) : null}
        {includesBun ? (
          <ConstructorRow isBun={true} type="bottom" data={constructor.bun[0]} />
        ) : null}
      </div>
      <Ordering isDisabled={!canOrder} orderList={orderList} totalPrice={totalPrice} />
    </section>
  );
}
