export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface IUser {
  id?: number;
  name?: string;
  userName?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}

export interface IPartialUser {
  id: number;
}

export interface LoginInfo {
  token: string;
  user: IUser;
}
