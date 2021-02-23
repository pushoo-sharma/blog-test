import express from 'express';
const router = express.Router();
import IArticleRepo from '../../domain/article/IArticleRepo';
import Article from '../../domain/article/article';
import ILogger from '../../infra/logger/ILogger';
import errorHandler from '../errorHandler';
// import articlesValidationNew from './middlewares/articles.validation.new';
import articleTransformer from './articleTransformer';
// import ArticleService from '../../application/article/articleService';
import moment from 'moment';
import {ArticleCreatedData} from '../../../src/application/declarations';

export default (app: express.Application, source: string) => {
  console.log('🚀 ~ file: index.ts ~ line 12 ~ source', source);
  const logger = app.get('logger') as ILogger;
  const sqlArticleRepo = app.get('sqlArticleRepo') as IArticleRepo;
  
  /**
   * Retrieve all Users.
   */
  router.get('/:id', async (_req, res) => {
    let articles;
    const { id } = _req.params;
    try {
      articles = await sqlArticleRepo.findById(id);
    } catch (err) {
      return errorHandler(err, res, logger);
    }

    res.json({
      data: articles,
    });
  });

  /**
  * Create a new User.
  */
  router.post('', async (req, res) => {
    let responseArticle;
    const articleCreatedData: ArticleCreatedData = {
      createdAt: moment(new Date()),
      nickname: req.body.nickname,
      content: req.body.content,
      title: req.body.title,
    };
    try {
      responseArticle = await sqlArticleRepo.createArticle(articleCreatedData);
    } catch (err) {
      return errorHandler(err, res, logger);
    }

    res.json({
      data: responseArticle,
    });
  });

  /**
   * Retrieve all Users.
   */
  router.post('/paginate', async (_req, res) => {
    let articles;
    console.log("🚀 ~ file: index.ts ~ line 76 ~ router.get ~ articles", articles)
    const page = _req.query.page?.toString() ? _req.query.page?.toString() : '0';
    const size = _req.query.size?.toString() ? _req.query.size?.toString() : '2';
    try {
      articles = await sqlArticleRepo.paginate(page, size);
    } catch (err) {
      return errorHandler(err, res, logger);
    }

    res.json({
      data: articles.map((article: Article) => {
        return articleTransformer(article);
      }),
    });
  });
    

  /**
   * Create a new User.
   */
  // router.post('/', usersValidationNew, async (req, res) => {
  //   let user;

  //   try {
  //     user = await userService.createUser({
  //       email: req.body.email as string,
  //       password: req.body.password as string,
  //       username: req.body.username as string | undefined,
  //     }, source);
  //   } catch (err) {
  //     return errorHandler(err, res, logger);
  //   }

  //   res.json({
  //     data: userTransformer(user),
  //   });
  // });

  /**
  * Retrieve all Users.
  */
  // router.get('/sql', async (_req, res) => {
  //   let users;

  //   try {
  //     users = await sqlUserRepo.all();
  //   } catch (err) {
  //     return errorHandler(err, res, logger);
  //   }

  //   res.json({
  //     data: users.map((user: User) => {
  //       return userTransformer(user);
  //     }),
  //   });
  // });

  return router;
};
