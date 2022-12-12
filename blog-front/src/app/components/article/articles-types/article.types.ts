import { User } from '../../auth/user-types/user.types';

export interface Article {
  _id: string;
  sender: User;
  title: string;
  content: string;
  backgoundColor: string;
  textColor: string;
  textFont: string;
  updatedAt: string;
  createdAt: string;
  status: string;
}

export interface CreateArticleInput {
  sender: string;
  title: string;
  content: string;
  backgoundColor: string;
  textColor: string;
  textFont: string;
}
