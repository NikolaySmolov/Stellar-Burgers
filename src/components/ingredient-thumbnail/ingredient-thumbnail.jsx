import style from './ingredient-thumbnail.module.css';

export const IngredientThumbnail = ({ image, more = null }) => {
  return (
    <span className={style.thumbnail} style={{ backgroundImage: `url(${image})` }}>
      {more ? <p className={`${style.more} text text_type_main-default`}>+{more}</p> : null}
    </span>
  );
};
