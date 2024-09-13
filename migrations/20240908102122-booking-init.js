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
      time_slot_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'time_slot',
          },
          key: 'id',
        },
        allowNull: false,
      },
      room_id: {
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
      // created_at: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // },
      // updated_at: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // }
  });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('booking');
  }
};
