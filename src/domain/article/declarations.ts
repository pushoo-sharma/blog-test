import { Moment } from 'moment';

export type ArticleDomainData = {
  nickname: string;
  title: string;
  content: Text;
  createdAt?: Date | Moment;
  updatedAt?: Date | Moment;
};

export type ArticleData = ArticleDomainData & {
  id: number | string;
};
