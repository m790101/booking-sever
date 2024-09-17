'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('booking', null, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('booking', null, {});
  }
};
