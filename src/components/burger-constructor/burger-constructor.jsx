import styles from './burger-constructor.module.css';
import { ConstructorRow } from '../constructor-row/constructor-row';
import Ordering from '../ordering/ordering';
import { ADD } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addIngredient } from '../../services/actions/constructor';
import { getBun, getFillings } from '../../services/selectors/constructor';

export default function BurgerConstructor() {
  const filling = useSelector(getFillings);
  const bun = useSelector(getBun);

  const dispatch = useDispatch();

  const [, dropRef] = useDrop({
    accept: ADD,
    drop({ ingredient }) {
      dispatch(addIngredient(ingredient));
    },
  });

  return (
    <section className={styles.constructor}>
      <div className={styles.elements} ref={dropRef}>
        {bun ? <ConstructorRow isBun={true} type="top" data={bun[0]} position={0} /> : null}
        {filling ? (
          <ul className={`${styles.fills} custom-scroll`}>
            {filling.map((item, index) => (
              <ConstructorRow isBun={false} key={item.tempId} data={item} position={index} />
            ))}
          </ul>
        ) : null}
        {bun ? <ConstructorRow isBun={true} type="bottom" data={bun[0]} position={0} /> : null}
      </div>
      <Ordering />
    </section>
  );
}
