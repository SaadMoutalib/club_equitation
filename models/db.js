const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize((process.env.DATABASE_URL|| dbConfig.URL)+"?sslmode=require",
 {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  define: {
    timestamps: false,
  },
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

db.clients = require("./client.model")(sequelize);
db.seances = require("./seance.model")(sequelize);
db.tasks = require("./task.model")(sequelize);
db.users = require("./user.model")(sequelize);

db.users.hasMany(db.seances, {
    as: "seances",
    foreignKey: "MonitorID"
});

db.users.hasMany(db.tasks, {
    as: "tasks",
    foreignKey: "UserID"
});

db.clients.hasMany(db.seances, {
    as: "seances",
    foreignKey: "ClientID"
});

module.exports = db;
global.db = db;
