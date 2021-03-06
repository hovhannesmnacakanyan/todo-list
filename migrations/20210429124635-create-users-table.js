'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // await queryInterface.bulkInsert(
    //   'Users',
    //   [
    //     {
    //       firstName: 'John',
    //       lastName: 'Doe',
    //       email: 'john@doe.com',
    //       password: '123456789',
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       firstName: 'John',
    //       lastName: 'Smith',
    //       email: 'john@smith.com',
    //       password: '123456789',
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       firstName: 'John',
    //       lastName: 'Stone',
    //       email: 'john@stone.com',
    //       password: '123456789',
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {},
    // );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
