import {CloudEvent} from 'cloudevents';
import {IDomainEvent} from '../domain/IDomainEvent';
import { Moment } from 'moment';

export type ApplicationErrorData = {
  code: string;
  error: Error | string;
  status: number;
};

export enum ErrorCodes {
  FORBIDDEN = 'forbidden',
  INTERNAL_ERROR = 'internal-error',
  INVALID_DATA = 'invalid-data',
  NOT_FOUND = 'not-found',
  UNAUTHORIZED = 'unauthorized',
}

export type GroupedByAggregateEvents = {
  [aggregate: string]: IDomainEvent[];
};

export type GroupedByAggregateCloudevents = {
  [aggregate: string]: CloudEvent[];
};

export type ArticleCreatedData = {
  createdAt: Moment;
  nickname: string;
  content: Text;
  title: string;
};


export type CommentCreatedData = {
  comment: string;
  commentId?: string;
  articleId: string;
  id: number;
};
