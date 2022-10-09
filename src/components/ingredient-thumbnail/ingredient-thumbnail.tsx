import style from './ingredient-thumbnail.module.css';

interface IIngredientThumbnail {
  image: string;
  more?: number | null;
}

export const IngredientThumbnail = ({ image, more = null }: IIngredientThumbnail) => {
  return (
    <span className={style.thumbnail} style={{ backgroundImage: `url(${image})` }}>
      {more ? <p className={`${style.more} text text_type_main-default`}>+{more}</p> : null}
    </span>
  );
};
