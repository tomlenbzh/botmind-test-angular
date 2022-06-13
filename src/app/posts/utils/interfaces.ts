export interface IPoseUser {
  id: number;
  name: string;
  image: string;
}

export interface IPost {
  id: number;
  createdAt: string;
  user: IPoseUser;
  content: string;
}
