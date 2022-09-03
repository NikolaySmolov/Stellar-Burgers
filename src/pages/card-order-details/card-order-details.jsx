import { useSelector } from 'react-redux';
import { CardOrderDetails } from '../../components/card-order-details/card-order-details';
import style from './card-order-details.module.css';

export const OrderDetailsPage = () => {
  const ingredients = useSelector((store) => store.burger.ingredients);

  if (ingredients.length === 0) {
    return;
  }

  return (
    <main className={style.content}>
      <div className={style.detailsWrapper}>
        <CardOrderDetails />
      </div>
    </main>
  );
};
