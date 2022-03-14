'use strict';

const userActivity = require('../controller/userActivity')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'UserActivity',
      await userActivity.importLogs(),
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserActivity', null, {});
  },
};
