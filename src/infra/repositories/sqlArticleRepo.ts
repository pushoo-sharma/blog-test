// import moment from 'moment';
import { ArticleData } from '../../domain/article/declarations';
import IArticleRepo from '../../domain/article/IArticleRepo';
import Article from '../../domain/article/article';
import { default as ArticleModel } from '../sql/models/article/article';
import { ArticleCreatedData } from '../../../src/application/declarations';


class SqlArticleRepo implements IArticleRepo {
  /**
   * Create and return a new MongoDB id.
   *
   * @return string
   */
  public nextIdentity(): string {
    throw new Error('SqlUserRepo uses auto-incremental ids');
  }

  /**
   * Return all Users as an array of User entities.
   *
   * @returns Promise<User[]>
   */
  public all(): Promise<Article[]> {
    return new Promise((resolve, reject) => {
      ArticleModel.findAll()
        .then((data: ArticleModel[]) => {
          return resolve(data.map((articleData: ArticleModel) =>
            new Article(this.convertArticleModelToArticleData(articleData))));
        })
        .catch((error: any) => reject(error));
    });
  }

  /**
   * Return all Users as an array of User entities.
   *
   * @returns Promise<User[]>
   */
  public paginate(page: string, size: string): Promise<Article[]> {
    return new Promise((resolve, reject) => {
      const { limit, offset } = this.getPagination(page, size);
      console.log("🚀 ~ file: sqlArticleRepo.ts ~ line 43 ~ SqlArticleRepo ~ returnnewPromise ~ limit, offset", limit, offset)
      ArticleModel.findAll({
        limit, offset,
      }).then((data: ArticleModel[]) => {
        return resolve(data.map((articleData: ArticleModel) =>
          new Article(this.convertArticleModelToArticleData(articleData))));
      })
        .catch((error: any) => reject(error));
    });
  }

  /**
   * Find and return a User by id.
   * Resolve an empty object if no User is found.
   *
   * @param {string} userId
   * @returns Promise<User> | Promise<object>
   */
  public findById(articleId: string): Promise<Article | null> {
    return new Promise((resolve, reject) => {
      ArticleModel.findByPk(articleId)
        .then((articleData) => {
          if (!articleData) {
            resolve(null);

            return;
          }

          resolve(new Article(this.convertArticleModelToArticleData(articleData)));
        })
        .catch((error: any) => reject(error));
    });
  }

  /**
  * Find and return a User by id.
  * Resolve an empty object if no User is found.
  *
  * @param {string} userId
  * @returns Promise<User> | Promise<object>
  */
  public createArticle(article: ArticleCreatedData): Promise<Article | null> {
    return new Promise((resolve, reject) => {
      ArticleModel.create(article)
        .then((articleData) => {
          if (!articleData) {
            resolve(null);

            return;
          }

          resolve(new Article(this.convertArticleModelToArticleData(articleData)));
        })
        .catch((error: any) => reject(error));
    });
  }

  private getPagination = (page: string, size: string) => {
    const limit = size ? +size : 10;
    const offset = page ? +page * limit : 0;

    return { limit, offset };
  };

  private convertArticleModelToArticleData(articleModel: ArticleModel): ArticleData {
    return {
      nickname: articleModel.nickname,
      id: articleModel.id,
      title: articleModel.title,
      content: articleModel.content,
    };
  }
}

export default (): SqlArticleRepo => {
  return new SqlArticleRepo();
};
