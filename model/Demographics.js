const { DataTypes } = require('sequelize');
const sequelize = require("../db");

const Demographics = sequelize.define('Demographics', {
  // Model attributes are defined here
  heigher_education: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  religion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  blodgroup: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
    timestamps:false
}
);
module.exports=Demographics;