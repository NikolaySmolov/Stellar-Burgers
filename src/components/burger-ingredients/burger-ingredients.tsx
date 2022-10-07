import { useMemo, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { TabBar } from '../tab-bar/tab-bar';
import { IngredientsSection } from '../ingredients-section/ingredients-section';
import { selectIngredientsState } from '../../services/selectors/ingredients';
import { BUN, IIngredient, MAIN, SAUCE, TIngredientType } from '../../utils/constants';
import { useAppSelector } from '../../services/redux-hooks';

type TIngredientsByCategory = {
  [key in TIngredientType]: Array<IIngredient>;
};

export function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState<TIngredientType>(BUN);

  const { ingredients } = useAppSelector(selectIngredientsState);

  const bunHeading = useRef<HTMLHeadingElement>(null);
  const saucesHeading = useRef<HTMLHeadingElement>(null);
  const mainHeading = useRef<HTMLHeadingElement>(null);

  const tabsFollowing = () => {
    if (saucesHeading.current && mainHeading.current) {
      const saucesHeadingBox: DOMRect = saucesHeading.current.getBoundingClientRect();
      const mainHeadingBox = mainHeading.current?.getBoundingClientRect();

      if (saucesHeadingBox.y < 275 && mainHeadingBox.y > 275 && currentTab !== SAUCE) {
        setCurrentTab(SAUCE);
      } else if (mainHeadingBox.y < 275 && currentTab !== MAIN) {
        setCurrentTab(MAIN);
      } else if (saucesHeadingBox.y > 275 && currentTab !== BUN) {
        setCurrentTab(BUN);
      }
    }
  };

  const content = useMemo(() => {
    const ingredientsByCategory = ingredients.reduce(
      (acc: TIngredientsByCategory, ingredient) => {
        acc[ingredient.type].push(ingredient);
        return acc;
      },
      { [BUN]: [], [SAUCE]: [], [MAIN]: [] }
    );

    return (
      <>
        <IngredientsSection
          menuSection={'Булки'}
          ingredientList={ingredientsByCategory[BUN]}
          ref={bunHeading}
        />
        <IngredientsSection
          menuSection={'Соусы'}
          ingredientList={ingredientsByCategory[SAUCE]}
          ref={saucesHeading}
        />
        <IngredientsSection
          menuSection={'Начинки'}
          ingredientList={ingredientsByCategory[MAIN]}
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
          headingRefs={{ [BUN]: bunHeading, [SAUCE]: saucesHeading, [MAIN]: mainHeading }}
          currentTab={currentTab}
        />
        <ul onScroll={tabsFollowing} className={`${styles.menu} custom-scroll`}>
          {content}
        </ul>
      </section>
    </>
  );
}
