import { Moment } from 'moment';
import { BaseEvent } from '../../BaseEvent';
import { IDomainEvent } from '../../IDomainEvent';
import { CommentCreatedData } from './declarations';

export class CommentCreated extends BaseEvent implements IDomainEvent {
  public readonly id: string;
  public readonly comment?: string;
  public readonly commentId?: string;
  public readonly articleId?: string;
  public readonly createdAt?: Moment;
  private readonly eventName = 'CommentCreated';

  constructor(aggregate: string, { id, comment, commentId, articleId, createdAt }: CommentCreatedData) {
    super(aggregate);

    this.id = id;
    this.createdAt = createdAt;
    this.comment = comment;
    this.commentId = commentId;
    this.articleId = articleId;
  }

  public getEventName(): string {
    return this.eventName;
  }

  public getEventData() {
    return {
      createdAt: this.createdAt?.toISOString(),
      comment : this.comment,
      commentId : this.commentId,
      articleId : this.articleId,
    };
  }
}
