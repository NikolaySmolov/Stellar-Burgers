import React from 'react';
import styles from './burger-ingredients.module.css';
import { TabBar } from '../tab-bar/tab-bar';
import { IngredientsSection } from '../ingredients-section/ingredients-section';
import { useSelector } from 'react-redux';

export default function BurgerIngredients() {
  const [currentTab, setCurrentTab] = React.useState('buns');

  const { ingredients } = useSelector(store => store.burger);

  const bunHeading = React.useRef(null);
  const saucesHeading = React.useRef(null);
  const mainHeading = React.useRef(null);

  const tabsFollowing = () => {
    const saucesHeadingBox = saucesHeading.current.getBoundingClientRect();
    const mainHeadingBox = mainHeading.current.getBoundingClientRect();

    if (saucesHeadingBox.y < 275 && mainHeadingBox.y > 275 && currentTab !== 'sauces') {
      setCurrentTab('sauces');
    } else if (mainHeadingBox.y < 275 && currentTab !== 'main') {
      setCurrentTab('filling');
    } else if (saucesHeadingBox.y > 275 && currentTab !== 'buns') {
      setCurrentTab('buns');
    }
  };

  const content = React.useMemo(() => {
    const buns = [];
    const sauces = [];
    const main = [];

    ingredients.forEach(ingredient => {
      switch (ingredient.type) {
        case 'bun':
          buns.push(ingredient);
          break;
        case 'sauce':
          sauces.push(ingredient);
          break;
        case 'main':
          main.push(ingredient);
          break;
        default:
          return;
      }
    });

    return (
      <>
        <IngredientsSection menuSection="Булки" ingredientList={buns} ref={bunHeading} />
        <IngredientsSection
          headingRef={saucesHeading}
          menuSection="Соусы"
          ingredientList={sauces}
          ref={saucesHeading}
        />
        <IngredientsSection
          headingRef={mainHeading}
          menuSection="Начинки"
          ingredientList={main}
          ref={mainHeading}
        />
      </>
    );
  }, [ingredients]);

  return (
    <>
      <section>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <TabBar
          bunSectionRef={bunHeading}
          sauceSectionRef={saucesHeading}
          mainSectionRef={mainHeading}
          currentTab={currentTab}
        />
        <ul onScroll={tabsFollowing} className={`${styles.menu} custom-scroll`}>
          {content}
        </ul>
      </section>
    </>
  );
}
