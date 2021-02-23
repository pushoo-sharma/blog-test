import { Moment } from 'moment';

export type CommentCreatedData = {
  id: string;
  createdAt?: Moment;
  comment?: string;
  commentId?: string;
  articleId?: string;
};
