const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    seanceID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "seanceID",
    },
    seanceGrpID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "seanceGrpID",
    },
    startDate: {
    type: DataTypes.DATE,
        allowNull: false,
        field: "startDate",
    },
    durationMinut: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 120,
        field: "durationMinut",
    },
    isDone: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
        field: "isDone",
    },
    paymentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "paymentID",
    },
    comments: {
    type: DataTypes.STRING,
        allowNull: false,
        field: "comments",
    }
  };
  const options = {
    tableName: "Seance",
    comment: "",
    indexes: [],
  };
  const SeanceModel = sequelize.define("seance_model", attributes, options);

  return SeanceModel;
};