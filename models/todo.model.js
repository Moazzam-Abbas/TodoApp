export default (sequelize, DataTypes) => {
  const TodoItem = sequelize.define("todo", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
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