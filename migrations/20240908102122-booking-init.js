'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('booking', {
      id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      date: {
        type: Sequelize.DataTypes.DATE,
        allowNull:false
      },
      time_slot: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'time_slot',
          },
          key: 'id',
        },
        allowNull: false,
      },
      room: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'room',
          },
          key: 'id',
        },
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull:false,
      },
  });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('booking');
  }
};
