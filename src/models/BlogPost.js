module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, primaryKey: true }, 
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
      tableName: 'blog_posts',
      timestamps: false,
      underscored: true,
    },
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
  };

  return BlogPost;
};
