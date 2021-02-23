import express from 'express';
const router = express.Router();
import ICommentRepo from '../../domain/comment/ICommentRepo';
// import Comment from '../../domain/comment/comment';
import ILogger from '../../infra/logger/ILogger';
import errorHandler from '../errorHandler';
// // import articlesValidationNew from './middlewares/articles.validation.new';
// import TransformedComment from './commentTransformer';
// import CommentService from '../../application/comment/commentService';
// import moment from 'moment';
// import {ArticleCreatedData} from '../../../src/application/declarations';

export default (app: express.Application, source: string) => {
  console.log('🚀 ~ file: index.ts ~ line 14 ~ source', source);
  const logger = app.get('logger') as ILogger;
  const sqlCommentRepo = app.get('sqlCommentRepo') as ICommentRepo;

  // TODO Implement an encryption middleware. Suggested package for encryption: 'bcrypt'
  // Encrypt Password Middleware.

  // router.post('/', encryptPassword);

  /**
   * Retrieve all Users.
   */
  router.get('/:commentId', async (_req, res) => {
    let responseComment;
    const { commentId } = _req.params;
    try {
      responseComment = await sqlCommentRepo.findById(commentId);
    } catch (err) {
      return errorHandler(err, res, logger);
    }
    res.json({
      data: responseComment,
    });
  });


  /**
  * Retrieve all Users.
  */
  router.get('/:id/reply', async (_req, res) => {
    let comments;
    const { id } = _req.params;
    try {
      comments = await sqlCommentRepo.findListCommentOnComment(id);
    } catch (err) {
      return errorHandler(err, res, logger);
    }

    res.json({
      data: comments,
    });
  });

  /**
  * Retrieve all Users.
  */
  router.get('/:id/article', async (_req, res) => {
    let comments;
    const { id } = _req.params;
    try {
      comments = await sqlCommentRepo.findListCommentOnArticle(id);
    } catch (err) {
      return errorHandler(err, res, logger);
    }

    res.json({
      data: comments,
    });
  });

  return router;
};
