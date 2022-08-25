import styles from './not-found.module.css';
import image from '../images/404page.png';

export const NotFoundPage = () => {
  return (
    <main className={styles.page}>
      <section className={`${styles.content}`}>
        <img className={styles.image} src={image} alt={'иллюстрация бургера'} />
        <h1 className={`${styles.text} text text_type_main-default text_color_inactive pt-4`}>
          Такой страницы больше нет или она никогда не&nbsp;существовала.
        </h1>
      </section>
    </main>
  );
};
