const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  define: {
    timestamps: false,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.clients = require("./client.model")(sequelize);
db.seances = require("./seance.model")(sequelize);
db.tasks = require("./task.model")(sequelize);
db.users = require("./user.model")(sequelize);

db.users.hasMany(db.seances, {
    as: "seances",
    foreignKey: "Monitor"
});

db.users.hasMany(db.tasks, {
    as: "tasks",
    foreignKey: "User"
});

db.clients.hasMany(db.seances, {
    as: "seances",
    foreignKey: "Client"
});

module.exports = db;
global.db = db;
