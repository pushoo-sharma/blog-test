import Comment from './comment';
// import {CommentCreatedData} from '../../application/declarations';

export default interface ICommentRepo {
  findById (CommentId: string): Promise<Comment|null>;
  findListCommentOnArticle(articleId: string): Promise<Comment[]>;
  findListCommentOnComment(commentId: string): Promise<Comment[]>;
}
