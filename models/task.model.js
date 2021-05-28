const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    taskID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "taskID",
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: "startDate",
    },
    durationMinut: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 60,
        field: "durationMinut",
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "title",
    },
    detail: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "detail",
    },
    isDone: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00',
        field: "isDone",
    }
  };
  const options = {
    tableName: "Task",
    comment: "",
    indexes: [],
  };
  const TaskModel = sequelize.define("task_model", attributes, options);

  return TaskModel;
};