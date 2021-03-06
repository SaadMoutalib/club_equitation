const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    clientID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: "userID",
    },
    sessionToken: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "sessionToken",
    },
    fName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "firstName",
    },
    lName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "lastName",
    },
    birthDate: {
    type: DataTypes.DATE,
        allowNull: false,
        field: "birthDate",
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'default.jpg',
        field: "photo",
    },
    identityDoc: {
        type: DataTypes.ENUM('CINE','EPORT','SEJOUR',''),
        allowNull: false,
        field: "identityDoc",
    },
    identityNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "identityNumber",
    },
    inscriptionDate: {
    type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        field: "inscriptionDate",
    },
    ensurenceValidity: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "ensurenceValidity",
    },
    licenceValidity: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "licenceValidity",
    },
    clientEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "clientEmail",
    },
    passwd: {
    type: DataTypes.STRING,
        allowNull: false,
        field: "password",
    },
    clientPhone: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "clientPhone",
    },
    priceRate: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: "priceRate",
    },
    isActive: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
        field: "isActive",
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "notes",
    },
  };
  const options = {
    tableName: "Client",
    comment: "",
    indexes: [],
  };
  const ClientModel = sequelize.define("client", attributes, options);

  return ClientModel;
};