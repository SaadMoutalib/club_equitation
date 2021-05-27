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
      allowNull: false,
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
        defaultValue: '1980-08-03 00:00:00',
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
        defaultValue: '0000-00-00 00:00:00',
        field: "ensurenceValidity",
    },
    licenceValidity: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00',
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
        type: DataTypes.TINYINT,
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
  const ClientModel = sequelize.define("client_model", attributes, options);

  return ClientModel;
};