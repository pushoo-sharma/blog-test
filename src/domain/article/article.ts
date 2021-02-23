import moment, { Moment } from 'moment';
import { BaseEntity } from '../BaseEntity';
import { IEntity } from '../declarations';
import { ArticleData } from './declarations';
import { ArticleCreated } from './events/ArticleCreated';

export default class Article extends BaseEntity implements IEntity {
  private static AGGREGATE_NAME = 'article';
  private readonly id: number | string;
  private nickname: string;
  private title: string;
  private content: Text;
  private createdAt?: Moment| undefined;
  private updatedAt?: Moment| undefined;

  constructor({ id, createdAt, nickname, title, content, updatedAt }: ArticleData) {
    super();

    this.id = id;
    this.nickname = nickname;
    this.title = title;
    this.content = content;


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


  public getNickname(): string {
    return this.nickname;
  }

  public getTitle(): string  {
    return this.title;
  }

  public getContent(): Text {
    return this.content;
  }

  public setNickname(nickname: string) {
    this.nickname = nickname;
  }

  public setContent(content: Text){
    return this.content = content;
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

      this.addDomainEvent(new ArticleCreated(Article.AGGREGATE_NAME, {
        createdAt: moment(date),
        nickname: this.nickname,
        id: this.id.toString(),
        title: this.title,
        content: this.content,
      }));
    }

    this.updatedAt = date.clone();
  }
}
