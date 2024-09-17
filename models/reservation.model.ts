import { DataTypes } from "sequelize";
import sequelize from "../service/db.service";
import Room from "./room.model";
import TimeSlot from "./timeSlot.model";
import Treatment from "./treatment.model";
import Equipment from "./equipment.model";

const Reservation = sequelize.define(
  "booking",
  {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time_slot_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "time_slot",
        },
        key: "id",
      },
      allowNull: false,
    },
    room_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "room",
        },
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    treatment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "treatment",
        },
        key: "id",
      },
    },
    equipment: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);


// Define the associations
Reservation.belongsTo(Room, { foreignKey: 'room_id' }); 
Reservation.belongsTo(TimeSlot, { foreignKey: 'time_slot_id' }); 
Reservation.belongsTo(Treatment, { foreignKey: 'treatment_id' }); 

export default Reservation;
