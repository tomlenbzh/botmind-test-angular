import { IUser } from 'src/app/authentication/utils/interfaces';

export interface IPoseUser {
  id: number;
  name: string;
  image: string;
}

export interface IListMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IPost {
  id?: number;
  title?: string;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: IUser;
}

export interface IPostsList {
  items: IPost[];
  meta: IListMeta;
}
