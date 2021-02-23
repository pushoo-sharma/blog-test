import { DataTypes, Sequelize } from 'sequelize';
import Article from './article';

export const attributes = {
  nickname: { type: DataTypes.STRING, allowNull: false },
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
};

export const tableName = 'article';

export default (sequelize: Sequelize) => {
  Article.init(attributes, {
    sequelize,
    tableName,
  });

  return true;
};
