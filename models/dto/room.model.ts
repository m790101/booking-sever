// import sequelize from "../src/utils/database"; 
import  { DataTypes } from 'sequelize';
import sequelize from '../../service/db.service';
 
 const Room = sequelize.define('room', {
  name: {
    type: DataTypes.STRING,
  },
},{
  timestamps: false
});



export default Room