'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('article', {
      nickname: { type: Sequelize.STRING, allowNull: false },
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      title: { type: Sequelize.STRING, allowNull: false },
      content: { type: Sequelize.TEXT, allowNull: false },
      updatedAt: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.STRING },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('article');
  }
};
