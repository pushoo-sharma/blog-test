import express from 'express';
import { Sequelize } from 'sequelize';
import usersSchema from './users/usersSchema';
import articlesSchema from './article/articlesSchema';
import commentsSchema from './comment/commentsSchema';

export default (app: express.Application) => {
  // Init models
  usersSchema(app.get('sqlClient') as Sequelize);
  // Init models
  articlesSchema(app.get('sqlClient') as Sequelize);
  // Init models
  commentsSchema(app.get('sqlClient') as Sequelize);
};
