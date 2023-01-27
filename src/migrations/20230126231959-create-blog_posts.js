'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: Sequelize.STRING,
      content: Sequelize.STRING,
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key:'id',
        }, 
        onDelete: 'CASCADE',
      },
      createdAt: {
        field: 'published',
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: 'updated',
        allowNull: false,
        type: Sequelize.DATE,
      },

    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('blog_posts')
  }
};
