import style from './card-order.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { IngredientThumbnail } from '../ingredient-thumbnail/ingredient-thumbnail';
import { useMemo } from 'react';
import { DONE } from '../../utils/constants';
import { useOrderData } from '../../services/hooks';
import { Link, useRouteMatch } from 'react-router-dom';

export const CardOrder = ({
  withStatus = true,
  number,
  name,
  ingredients,
  status,
  createdAt,
  id,
}) => {
  const ingredientsMenu = useSelector(store => store.ingredients.ingredients);

  const { url } = useRouteMatch();

  const [ingredientsList, orderDate, totalPrice, statusText] = useOrderData(
    ingredients,
    ingredientsMenu,
    createdAt,
    status
  );

  const thumbnailList = useMemo(() => {
    if (ingredientsList) {
      const uniqList = new Set(ingredientsList);
      const renderList = Array.from(uniqList).slice(0, 6).reverse();
      const more = uniqList.size > 6 ? uniqList.size - 6 : null;

      return (
        <ul className={`${style.thumbnailList} mr-10`}>
          {renderList.map(({ id, image }, index) => {
            return (
              <li className={style.thumbnail} key={id}>
                <IngredientThumbnail more={index === 0 ? more : null} image={image} />
              </li>
            );
          })}
        </ul>
      );
    }
  }, [ingredientsList]);

  if (!ingredientsList) {
    return null;
  }

  return (
    <Link
      to={location => ({
        pathname: `${url}/${id}`,
        state: { background: location },
      })}
      className={style.link}>
      <article className={style.wrapper}>
        <div className={`${style.heading} mb-6`}>
          <p className={'text text_type_digits-default'}>#{number}</p>
          <p className={'text text_type_main-default text_color_inactive'}>{orderDate}</p>
        </div>
        <p className={'text text_type_main-medium'}>{name}</p>
        {withStatus ? (
          <p
            className={`text text_type_main-default mt-2 ${
              status === DONE ? 'text_color_success' : null
            }`}>
            {statusText}
          </p>
        ) : null}
        <div className={`${style.footer} mt-6`}>
          {thumbnailList}
          <div className={style.totalWrapper}>
            <p className={'text text_type_digits-default mr-2'}>{totalPrice}</p>
            <CurrencyIcon type={'primary'} />
          </div>
        </div>
      </article>
    </Link>
  );
};

CardOrder.propTypes = {
  withStatus: PropTypes.bool,
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
