const Sequelize = require("sequelize");

const sequelize = new Sequelize("clubEquitation", "root", "naruto$@1996", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.clients = require("../models/client.model")(sequelize);
db.seances = require("../models/seance.model")(sequelize);
db.tasks = require("../models/task.model")(sequelize);
db.users = require("../models/user.model")(sequelize);

db.user.hasMany(db.seance, {
    as: "seances",
    foreignKey: "Monitor"
});

db.user.hasMany(db.task, {
    as: "tasks",
    foreignKey: "User"
});

db.client.hasMany(db.seance, {
    as: "seances",
    foreignKey: "Client"
});

module.exports = db;
global.db = db;
