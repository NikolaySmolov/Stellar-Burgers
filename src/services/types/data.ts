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

export type TAuthUser = IUpdateToken & {
  user: TUserInfo;
};

export type TResetPassword<T = {}> = {
  [K in keyof T]: T[K];
};
