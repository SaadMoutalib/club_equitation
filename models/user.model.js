const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    userID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "userID",
    },
    sessionToken: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "sessionToken",
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "userEmail",
    },
    userPasswd: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "userPasswd",
    },
    adminLevel: {
    type: DataTypes.TINYINT,
        allowNull: false,
        field: "adminLevel",
    },
    lastLoginTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "lastLoginTime",
    },
    isActive: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        field: "isActive",
    },
    userFName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "userFirstName",
    },
    userLName: {
    type: DataTypes.STRING,
        allowNull: false,
        field: "userLastName",
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "description",
    },
    userType: {
        type: DataTypes.ENUM('ADMIN','MONITOR','GUARD','SERVICE','OTHER','COMPTA'),
        allowNull: false,
        field: "userType",
    },
    userphoto: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'default.jpg',
        field: "userphoto",
    },
    contractDate: {
    type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00',
        field: "contractDate",
    },
    userPhone: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "userPhone",
    },
    displayColor: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '#0000FF',
        field: "displayColor",
    },
  };
  const options = {
    tableName: "User",
    comment: "",
    indexes: [],
  };
  const UserModel = sequelize.define("user_model", attributes, options);

  return UserModel;
};