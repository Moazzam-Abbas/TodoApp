//const dbConfig = require('../config/db.config.mjs');
import dbConfig from '../config/db.config.mjs'
//const Sequelize = require("sequelize");
import todoItem from './todo.model.mjs'
import User from './user.model.mjs'
import { DataTypes } from 'sequelize';
import Sequelize from 'sequelize'
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.tutorials = require("./tutorial.model.mjs")(sequelize, Sequelize);


db.todoItems = todoItem(sequelize, DataTypes);
db.User = User(sequelize, DataTypes);


db.User.hasMany(db.todoItems, {
  foreignKey: {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
  }
});
db.todoItems.belongsTo(db.User);

// DB Sync...
(async () => {
  await sequelize.sync()
      console.log("Synced db.");
  })();

export default db;
