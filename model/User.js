const { DataTypes } = require('sequelize');
const sequelize = require("../db");
const Role=require("./Role.js");
const Address = require("./Address.js");
const User = sequelize.define('User', {
  // Model attributes are defined here
  
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  password: {
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
  RoleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: 'id'
    }
  },
  AddressId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Address, // Referencing the Address model
      key: 'id'
    }
  }
},
{
    timestamps:false
}
);


module.exports=User;