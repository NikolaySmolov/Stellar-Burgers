import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './card-order.module.css';
import { useSelector } from 'react-redux';
import { IngredientThumbnail } from '../ingredient-thumbnail/ingredient-thumbnail';
import { useMemo } from 'react';
import { DONE } from '../../utils/constants';
import { useOrderData } from '../../services/hooks';
import { Link, useRouteMatch } from 'react-router-dom';

//Mock order
const orderData = {
  createdAt: '2022-08-29T07:55:43.747Z',
  ingredients: [
    '60d3b41abdacab0026a733c6',
    '60d3b41abdacab0026a733cd',
    '60d3b41abdacab0026a733cf',
    '60d3b41abdacab0026a733cd',
    '60d3b41abdacab0026a733cf',
    '60d3b41abdacab0026a733d4',
    '60d3b41abdacab0026a733d4',
    '60d3b41abdacab0026a733d1',
    '60d3b41abdacab0026a733d3',
    '60d3b41abdacab0026a733cc',
    '60d3b41abdacab0026a733d0',
  ],
  name: 'Space антарианский краторный бургер',
  number: 24239,
  status: 'done',
  updatedAt: '2022-08-29T07:55:44.181Z',
  _id: '630c70ff42d34a001c28491d',
};

export const CardOrder = ({
  withStatus = true,
  number = orderData.number,
  name = orderData.name,
  ingredients = orderData.ingredients,
  status = orderData.status,
  createdAt = orderData.createdAt,
}) => {
  const ingredientsMenu = useSelector((store) => store.burger.ingredients);

  const { url } = useRouteMatch();

  const [ingredientsList, orderDate, totalPrice, statusText] = useOrderData(
    ingredients,
    ingredientsMenu,
    createdAt,
    status
  );

  const thumbnailList = useMemo(() => {
    if (ingredientsList) {
      const renderList = [...ingredientsList].slice(0, 6).reverse();
      const more = ingredientsList.length - 6;

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
      to={(location) => ({
        pathname: `${url}/${orderData._id}`,
        // state: { background: location },
      })}
      className={style.link}
    >
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
            }`}
          >
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
