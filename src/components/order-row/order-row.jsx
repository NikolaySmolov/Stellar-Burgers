import style from './order-row.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientThumbnail } from '../ingredient-thumbnail/ingredient-thumbnail';
import PropTypes from 'prop-types';

export const OrderRow = ({ image, name, qty, price }) => {
  return (
    <div className={style.rowWrapper}>
      <IngredientThumbnail image={image} />
      <p className={`${style.name} text text_type_main-default ml-4`}>{name}</p>
      <div className={style.priceWrapper}>
        <p className={'text text_type_digits-default mr-2'}>{`${qty} x ${price.toLocaleString(
          'ru-RU'
        )}`}</p>
        <CurrencyIcon type={'primary'} />
      </div>
    </div>
  );
};

OrderRow.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};
