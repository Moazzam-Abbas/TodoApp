export default (sequelize, DataTypes) => {
  const TodoItem = sequelize.define("todo", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    freezeTableName: true
  });

  return TodoItem;
};