'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comment', {
      nickname: { type: Sequelize.STRING, allowNull: false },
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      comment: { type: Sequelize.TEXT, allowNull: false },
      articleId: { type: Sequelize.UUID, allowNull: false },
      commentId: { type: Sequelize.UUID},
      updatedAt: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.STRING },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('comment');
  }
};
