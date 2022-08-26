import PropTypes from 'prop-types';
import { refPropTypes } from '../../utils/constants';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tab-bar.module.css';

export const TabBar = ({ bunSectionRef, sauceSectionRef, mainSectionRef, currentTab }) => {
  const scrollToMain = () => {
    mainSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSauces = () => {
    sauceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBun = () => {
    bunSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ul className={`${styles.tabBar}`}>
      <li className={styles.item}>
        <Tab active={currentTab === 'buns'} value="buns" onClick={scrollToBun} children="Булки" />
      </li>
      <li className={styles.item}>
        <Tab
          active={currentTab === 'sauces'}
          value="sauces"
          onClick={scrollToSauces}
          children="Соусы"
        />
      </li>
      <li className={styles.item}>
        <Tab
          active={currentTab === 'filling'}
          value="filling"
          onClick={scrollToMain}
          children="Начинка"
        />
      </li>
    </ul>
  );
};

TabBar.propTypes = {
  bunSectionRef: refPropTypes,
  sauceSectionRef: refPropTypes,
  mainSectionRef: refPropTypes,
  currentTab: PropTypes.string.isRequired,
};
