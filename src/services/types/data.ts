export interface IUpdateToken {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  email: string;
  name: string;
}

export interface ILogin {
  email: string;
  password: string;
}
