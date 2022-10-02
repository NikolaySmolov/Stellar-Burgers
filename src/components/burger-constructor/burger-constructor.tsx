import styles from './burger-constructor.module.css';
import { ConstructorRow } from '../constructor-row/constructor-row';
import { Ordering } from '../ordering/ordering';
import { ADD, IIngredient } from '../../utils/constants';
import { useDrop } from 'react-dnd';
import { addIngredient } from '../../services/actions/constructor';
import { selectBun, selectFillings } from '../../services/selectors/constructor';
import { selectOrderRequest } from '../../services/selectors/order';
import { useAppDispatch, useAppSelector } from '../../services/redux-hooks';

export function BurgerConstructor() {
  const filling: ReadonlyArray<IIngredient & { tempId: string }> | null =
    useAppSelector(selectFillings);
  const bun: ReadonlyArray<IIngredient & { tempId: string }> | null = useAppSelector(selectBun);
  const orderRequest: boolean = useAppSelector(selectOrderRequest);

  const dispatch = useAppDispatch();

  const [, dropRef] = useDrop({
    accept: ADD,
    drop({ ingredient }: { ingredient: IIngredient }) {
      dispatch(addIngredient(ingredient));
    },
  });

  return (
    <section
      className={`${styles.constructor} ${orderRequest ? styles.constructor_blocked : null}`}>
      <div className={styles.elements} ref={dropRef}>
        {bun ? <ConstructorRow isBun={true} type="top" ingredient={bun[0]} position={0} /> : null}
        {filling ? (
          <ul className={`${styles.fills} custom-scroll`}>
            {filling.map((item, index) => (
              <ConstructorRow isBun={false} key={item.tempId} ingredient={item} position={index} />
            ))}
          </ul>
        ) : null}
        {bun ? (
          <ConstructorRow isBun={true} type="bottom" ingredient={bun[0]} position={0} />
        ) : null}
      </div>
      <Ordering />
    </section>
  );
}
