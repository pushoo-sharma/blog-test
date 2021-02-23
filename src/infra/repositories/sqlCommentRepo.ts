// import moment from 'moment';
// import { CommentData } from '../../domain/comment/declarations';
import ICommentRepo from '../../domain/comment/ICommentRepo';
import Comment from '../../domain/comment/comment';
import { default as CommentModel } from '../sql/models/comment/comment';
import { CommentCreatedData } from '../../../src/application/declarations';


class SqlCommentRepo implements ICommentRepo {

  /**
   * Find and return a User by id.
   * Resolve an empty object if no User is found.
   *
   * @param {string} userId
   * @returns Promise<User> | Promise<object>
   */
  public findById(commentId: string): Promise<Comment | null> {
    return new Promise((resolve, reject) => {
      CommentModel.findByPk(commentId)
        .then((CommentData) => {
          if (!CommentData) {
            resolve(null);

            return;
          }

          resolve(new Comment(CommentData));
        })
        .catch((error: any) => reject(error));
    });
  }

  public findListCommentOnArticle(articleId: string): Promise<Comment[]>{
    return new Promise((resolve, reject) => {
      CommentModel.findAll({
        where : {
          articleId : articleId
        }
      })
      .then((data: CommentModel[]) => {
        return resolve(data.map((commentData: CommentModel) => new Comment(this.convertCommentModelToCommentData(commentData))));
      })
        .catch((error: any) => reject(error));
    });
  }

  public findListCommentOnComment(commentId: string): Promise<Comment[]>{
    return new Promise((resolve, reject) => {
      CommentModel.findAll({
        where : {
          commentId : commentId
        }
      })
      .then((data: CommentModel[]) => {
        return resolve(data.map((commentData: CommentModel) => new Comment(this.convertCommentModelToCommentData(commentData))));
      })
        .catch((error: any) => reject(error));
    });
  }

  private convertCommentModelToCommentData(commentModel: CommentModel): CommentCreatedData {
    return {
      id: commentModel.id,
      comment: commentModel.comment,
      commentId: commentModel.commentId,
      articleId: commentModel.articleId,
    };
  }

}

export default (): SqlCommentRepo => {
  return new SqlCommentRepo();
};
