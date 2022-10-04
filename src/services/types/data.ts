export interface IUpdateToken {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  email: string;
  name: string;
}
