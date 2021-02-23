import { Moment } from 'moment';

export type ArticleCreatedData = {
  id: string;
  createdAt?: Moment;
  nickname?: string;
  content?: Text;
  title?: string;
};
