'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "booking",
          "treatment_id",
          {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('booking', 'treatment_id', { transaction: t }),
      ]);
    });
  }
};
