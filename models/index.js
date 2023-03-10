import dbConfig from '../config/db.config.mjs'
import todoItem from './todo.model.js'
import User from './user.model.js'
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

//user association double at moment for testing need to remove one.........
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
