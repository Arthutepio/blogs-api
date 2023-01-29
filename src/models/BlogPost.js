module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER, 
      },
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
      // createdAt: {
      //   allowNull: false,
      //   type: DataTypes.DATE,
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: DataTypes.DATE,
      // }
    },
    {
      tableName: 'blogPosts',
      underscored: true,
    },
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
  };

  return BlogPost;
};
