//import database config info
const db_config = require("../config/db.config.js");

//create database 
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  db_config.DB,
  db_config.USER,
  db_config.PASSWORD,
  {
    logging: false,
    host: db_config.HOST,
    dialect: db_config.dialect,
    operatorsAliases: false,

    pool: {
      max: db_config.pool.max,
      min: db_config.pool.min,
      acquire: db_config.pool.acquire,
      idle: db_config.pool.idle
    }
  },
  
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//here import all tables from database to our 'db' object
db.user = require("./user.model.js")(sequelize,Sequelize);
db.make = require("./make.models.js")(sequelize,Sequelize);
db.carModel = require("./carModel.models.js")(sequelize,Sequelize);
db.car = require("./car.models.js")(sequelize, Sequelize);
db.transaction = require("./transaction.models.js")(sequelize, Sequelize);

//relations
db.make.hasMany(db.carModel, { foreignKey: { allowNull: false }});
db.carModel.belongsTo(db.make);
db.carModel.hasMany(db.car, { foreignKey: { allowNull: false }});
db.car.belongsTo(db.carModel);
db.car.hasMany(db.transaction, { foreignKey: { allowNull: false }});
db.transaction.belongsTo(db.car);
db.user.hasMany(db.transaction, { foreignKey: { allowNull: false }});
db.transaction.belongsTo(db.user);

//export db object which contains all tables from database
module.exports = db;