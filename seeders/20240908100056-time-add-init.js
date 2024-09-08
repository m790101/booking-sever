'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('time_slot', [
      {
        startTime:'9:30',
      },
      {
        startTime:'11:00',
      },
      {
        startTime:'12:00',
      },
      {
        startTime:'13:30',
      },
      {
        startTime:'15:00',
      },
      {
        startTime:'16:30',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('time_slot', null, {});
  }
};
