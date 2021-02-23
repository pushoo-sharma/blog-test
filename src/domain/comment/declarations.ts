import { Moment } from 'moment';

export type CommentDomainData = {
  comment: string;
  articleId: string;
  commentId?: string | null;
  createdAt?: Date | Moment;
  updatedAt?: Date | Moment;
};

export type CommentData = CommentDomainData & {
  id: number | string;
};
