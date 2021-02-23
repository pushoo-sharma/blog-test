import moment, { Moment } from 'moment';
import { BaseEntity } from '../BaseEntity';
import { IEntity } from '../declarations';
import { CommentData } from './declarations';
import { CommentCreated } from './events/CommentCreated';

export default class Comment extends BaseEntity implements IEntity {
  private static AGGREGATE_NAME = 'comment';
  private readonly id: number | string;
  private comment: string;
  private articleId: string;
  private commentId?: string | undefined;
  private createdAt?: Moment | undefined;
  private updatedAt?: Moment | undefined;

  constructor({ id, createdAt, comment, articleId, commentId, updatedAt }: CommentData) {
    super();

    this.id = id;
    this.comment = comment;
    this.articleId = articleId;

    if(commentId) {
      this.commentId = commentId;
    }

    if (createdAt) {
      this.createdAt = moment(createdAt);
    }

    if (updatedAt) {
      this.updatedAt = moment(updatedAt);
    }
  }

  public getId(): number | string {
    return this.id;
  }

  public getCreatedAt(): Moment | undefined {
    return (this.createdAt ? this.createdAt : undefined);
  }


  public getComment(): string {
    return this.comment;
  }

  public getArticleId(): string {
    return this.articleId;
  }

  public getCommentId(): string {
    return this.commentId ? this.commentId : '';
  }

  public setComment(comment: string) {
    this.comment = comment;
  }

  public setCommentId(commentId: string) {
    return this.commentId = commentId;
  }

  public getUpdatedAt(): Moment | undefined {
    return this.updatedAt;
  }

  /**
   * Update the createdAt and updatedAt keys.
   * If the createdAt key was not previously set, it means this is being persisted for the first time.
   *
   * @param {Moment} date
   * @return void
   */
  public updateDates(date: Moment) {
    if (!this.createdAt) {
      this.createdAt = date.clone();

      this.addDomainEvent(new CommentCreated(Comment.AGGREGATE_NAME, {
        createdAt: moment(date),
        comment: this.comment,
        id: this.id.toString(),
        commentId: this.commentId,
        articleId: this.articleId,
      }));
    }

    this.updatedAt = date.clone();
  }
}
