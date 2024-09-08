import sequelize from "../src/utils/database"; 
import  { DataTypes } from 'sequelize';
 
 const Treatment = sequelize.define('treatment', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
});



console.log(Treatment === sequelize.models.Treatment)


export default Treatment