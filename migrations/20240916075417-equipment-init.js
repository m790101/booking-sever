'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('equipment', {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      num:{
        type: Sequelize.INTEGER,
      }
  });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('equipment');
  }
};
