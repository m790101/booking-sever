// import sequelize from "../src/utils/database"; 
import  { DataTypes } from 'sequelize';
import sequelize from '../service/db.service';
 
 const Treatment = sequelize.define('treatment', {
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  value:{
    type:DataTypes.INTEGER,
    unique: true,
  }
},{
  timestamps: false,
  freezeTableName: true,
});



export default Treatment