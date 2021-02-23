import { Moment } from 'moment';

export type TransformedComment = {
  comment: string | undefined;
  commentId: string | undefined;
  articleId: string | undefined;
  createdAt: Moment| undefined;
};
