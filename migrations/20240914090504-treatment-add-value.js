"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "treatment",
          "value",
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('treatment', 'value', { transaction: t }),
    ]);
  },
};
