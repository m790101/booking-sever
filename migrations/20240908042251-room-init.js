"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("room", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      // created_at: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // },
      // updated_at: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("room");
  },
};
