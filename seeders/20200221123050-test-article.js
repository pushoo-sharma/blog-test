'use strict';
const articles = require('../test/testData/articles');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('article', articles, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('article', null, {});
  }
};