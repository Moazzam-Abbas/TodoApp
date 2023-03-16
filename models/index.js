import dbConfig from '../config/db.config.mjs'
import todoItem from './todo.model.js'
import User from './user.model.js'
import { DataTypes } from 'sequelize';
import Sequelize from 'sequelize'

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: false,

  pool: {
    max: process.env.DB_POOL_MAX,
    min: process.env.DB_POOL_MIN,
    acquire: process.env.DB_POOL_ACQUIRE,
    idle: process.env.DB_POOL_IDLE
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//model definitions
db.todoItems = todoItem(sequelize, DataTypes);
db.User = User(sequelize, DataTypes);

//association 
db.User.hasMany(db.todoItems, {
  foreignKey: {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
  }
});
db.todoItems.belongsTo(db.User);
//.....................

// DB Sync...
(async () => {
  await sequelize.sync()
      console.log("Synced db.");
  })();

export default db;
