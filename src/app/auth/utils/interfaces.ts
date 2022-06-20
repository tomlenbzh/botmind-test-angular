export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface IUser {
  id?: number;
  name?: string;
  image?: string;
  userName?: string;
  email?: string;
  password?: string;
  lang?: string;
  role?: UserRole;
  description?: string;
}

export interface IPartialUser {
  id: number;
}

export interface LoginInfo {
  token: string;
  user: IUser;
}
