import { BUN, MAIN, SAUCE } from '../../utils/constants';
import { TIngredientType } from '../../utils/types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tab-bar.module.css';

interface ITabBar {
  headingRefs: {
    [key in TIngredientType]: React.RefObject<HTMLHeadingElement>;
  };
  currentTab: TIngredientType;
}

export const TabBar = ({ headingRefs, currentTab }: ITabBar) => {
  const scrollToCategory = (ref: React.RefObject<HTMLHeadingElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ul className={`${styles.tabBar}`}>
      <li className={styles.item}>
        <Tab
          active={currentTab === BUN}
          value={BUN}
          onClick={() => scrollToCategory(headingRefs[BUN])}
          children="Булки"
        />
      </li>
      <li className={styles.item}>
        <Tab
          active={currentTab === SAUCE}
          value={SAUCE}
          onClick={() => scrollToCategory(headingRefs[SAUCE])}
          children="Соусы"
        />
      </li>
      <li className={styles.item}>
        <Tab
          active={currentTab === MAIN}
          value={MAIN}
          onClick={() => scrollToCategory(headingRefs[MAIN])}
          children="Начинка"
        />
      </li>
    </ul>
  );
};
