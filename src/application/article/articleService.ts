import IArticleRepo from '../../domain/article/IArticleRepo';
import Article from '../../domain/article/article';
import ApplicationError from '../ApplicationError';
// import { ErrorCodes, ArticleCreatedData } from '../declarations';
import { ErrorCodes } from '../declarations';
import EventPublisher from '../eventPublisher';

export default class ArticleService {
  constructor(private articleRepo: IArticleRepo, private eventPublisher?: EventPublisher) {
    console.log('🚀 ~ file: articleService.ts ~ line 11 ~ ArticleService ~ eventPublisher', this.eventPublisher);
  }

  public async getAll(): Promise<Article[]> {

    return await this.articleRepo.all();
  }

  public async getById(ArticleId: string): Promise<Article> {
    const article = await this.articleRepo.findById(ArticleId);

    if (!article) {
      throw new ApplicationError({
        code: ErrorCodes.NOT_FOUND,
        error: 'Article not found',
        status: 404,
      });
    }

    return article;
  }

  // public async createArticle(data: ArticleCreatedData, source: string): Promise<Article> {
  //   const article = new Article({ id: this.articleRepo.nextIdentity(), ...data });

  //   return this.persistArticleAndEmitEvents(article, source);
  // }

  // private async persistArticleAndEmitEvents(Article: Article, source: string): Promise<Article> {
  //   const updatedArticle = await this.articleRepo.persist(Article);
  //   await this.sendApplicationEvents(source, Article);

  //   return updatedArticle;
  // }

  // private async sendApplicationEvents(source: string, Article: Article): Promise<true> {
  //   if (!Article.getCreatedAt()) {
  //     throw new ApplicationError({
  //       code: ErrorCodes.INTERNAL_ERROR,
  //       error: 'A non-persisted Article should not be used to send events',
  //       status: 500,
  //     });
  //   }

  //   if (this.eventPublisher) {
  //     await this.eventPublisher.publish(source, Article.releaseDomainEvents(), Article.getId().toString());
  //   }

  //   return true;
  // }
}
