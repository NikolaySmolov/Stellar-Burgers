export interface IUpdateToken {
  accessToken: string;
  refreshToken: string;
}

export interface IUserInfo {
  email: string;
  name: string;
}

export type TAuthUser = IUpdateToken & {
  user: IUserInfo;
};

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegistrationForm extends ILoginForm {
  name: string;
}
