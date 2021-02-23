import Article from './article';
import {ArticleCreatedData} from '../../../src/application/declarations';

export default interface IArticleRepo {
  nextIdentity(): string;
  all (): Promise<Article[]>;
  paginate (page: string, size: string): Promise<Article[]>;
  findById (ArticleId: string): Promise<Article|null>;
  createArticle(Article: ArticleCreatedData): Promise<Article|null>;
}
