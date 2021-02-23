'use strict';
const comments = require('../test/testData/comments');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('comment', comments, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comment', null, {});
  }
};