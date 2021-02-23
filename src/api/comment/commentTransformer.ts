import Comment from '../../domain/comment/comment';
import { TransformedComment } from './declarations';

export default (comment: Comment): TransformedComment => {
  return {
    comment: comment.getComment(),
    commentId: comment.getCommentId(),
    articleId: comment.getArticleId(),
    createdAt: comment.getCreatedAt(),
  };
};
