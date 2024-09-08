'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('time_slot', {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      startTime: {
        type: Sequelize.TIME,
        allowNull: false,
        unique: true,
      },
  });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('time_slot');
  }
};
