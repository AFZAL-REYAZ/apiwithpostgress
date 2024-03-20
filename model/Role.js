const { DataTypes } = require('sequelize');
const sequelize = require("../db");
const User=require("./User.js");

const Role = sequelize.define('Role', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  frontend: {
    type: DataTypes.STRING,
    allowNull: false
  },
  backend: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullstack: {
    type: DataTypes.STRING,
    allowNull: false
  },
  java: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
    timestamps:false
}
);

module.exports=Role;