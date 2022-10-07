import { IIngredient } from '../../utils/constants';

export interface IUpdateToken {
  accessToken: string;
  refreshToken: string;
}

export interface IEmail {
  email: string;
}

export interface IPassword {
  password: string;
}

export interface IName {
  name: string;
}

export interface IMailCode {
  token: string;
}

export type TUserInfo = IName & IEmail;

export type TLoginForm = IEmail & IPassword;

export type TRegistrationForm = TLoginForm & IName;

export type TProfileForm = TUserInfo & Partial<IPassword>;

export type TAuthUser = IUpdateToken & {
  user: TUserInfo;
};

export type TResetPassword<T = {}> = {
  [K in keyof T]: T[K];
};

export type TIngredientsIdList = Array<string>;

export interface IOrderDetails {
  name: string;
  order: {
    ingredients: ReadonlyArray<IIngredient & { __v: number }>;
    owner: {
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    price: number;
    _id: string;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
  };
}
