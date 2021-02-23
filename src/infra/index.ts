import brokerFactory from '@micheleangioni/node-messagebrokers';
import { Application } from 'express';
import config from '../config';
import EventPublisher from '../application/eventPublisher';
import Logger from './logger';
import SqlArticleRepo from './repositories/sqlArticleRepo';
import SqlCommentRepo from './repositories/sqlCommentRepo';
import Sequelize from './sql';
import sqlModels from './sql/models/models';

export default async (app: Application) => {
  // Add logger
  const logger = new Logger();
  app.set('logger', logger);

  // If a SQL dialect is set, add Sequelize, its models and repos
  if (process.env.SQL_DIALECT !== 'none') {
    app.set('sqlClient', Sequelize());
    sqlModels(app);
    app.set('sqlArticleRepo', SqlArticleRepo());
    app.set('sqlCommentRepo', SqlCommentRepo());
  }

  if (process.env.ENABLE_MESSAGE_BROKER === 'true') {
    const kafkaBroker = brokerFactory(config.kafka.topics);

    try {
      await kafkaBroker.init();
    } catch (err) {
      const error = {
        error: err as Error,
        message: `Kafka topics creation error: ${(err as Error).toString()}`,
        type: 'kafka',
      };

      logger.fatal(error);

      throw err;
    }

    logger.info('Kafka Broker successfully initialized');
    const eventPublisher = new EventPublisher(kafkaBroker, logger);
    app.set('messageBroker', eventPublisher);
  }
};
