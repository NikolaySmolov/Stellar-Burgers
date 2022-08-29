import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getTransformedDate } from './utils';
import style from './card-order.module.css';
import { useSelector } from 'react-redux';
import { IngredientThumbnail } from '../ingredient-thumbnail/ingredient-thumbnail';
import { BUN } from '../../utils/constants';
import { useMemo } from 'react';

const orderData = {
  createdAt: '2022-08-29T07:55:43.747Z',
  ingredients: [
    '60d3b41abdacab0026a733c6',
    '60d3b41abdacab0026a733cd',
    '60d3b41abdacab0026a733cf',
    '60d3b41abdacab0026a733cd',
    '60d3b41abdacab0026a733cf',
    '60d3b41abdacab0026a733c6',
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
  number,
  name,
  ingredients,
  status = 'done',
  createdAt,
}) => {
  const ingredientsMenu = useSelector(store => store.burger.ingredients);

  const ingredientsData = orderData.ingredients.reduce((acc, item) => {
    const itemIndex = acc.findIndex(ingredient => ingredient.id === item);

    if (~itemIndex) {
      acc[itemIndex].qty++;
    } else {
      const { name, image, price, type } = ingredientsMenu.find(({ _id }) => _id === item);

      const ingredientData = { id: item, name, price, image, qty: 1 };

      if (type === BUN) {
        ingredientData.qty = 2;
      }

      acc.push(ingredientData);
    }
    return acc;
  }, []);

  const thumbnailList = useMemo(() => {
    const willRender = [...ingredientsData].slice(0, 6).reverse();
    const more = ingredientsData.length - 6;

    return (
      <ul className={`${style.thumbnailList} mr-10`}>
        {willRender.map(({ id, image }, index) => {
          return (
            <li className={style.thumbnail} key={id}>
              <IngredientThumbnail more={index === 0 ? more : null} image={image} />
            </li>
          );
        })}
      </ul>
    );
  }, [ingredientsData]);

  const totalPrice = ingredientsData.reduce((acc, ing) => {
    acc += ing.price * ing.qty;
    return acc;
  }, 0);

  console.log(totalPrice);

  const orderDate = getTransformedDate(orderData.createdAt);

  return (
    <article className={style.wrapper}>
      <div className={`${style.heading} mb-6`}>
        <h2 className={`${style.orderNumber} text text_type_digits-default`}>
          #{orderData.number}
        </h2>
        <p className={`${style.created} text text_type_main-default text_color_inactive`}>
          {orderDate}
        </p>
      </div>
      <p className={`${style.name} text text_type_main-medium`}>{orderData.name}</p>
      {withStatus ? (
        <p
          className={`${style.status} text text_type_main-default mt-2 ${
            status === 'done' ? 'text_color_success' : null
          }`}>
          Выполнен
        </p>
      ) : null}
      <div className={`${style.footer} mt-6`}>
        {thumbnailList}

        {/* <ul className={`${style.thumbnailList} mr-10`}>
          <li className={style.thumbnail}>
            <IngredientThumbnail
              more={3}
              image={'https://code.s3.yandex.net/react/code/meat-03.png'}
            />
          </li>
          <li className={style.thumbnail}>
            <IngredientThumbnail image={'https://code.s3.yandex.net/react/code/meat-03.png'} />
          </li>
          <li className={style.thumbnail}>
            <IngredientThumbnail image={'https://code.s3.yandex.net/react/code/meat-03.png'} />
          </li>
          <li className={style.thumbnail}>
            <IngredientThumbnail image={'https://code.s3.yandex.net/react/code/meat-03.png'} />
          </li>
          <li className={style.thumbnail}>
            <IngredientThumbnail image={'https://code.s3.yandex.net/react/code/meat-03.png'} />
          </li>
          <li className={style.thumbnail}>
            <IngredientThumbnail image={'https://code.s3.yandex.net/react/code/meat-03.png'} />
          </li>
        </ul> */}
        <div className={style.totalWrapper}>
          <p className={`${style.totalText} text text_type_digits-default mr-2`}>{totalPrice}</p>
          <CurrencyIcon type={'primary'} />
        </div>
      </div>
    </article>
  );
};
