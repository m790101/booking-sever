'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('room', [
      {
        name:'201',
      },
      {
        name:'202',
      },
      {
        name:'203',
      },
      {
        name:'205',
      },
      {
        name:'207',
      },
      {
        name:'208',
      },
      {
        name:'209',
      },
      {
        name:'999',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('room', null, {});
  }
};
