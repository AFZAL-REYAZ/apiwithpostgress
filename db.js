const {Sequelize}=require("sequelize");

const sequelize=new Sequelize("restapi","postgres","@Afz9102",{
    host:"localhost",
    dialect:"postgres"
});

module.exports=sequelize;

