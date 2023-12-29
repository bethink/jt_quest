'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('quests', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        autoIncrement:false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      live: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      categories: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      disable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      points: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      points_token_ratio: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      network: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      token_symbol: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('quests');
  }
};
