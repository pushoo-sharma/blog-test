import Article from '../../domain/article/article';
import { TransformedArticle } from './declarations';

export default (article: Article): TransformedArticle => {
  return {
    nickname: article.getNickname(),
    title: article.getTitle(),
    content: article.getContent(),
    createdAt: article.getCreatedAt(),
  };
};
