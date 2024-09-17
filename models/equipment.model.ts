// import sequelize from "../src/utils/database"; 
import  { DataTypes } from 'sequelize';
import sequelize from '../service/db.service';
 
 const Equipment = sequelize.define('equipment', {
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  num:{
    type:DataTypes.INTEGER
  }
},{
  timestamps: false,
  freezeTableName: true,
});



export default Equipment