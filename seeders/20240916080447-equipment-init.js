'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('equipment', [
      {
        name:'eecp',
        num:3
      },
      {
        name:'dfpp',
        num:1
      },
      {
        name:'oxygen',
        num:3
      },
      {
        name:'olib',
        num:3
      },
      {
        name:'stand',
        num:6
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('equipment', null, {});
  }
};
