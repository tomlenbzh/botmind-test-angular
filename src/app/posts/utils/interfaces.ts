import { IPartialUser, IUser } from 'src/app/authentication/utils/interfaces';

// export interface IPoseUser {
//   id: number;
//   name: string;
//   image: string;
// }

export interface IListMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IPartialPost {
  id?: number;
}

export interface IPost {
  id?: number;
  title?: string;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: IUser;
  likes?: ILike[];
}

export interface IPostsList {
  items: IPost[];
  meta: IListMeta;
}

export interface ILike {
  id?: number;
  user: IPartialUser;
  post: IPartialPost;
}

export interface ILikeData {
  likeId: number;
  post: IPartialPost;
}
