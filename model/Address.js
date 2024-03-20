const { DataTypes } = require('sequelize');
const sequelize = require("../db");

const Address = sequelize.define('Address', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  street_no: {
    type: DataTypes.STRING,
    allowNull: false
  },
  village: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
},
{
    timestamps:false
}
);
module.exports=Address;