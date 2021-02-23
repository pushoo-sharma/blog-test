import { DataTypes, Sequelize } from 'sequelize';
import Comment from './comment';

export const attributes = {
  comment: { type: DataTypes.STRING, allowNull: false },
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  commentId: { type: DataTypes.STRING },
  articleId: { type: DataTypes.STRING, allowNull: false },
};

export const tableName = 'comment';

export default (sequelize: Sequelize) => {
  Comment.init(attributes, {
    sequelize,
    tableName,
  });

  return true;
};
