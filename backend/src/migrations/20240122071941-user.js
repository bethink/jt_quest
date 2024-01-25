'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
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
      twitter_username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email_id: {
        type: Sequelize.TEXT, // Using TEXT to accommodate various email formats
        allowNull: false,
      },
      public_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};