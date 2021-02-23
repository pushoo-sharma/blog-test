import { Moment } from 'moment';
import { BaseEvent } from '../../BaseEvent';
import { IDomainEvent } from '../../IDomainEvent';
import { ArticleCreatedData } from './declarations';

export class ArticleCreated extends BaseEvent implements IDomainEvent {
  public readonly id: string;
  public readonly nickname?: string;
  public readonly title?: string;
  public readonly content?: Text;
  public readonly createdAt?: Moment;
  private readonly eventName = 'ArticleCreated';

  constructor(aggregate: string, { id, createdAt, nickname, title, content }: ArticleCreatedData) {
    super(aggregate);

    this.id = id;
    this.createdAt = createdAt;
    this.nickname = nickname;
    this.title = title;
    this.content = content;
  }

  public getEventName(): string {
    return this.eventName;
  }

  public getEventData() {
    return {
      createdAt: this.createdAt?.toISOString(),
      nickname : this.nickname,
      title : this.title,
      content : this.content,
    };
  }
}
