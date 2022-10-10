import style from './card-order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientThumbnail } from '../ingredient-thumbnail/ingredient-thumbnail';
import { useMemo } from 'react';
import { DONE } from '../../utils/constants';
import { IIngredientDataInOrder } from '../../utils/types';
import { Link, useRouteMatch } from 'react-router-dom';

interface ICardOrder {
  withStatus: boolean;
  number: number;
  name: string;
  burgerIngredients: Array<IIngredientDataInOrder>;
  status: string;
  createdAt: string;
  totalPrice: string;
  id: string;
}

export const CardOrder = ({
  withStatus,
  number,
  name,
  burgerIngredients,
  status,
  createdAt,
  totalPrice,
  id,
}: ICardOrder) => {
  const { url } = useRouteMatch();

  const thumbnailList = useMemo(() => {
    if (burgerIngredients) {
      const renderList = Array.from(burgerIngredients).slice(0, 6).reverse();
      const more = burgerIngredients.length > 6 ? burgerIngredients.length - 6 : null;

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
  }, [burgerIngredients]);

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
          <p className={'text text_type_main-default text_color_inactive'}>{createdAt}</p>
        </div>
        <p className={'text text_type_main-medium'}>{name}</p>
        {withStatus ? (
          <p
            className={`text text_type_main-default mt-2 ${
              status === DONE ? 'text_color_success' : null
            }`}>
            {status}
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
