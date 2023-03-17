export default (sequelize, DataTypes) => {
  const TodoItem = sequelize.define("todo", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'user',
        key: 'id'
     },
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE'
    }
  }, {
    freezeTableName: true
  });

  return TodoItem;
};