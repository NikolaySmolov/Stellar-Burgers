import style from './card-order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientThumbnail } from '../ingredient-thumbnail/ingredient-thumbnail';
import { useMemo } from 'react';
import { DONE, TOrderStatus } from '../../utils/constants';
import { Link, useRouteMatch } from 'react-router-dom';
import { selectIngredientsState } from '../../services/selectors/ingredients';
import { useOrderData } from '../../services/hooks';
import { useAppSelector } from '../../services/redux-hooks';

interface ICardOrder {
  withStatus: boolean;
  number: number;
  name: string;
  burgerIngredientsId: Array<string>;
  status: TOrderStatus;
  createdAt: string;
  id: string;
}

export const CardOrder = ({
  withStatus,
  number,
  name,
  burgerIngredientsId,
  status,
  createdAt,
  id,
}: ICardOrder) => {
  const { ingredients } = useAppSelector(selectIngredientsState);

  const { url } = useRouteMatch();

  const [ingredientsList, orderDate, totalPrice, statusText] = useOrderData(
    burgerIngredientsId,
    ingredients,
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
