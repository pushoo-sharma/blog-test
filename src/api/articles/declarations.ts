import { Moment } from 'moment';

export type TransformedArticle = {
  nickname: string | undefined;
  title: string | undefined;
  content: Text;
  createdAt: Moment| undefined;
};
