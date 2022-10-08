import { BUN, CREATED, DONE, MAIN, PENDING, SAUCE } from './constants';

export type TIngredientType = typeof BUN | typeof SAUCE | typeof MAIN;

export interface IIngredient {
  _id: string;
  name: string;
  type: TIngredientType;
  price: number;
  image: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  proteins: number;
  image_large: string;
  image_mobile: string;
}

export type TConstructorIngredient<T = TIngredientType> = Omit<IIngredient, 'type'> & {
  type: T;
  tempId: string;
};

export type TOrderStatus = typeof CREATED | typeof PENDING | typeof DONE;

export interface IOrderInFeed {
  _id: string;
  ingredients: Array<string>;
  status: TOrderStatus;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export interface IIngredientDataInOrder {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}
