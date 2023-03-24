import dbConfig from '../../../config/db.config.mjs'
import * as dotenv from 'dotenv'
dotenv.config()
import todoItem from './todo.js'
import User from './user.js'
import { DataTypes } from 'sequelize';
import Sequelize from 'sequelize'

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: false,

  pool: {
    max: parseInt(process.env.DB_POOL_MAX),
    min: parseInt(process.env.DB_POOL_MIN),
    acquire: parseInt(process.env.DB_POOL_ACQUIRE),
    idle: parseInt(process.env.DB_POOL_IDLE)
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//model definitions
db.TodoItems = todoItem(sequelize, DataTypes);
db.User = User(sequelize, DataTypes);

//db.TodoItems = sequelize.models.TodoItem
//db.User = sequelize.models.User

//association 
db.User.hasMany(db.TodoItems, {
  foreignKey: {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
  }
});
db.TodoItems.belongsTo(db.User);

//// DB Sync...
//(async () => {
//  await sequelize.sync()
//      console.log("Synced db.");
//  })();

export default db;
