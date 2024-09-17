'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('treatment', [
      {
        name:'eecp',
        value:1
      },
      {
        name:'dfpp',
        value:2
      },
      {
        name:'other',
        value:3
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('treatment', null, {});
  }
};
