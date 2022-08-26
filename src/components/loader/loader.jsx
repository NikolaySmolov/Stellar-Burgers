import style from './loader.module.css';
import { LoaderSvg } from './loader.svg';

export const Loader = () => {
  return (
    <div className={style.wrapper_button}>
      <LoaderSvg />
    </div>
  );
};
