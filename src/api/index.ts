import express from 'express';
import articleRouter from './articles';
import commentRouter from './comment';

export default async (app: express.Application) => {
  const articleSource = '/api/articles';
  app.use(articleSource, articleRouter(app, articleSource));
  const commentSource = '/api/comments';
  app.use(commentSource, commentRouter(app, commentSource));

  return Promise.resolve();
};
